import express from "express";
const app = express();
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();

const port = process.env.PORT || 3000;

console.log(process.env.PORT);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} `);
});


