// 控制器（业务逻辑层）
import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { AppError } from "../middleware/errorHandler";

// 模拟数据（后面接 MongoDB 后替换）
let tasks = [
  { id: 1, title: "学习 Express", completed: false },
  { id: 2, title: "学习 Vue3", completed: false },
];

// 获取所有任务
export const getTasks = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(ApiResponse.success(tasks, "获取成功"));
  } catch (error) {
    next(error); // 捕获到错误交给全局错误处理中间件
  }
};

// 获取单个任务
export const getTaskById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(String(req.params.id), 10);
    const task = tasks.find((t) => t.id === id);

    if (!task) {
      throw new AppError("任务不存在", 404);
    }

    res.json(ApiResponse.success(task));
  } catch (error) {
    next(error);
  }
};

// 创建任务
export const createTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title } = req.body;

    if (!title) {
      throw new AppError("标题不能为空", 400);
    }

    const newTask = {
      id: tasks.length + 1,
      title,
      completed: false,
    };
    tasks.push(newTask);

    res.status(201).json(ApiResponse.success(newTask, "创建成功"));
  } catch (error) {
    next(error);
  }
};

// 更新任务
export const updateTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(String(req.params.id), 10);
    const { title, completed } = req.body;
    const task = tasks.find((t) => t.id === id);

    if (!task) {
      throw new AppError("任务不存在", 404);
    }

    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;

    res.json(ApiResponse.success(task, "更新成功"));
  } catch (error) {
    next(error);
  }
};

// 删除任务
export const deleteTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(String(req.params.id), 10);
    const index = tasks.findIndex((t) => t.id === id);

    if (index === -1) {
      throw new AppError("任务不存在", 404);
    }

    tasks.splice(index, 1);
    res.json(ApiResponse.success(null, "删除成功"));
  } catch (error) {
    next(error);
  }
};
