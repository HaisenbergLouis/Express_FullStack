import mongoose from "mongoose";
import { log } from "node:console";

// 连接MongoDB
export const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("MONGODB_URI 环境变量未配置");
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB连接成功：${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB连接失败：`, error);
    process.exit(1);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB连接断开");
});

mongoose.connection.on("error", (err) => {
  console.log("MongoDB连接错误：", err);
});
