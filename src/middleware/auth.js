const jwt = require('jsonwebtoken');

const authMiddleware = (req) => {
    const authHeader = req.headers.authorization || "";

    if (!authHeader) return null;

    const token = authHeader.replace("Bearer ", "");
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return user;
    } catch (error) {
        throw new Error("Invalid or expired token")
    }
}

module.exports = authMiddleware;
