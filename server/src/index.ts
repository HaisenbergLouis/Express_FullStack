import express, { Request, Response } from "express";

// 创建express应用
const app = express();
const PORT = process.env.PORT || 3000;

// 中间件:解析JSON请求体
app.use(express.json());
// 中间件:解析URL编码的表单数据
app.use(express.urlencoded({ extended: true }));

// 测试路由
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Express + TypeScript服务器运行中",
    timeStap: new Date().toISOString(),
  });
});

// 健康检查接口
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok", code: 200 });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器已启动：http://localhost:${PORT}`);
});
