import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;   // use env var
let users = [];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });
    return res.status(200).json({ token });
  }
  res.status(405).end();
}

