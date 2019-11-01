const crypto = require('crypto');

module.exports = class Checkout {
    constructor(secret, IV, algo = 'aes-256-cbc') {
        this._IV = IV;
        this._algo = algo;
        this._secret = secret;
    }
    
    encrypt(requestBody) {
        let secret = crypto.createHash('sha256').update(this._secret).digest('hex').substring(0, 32);
        secret = Buffer.from(secret);
        
        let IV = crypto.createHash('sha256').update(this._IV).digest('hex').substring(0, 16);
        IV = Buffer.from(IV);
        
        const payload = JSON.stringify(requestBody).replace(/\//g, '\\/'); 
        const cipher = crypto.createCipheriv(this._algo, Buffer.from(secret), IV);
        const result = Buffer.concat([cipher.update(payload), cipher.final()]);
        
        const base64String = Buffer.from(result, 'binary').toString('base64');
        return Buffer.from(base64String, 'binary').toString('base64');
    }
}