// 自定义日志中间件
import { Request, Response, NextFunction } from "express";

// 日志中间件：记录每个请求的方法、路径、耗时
export const logger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  // 响应结束时打印日志
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toLocaleString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
    );
  });
  next();
};
