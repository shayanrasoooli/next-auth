import ConnectedDB from "../../../utils/ConnectedDB"
import User from "../../../Model/User"

async function hashPassword(password) {
  // Placeholder function for hashing the password
  return password;
}

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  try {
    await ConnectedDB();
  } catch (error) {
    return res.status(500).json({ status: "failed", message: "Error in connecting to dataBase" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ status: "failed", message: "Invalid Data" });
  }

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.status(422).json({ status: "failed", message: "User is already exist" });
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await User.create({ email: email, password: hashedPassword });

  return res.status(201).json({ status: "successfully", message: "User created" });
}

export default handler;
