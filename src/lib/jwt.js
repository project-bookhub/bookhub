const Crypto = require("crypto")
require("dotenv").config()

class JWT {
    constructor() {
    }

    verify(token){
        try{
            const salt = process.env["secret-key"]

            const [header, payload, signature] = token.split(".");
            const base64url = [header, payload].join(".");
            const newSignature = this.createSignature(base64url, salt);

            if (signature !== newSignature) return null;

            const result = this.decode(payload);
            return result;
        }catch(e){
            throw new Error(4000)
        }
    }

    encode(obj){
        return Buffer.from(JSON.stringify(obj)).toString("base64url")
    }

    decode(base64){
        return JSON.parse(Buffer.from(base64, "base64url").toString("utf-8"))
    }

    createSignature (base64url) {
        const salt = process.env["secret-key"]

        return Crypto.createHmac("sha256", salt)
            .update(base64url)
            .digest("base64url")
    }
}