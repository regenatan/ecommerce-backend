const crypto = require('crypto');

// Generate a 256-character (256 bytes * base64 = more than enough, then slice)
const secret = crypto.randomBytes(192).toString('base64').slice(0, 256);

console.log(secret);
