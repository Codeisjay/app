import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export default function handler(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    return res.status(200).json({ message: "Welcome to protected route!", user: decoded });
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
}
