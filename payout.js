import https from 'https';

// --- Configuration ---
const API_BASE_URL = 'gateway.bipspay.com';
const USERNAME = 'victorium';
const PASSWORD = 'victorium@2026';

// Set the total amount you want to distribute across all accounts below
const TOTAL_PAYOUT_AMOUNT = 6000;

// Add as many accounts as you want here in this array
const payoutAccounts = [
  {
    "reference": "payoutref2281212",
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

// --- Random Generators for Names & References ---
function randInt(min, maxInclusive) { return Math.floor(Math.random() * (maxInclusive - min + 1)) + min; }
function pick(arr) { return arr[randInt(0, arr.length - 1)]; }
function generateOrderId() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let s = 'z';
  // Example order IDs are exactly 18 characters long
  for (let i = 0; i < 17; i++) s += alphabet[randInt(0, alphabet.length - 1)];
  return s;
}

const FIRST = ['vipin', 'Dhirendra', 'KYAMUDDIN', 'Raghuraj', 'Salikur', 'BHAVA', 'DIPAK', 'Jitendra', 'Mukendra', 'Akhil', 'BIMALKISKU', 'sanni', 'CHHUTU', 'Md', 'Pinak', 'Priya', 'GAYATRIBENMANISHBHAISAGAR', 'Rajan', 'DEVARAJU', 'Sanjeevyadav', 'Dhananjay', 'Raushan', 'Haridoss', 'Abu', 'SUNIL', 'ANISHTR', 'Punjab', 'MD', 'Mahendra', 'Sushil', 'VAIBHAVCHAUHAN', 'Canara', 'Rajendrakumar', 'VishnuThakor', 'Mithilesh', 'Prince', 'Azad', 'Namita', 'LALBIR', 'Ramjan'];
const LAST = ['kumar', 'Singh', 'rahman', 'choudhury', 'POLAI', 'prsad', 'rajput', 'Jhangta', 'chakma', 'Dutta', 'Chauhan', 'rana', 'Thakor', 'yadav', 'pandurang', 'mohapatra', 'Ali', 'Devi', 'SAGAR', 'RAJU', 'PANDA', 'horo', 'Oraon', 'bauri', 'Pasupathi', 'ZALLA', 'SAHDEVBHAI'];

function maybeUpper(s) { const r = Math.random(); return (r < 0.25) ? s.toUpperCase() : (r < 0.4) ? s.toLowerCase() : s; }
function concatOrSpace(parts) { return parts.join(Math.random() < 0.18 ? '' : ' '); }

function generateName() {
  const kind = randInt(1, 6);
  if (kind === 1) return maybeUpper(pick(FIRST));
  if (kind === 2) return concatOrSpace([pick(FIRST), pick(LAST)]);
  if (kind === 3) return concatOrSpace([pick(FIRST), pick(LAST), pick(LAST)]);
  if (kind === 4) return maybeUpper(concatOrSpace([pick(FIRST), pick(FIRST)]));
  if (kind === 5) return maybeUpper(pick(FIRST) + pick(LAST));
  return [pick(FIRST), pick(LAST), pick(FIRST), pick(LAST)].map(maybeUpper).join(' ');
}

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
  console.log('🔍 Checking Public IP Address being used for requests...');
  try {
    const ipResponse = await new Promise((resolve, reject) => {
      https.get('https://api.ipify.org?format=json', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(JSON.parse(data).ip));
      }).on('error', reject);
    });
    console.log(`🌐 Server Public IP: ${ipResponse}\n`);
  } catch (err) {
    console.log(`⚠️ Could not determine public IP: ${err.message}\n`);
  }

  if (payoutAccounts.length === 0) {
    console.log("❌ No payout accounts configured.");
    return;
  }

  // Calculate the evenly distributed amount per account (formatted to 2 decimal places)
  // E.g., 500 / 2 accounts = 250.00 each
  const amountPerAccount = (TOTAL_PAYOUT_AMOUNT / payoutAccounts.length).toFixed(2);

  console.log(`🚀 Distributing a total of ₹${TOTAL_PAYOUT_AMOUNT} across ${payoutAccounts.length} account(s)`);
  console.log(`💵 Each account will receive: ₹${amountPerAccount}\n`);

  for (const account of payoutAccounts) {
    // Override any hardcoded amount with the calculated distributed amount
    account.amount = amountPerAccount.toString();

    // Auto-generate random reference and beneficiary name for this account
    account.reference = generateOrderId();
    account.beneficiary_name = generateName();

    await processPayout(account);
    // Add a 1 second delay between requests to avoid API rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n🏁 Payout batch processing completed.');
}

// Start the script
runAllPayouts();
