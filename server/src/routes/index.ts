// 路由总入口
import { Router } from "express";
import taskRoutes from "./task.routes";

const router = Router();

// 统一挂载子路由
router.use("/tasks", taskRoutes);

// 可以继续加其他模块路由
// router.use('/users', userRoutes);

export default router;
