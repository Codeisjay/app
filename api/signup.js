let users = [];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: "User already exists" });
    }
    users.push({ email, password });
    return res.status(201).json({ message: "User created" });
  }
  res.status(405).end();
}
