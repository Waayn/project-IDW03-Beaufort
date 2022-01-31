import crypto from "crypto";

export const hasher = async (password) => {
    let hash = crypto.createHmac("sha512", process.env.SALT);
    hash.update(password);
    return hash.digest("hex");
};

export const compareHash = async (password, hash) => {
    const passwordHash = await hasher(password, process.env.SALT);
    return passwordHash === hash
};