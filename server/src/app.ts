// 重构app.ts（应用配置）
import express from "express";
import routes from "./routes";
import { logger } from "./middleware/logger";
import { errorHandler, notFound } from "./middleware/errorHandler";
const app = express();

// ===== 全局中间件（按顺序执行）=====
// 1. 解析 JSON
app.use(express.json());
// 2. 解析表单数据
app.use(express.urlencoded({ extended: true }));
// 3. 日志中间件
app.use(logger);

// ===== 路由 =====
app.use("/api", routes);

// ===== 错误处理（必须放在路由之后）=====
// 404 处理
app.use(notFound);
// 全局错误处理
app.use(errorHandler);

export default app;
