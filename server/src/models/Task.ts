// 定义数据模型
import mongoose, { Schema, Document, Model } from "mongoose";

// 定义 TypeScript 接口（类型约束）
export interface ITask extends Document {
  title: string;
  description?: string; // 可选字段
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: Date;
  updatedAt: Date;
}

// 定义 Schema（数据库结构约束）
const TaskSchema: Schema<ITask> = new Schema(
  {
    title: {
      type: String,
      required: [true, "任务标题不能为空"], // 必填 + 自定义错误信息
      trim: true, // 自动去除首尾空格
      maxlength: [100, "标题不能超过100个字符"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "描述不能超过500个字符"],
    },
    completed: {
      type: Boolean,
      default: false, // 默认值
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"], // 枚举值，只能是这三个
      default: "medium",
    },
  },
  {
    timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
  },
);

// 创建并导出 Model
const Task: Model<ITask> = mongoose.model<ITask>("Task", TaskSchema);

export default Task;
