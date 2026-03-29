import https from 'https';

// --- Configuration ---
const API_BASE_URL = 'gateway.bipspay.com';
const USERNAME = 'victorium';
const PASSWORD = 'victorium@2026';

// Set target total amount for EACH account
const TARGET_PER_ACCOUNT = 500000; // 5 Lakh per account
const MIN_PAYOUT = 25000;
const MAX_PAYOUT = 35000;

// Accounts list
const payoutAccounts = [
    {
        "account_number": "425702010087433",
        "account_ifsc": "UBIN0543578",
        "requesttype": "IMPS",
        "bankname": "Union Bank of India"
    },
    {
        "account_number": "435702010092781",
        "account_ifsc": "UBIN0543578",
        "requesttype": "IMPS",
        "bankname": "Union Bank of India"
    }
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
 * Utility to generate exactly 'target' sum using random chunks between 'min' and 'max'
 */
function generateChunks(target, min, max) {
    let minK = Math.ceil(target / max);
    let maxK = Math.floor(target / min);
    if (minK > maxK) throw new Error("Impossible to split");
    
    let k = Math.floor(Math.random() * (maxK - minK + 1)) + minK;
    let chunks = [];
    let remaining = target;
    for (let i = 0; i < k; i++) {
        let remainingChunks = k - 1 - i;
        let minAllowable = Math.max(min, remaining - remainingChunks * max);
        let maxAllowable = Math.min(max, remaining - remainingChunks * min);
        
        let val = Math.floor(Math.random() * (maxAllowable - minAllowable + 1)) + minAllowable;
        chunks.push(val);
        remaining -= val;
    }
    for (let i = chunks.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [chunks[i], chunks[j]] = [chunks[j], chunks[i]];
    }
    return chunks;
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

    console.log(`🚀 Processing ${payoutAccounts.length} account(s). Each to receive exactly ₹${TARGET_PER_ACCOUNT} total.`);
    console.log(`💵 Chunk amounts will be random between ₹${MIN_PAYOUT} and ₹${MAX_PAYOUT}\n`);

    for (const baseAccount of payoutAccounts) {
        console.log(`\n======================================================`);
        console.log(`🏦 Starting payouts for Account: ${baseAccount.account_number}`);
        console.log(`======================================================\n`);
        
        let targetChunks;
        try {
            targetChunks = generateChunks(TARGET_PER_ACCOUNT, MIN_PAYOUT, MAX_PAYOUT);
        } catch (e) {
            console.error(`❌ Could not generate chunks for amount target: ${e.message}`);
            continue;
        }
        
        console.log(`📊 Generated ${targetChunks.length} chunks to total exactly ₹${TARGET_PER_ACCOUNT}`);
        console.log(`Chunks: ${targetChunks.join(', ')}\n`);

        for (let i = 0; i < targetChunks.length; i++) {
            const amount = targetChunks[i];
            
            // Create a dedicated account object for this specific request
            const accountRequest = { ...baseAccount };
            accountRequest.amount = amount.toString();
            accountRequest.reference = generateOrderId();
            accountRequest.beneficiary_name = generateName();

            await processPayout(accountRequest);
            // Add a 1 second delay between requests to avoid API rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    console.log('\n🏁 Payout batch processing completed.');
}

// Start the script
runAllPayouts();
