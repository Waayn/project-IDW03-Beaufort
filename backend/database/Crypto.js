const crypto = require("crypto");

module.exports = hasher = async (password) => {
    let hash = crypto.createHmac("sha512", process.env.SALT);
    hash.update(password);
    return hash.digest("hex");
};

module.exports = compareHash = async (password, hash) => {
    const passwordHash = await hasher(password, process.env.SALT);
    return passwordHash === hash
};