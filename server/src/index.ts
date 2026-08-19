import express, { Request, Response } from "express";
import app from "./app";

// 创建express应用
// const app = express();
// 读取环境变量PORT，如果环境没有设置PORT，默认使用3000端口
const PORT = process.env.PORT || 3000;

// 中间件:解析JSON请求体
// 有了这个中间件，POST请求的req.body才能拿到json数据
// app.use(express.json());
// 中间件:解析URL编码的表单数据
// extended:true 支持复杂嵌套对象表单，false只支持简单键值对
// app.use(express.urlencoded({ extended: true }));

// 测试路由
// app.get("/", (req: Request, res: Response) => {
//   res.json({
//     message: "Express + TypeScript服务器运行中",
//     timeStap: new Date().toISOString(),
//   });
// });

// 健康检查接口
// 一般给容器,运维监控用,判断服务有没有存活
// app.get("/api/health", (req: Request, res: Response) => {
//   res.json({ status: "ok", code: 200 });
// });

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器已启动：http://localhost:${PORT}`);
});
