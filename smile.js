const smileIdentityCore = require("smile-identity-core");
const Signature = smileIdentityCore.Signature;

// Initialize
partner_id = '6327'; // login to the Smile Identity portal to view your partner id
api_key = '0fc19393-70fa-4bd2-9a2a-e99f7c98ce2e'; // copy your API key from the Smile Identity portal

connection = new Signature(partner_id, api_key);

// Generate the Signature
generated_signature = connection.generate_signature('2023-07-02T19:58:03.809Z') // where timestamp is optional

console.log(generated_signature)