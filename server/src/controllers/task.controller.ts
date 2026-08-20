// 控制器（业务逻辑层）
import { Request, Response, NextFunction } from "express";
// 改造控制器，用数据库替代内存数据
import Task from "../models/Task";
import { ApiResponse } from "../utils/ApiResponse";
import { AppError } from "../middleware/errorHandler";

// 模拟数据（后面接 MongoDB 后替换）
// let tasks = [
//   { id: 1, title: "学习 Express", completed: false },
//   { id: 2, title: "学习 Vue3", completed: false },
// ];

// 获取所有任务
export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // res.json(ApiResponse.success(tasks, "获取成功"));
    // 解析查询参数：?page=1&limit=10&completed=false
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const completed = req.query.completed;

    // 构建查询条件
    const filter: any = {};
    if (completed !== undefined) {
      filter.completed = completed === "true";
    }
    // 计算跳过条数
    const skip = (page - 1) * limit;

    // 查询数据 + 总数
    const [tasks, total] = await Promise.all([
      Task.find(filter)
        .sort({ createdAt: -1 }) // 按创建时间倒序
        .skip(skip)
        .limit(limit),
      Task.countDocuments(filter),
    ]);

    res.json(
      ApiResponse.success(
        {
          list: tasks,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        },
        "获取成功",
      ),
    );
  } catch (error) {
    next(error); // 捕获到错误交给全局错误处理中间件
  }
};

// 获取单个任务
export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // const id = parseInt(String(req.params.id), 10);
    // const task = tasks.find((t) => t.id === id);
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      throw new AppError("任务不存在", 404);
    }

    res.json(ApiResponse.success(task));
  } catch (error) {
    // 处理无效的 ObjectId 格式
    if (error instanceof Error && error.name === "CastError") {
      return next(new AppError("无效的任务ID格式", 400));
    }
    next(error);
  }
};

// 创建任务
export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, description, priority } = req.body;

    if (!title) {
      throw new AppError("标题不能为空", 400);
    }

    const task = await Task.create({
      title,
      description,
      priority,
    });

    // const newTask = {
    //   id: tasks.length + 1,
    //   title,
    //   completed: false,
    // };
    // tasks.push(newTask);

    res.status(201).json(ApiResponse.success(task, "创建成功"));
  } catch (error) {
    // 处理 Mongoose 验证错误
    if (error instanceof Error && error.name === "ValidationError") {
      const messages = Object.values((error as any).errors).map(
        (e: any) => e.message,
      );
      return next(new AppError(messages.join("; "), 400));
    }
    next(error);
  }
};

// 更新任务
export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // const id = parseInt(String(req.params.id), 10);
    // const { title, completed } = req.body;
    // const task = tasks.find((t) => t.id === id);
    const { id } = req.params;
    const { title, description, completed, priority } = req.body;

    // findByIdAndUpdate：第三个参数 new:true 返回更新后的文档，runValidators 执行验证
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, completed, priority },
      { new: true, runValidators: true },
    );

    if (!task) {
      throw new AppError("任务不存在", 404);
    }

    // if (title !== undefined) task.title = title;
    // if (completed !== undefined) task.completed = completed;

    res.json(ApiResponse.success(task, "更新成功"));
  } catch (error) {
    if (error instanceof Error && error.name === "CastError") {
      return next(new AppError("无效的任务ID格式", 400));
    }
    if (error instanceof Error && error.name === "ValidationError") {
      const messages = Object.values((error as any).errors).map(
        (e: any) => e.message,
      );
      return next(new AppError(messages.join("; "), 400));
    }
    next(error);
  }
};

// 删除任务
export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // const id = parseInt(String(req.params.id), 10);
    // const index = tasks.findIndex((t) => t.id === id);
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    // if (index === -1) {
    //   throw new AppError("任务不存在", 404);
    // }

    // tasks.splice(index, 1);
    // res.json(ApiResponse.success(null, "删除成功"));
    if (!task) {
      throw new AppError("任务不存在", 404);
    }

    res.json(ApiResponse.success(null, "删除成功"));
  } catch (error) {
    if (error instanceof Error && error.name === "CastError") {
      return next(new AppError("无效的任务ID格式", 400));
    }
    next(error);
  }
};
