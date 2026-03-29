const https = require('https');

// --- Configuration ---
const API_BASE_URL = 'gateway.bipspay.com';
const USERNAME = 'Velocis';
const PASSWORD = 'Velocis_2026@';

// Add as many accounts as you want here in this array
const payoutAccounts = [
  {
    "reference": "payoutref2281",
    "account_number": "4512279701",
    "beneficiary_name": "Nehul sharma",
    "requesttype": "IMPS",
    "amount": "100",
    "account_ifsc": "KKBK0005028",
    "bankname": "Kotak Mahindra Bank"
  },
  // Example of adding another account:
  /*
  {
    "reference": "payoutref2282", 
    "account_number": "1234567890",
    "beneficiary_name": "John Doe",
    "requesttype": "IMPS",
    "amount": "200",
    "account_ifsc": "HDFC0000123",
    "bankname": "HDFC Bank"
  }
  */
];

// --- Internal State ---
let currentToken = null;
let tokenExpiry = 0; // Unix timestamp in seconds

/**
 * Helper to make HTTP POST requests with standard https library to avoid dependency issues
 */
function request(path, headers, body) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: API_BASE_URL,
      port: 443,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = https.request(options, res => {
      let data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => {
        const responseString = Buffer.concat(data).toString();
        try {
          const json = JSON.parse(responseString);
          resolve({ status: res.statusCode, data: json });
        } catch (e) {
          reject(new Error(`Failed to parse JSON response: ${responseString}`));
        }
      });
    });

    req.on('error', reject);
    req.write(JSON.stringify(body));
    req.end();
  });
}

/**
 * Parses JWT token to safely extract expiration time
 */
function parseJwtExp(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = Buffer.from(base64, 'base64').toString('utf-8');
    const payload = JSON.parse(jsonPayload);
    return payload.exp; // Extracted exp timestamp
  } catch (error) {
    // Fallback: If decoding fails, manually set expiry to 50 minutes from now (tokens usually last 1h)
    return Math.floor(Date.now() / 1000) + (50 * 60);
  }
}

/**
 * Fetches a new token or returns the existing valid one
 */
async function getToken() {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  
  // Checking if token exists and is valid (with a 60-second safety buffer before expiry)
  if (currentToken && (tokenExpiry - 60 > currentTimestamp)) {
    return currentToken;
  }

  console.log('🔄 Generating new authentication token...');
  
  try {
    const response = await request('/auth/token', { 'Accept': 'application/json' }, {
      user_name: USERNAME,
      password: PASSWORD
    });

    if (response.status >= 200 && response.status < 300) {
      currentToken = response.data.token;
      tokenExpiry = parseJwtExp(currentToken);
      console.log('✅ Token generated successfully!');
      return currentToken;
    } else {
      throw new Error(`Auth failed with status ${response.status}: ${JSON.stringify(response.data)}`);
    }
  } catch (err) {
    console.error('❌ Failed to get authentication token:', err.message);
    throw err;
  }
}

/**
 * Initiates a single payout
 */
async function processPayout(account) {
  try {
    const token = await getToken();
    
    console.log(`\n💸 Initiating payout for Reference: ${account.reference} | Name: ${account.beneficiary_name} | Amount: ₹${account.amount}`);
    
    const response = await request('/api/v6/withdraw', {
      'Authorization': `Bearer ${token}`
    }, account);

    const result = response.data;
    
    if (result.status === true) {
      console.log(`✅ Success: ${result.message}`);
      console.log(`   Payout ID: ${result.data?.payout_id}`);
      console.log(`   Status: ${result.data?.status}`);
    } else {
      console.log(`❌ Failed: Server returned an error`);
      console.log(`   Details: ${JSON.stringify(result)}`);
    }

    return result;
  } catch (error) {
    console.error(`❌ Error processing payout for ${account.reference}:`, error.message);
  }
}

/**
 * Main execution function
 */
async function runAllPayouts() {
  console.log(`🚀 Starting batch payout process for ${payoutAccounts.length} account(s)\n`);
  
  for (const account of payoutAccounts) {
    await processPayout(account);
    // Add a 1 second delay between requests to avoid API rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n🏁 Payout batch processing completed.');
}

// Start the script
runAllPayouts();
