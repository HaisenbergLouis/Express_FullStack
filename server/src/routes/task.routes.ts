//路由拆分
import { Router } from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";

const router = Router();

// 路由定义
router.get("/", getTasks); // GET    /api/tasks      获取列表
router.get("/:id", getTaskById); // GET    /api/tasks/1    获取单个
router.post("/", createTask); // POST   /api/tasks      创建
router.put("/:id", updateTask); // PUT    /api/tasks/1    更新
router.delete("/:id", deleteTask); // DELETE /api/tasks/1    删除

export default router;
