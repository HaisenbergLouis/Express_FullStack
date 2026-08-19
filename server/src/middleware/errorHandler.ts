// 全局错误处理中间件
import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/ApiResponse";

// 自定义错误类
export class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
    // 保持原型链（TypeScript 继承 Error 的坑）
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

// 全局错误处理中间件（注意：必须是 4 个参数，Express 才识别为错误处理中间件）
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("❌ 错误:", err.message);

  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json(ApiResponse.error(err.message, err.statusCode));
  }

  // 未知错误
  return res.status(500).json(ApiResponse.error("服务器内部错误", 500));
};

// 404 处理中间件
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res
    .status(404)
    .json(
      ApiResponse.error(`路由不存在: ${req.method} ${req.originalUrl}`, 404),
    );
};
