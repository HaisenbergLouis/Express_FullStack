// 统一响应格式工具
export class ApiResponsee {
  //   成功响应;
  static success(data: any = null, message: string = "操作成功") {
    return {
      code: 200,
      message,
      data,
    };
  }
  //   失败响应
  static error(message: string = "操作失败", code: number = 500) {
    return {
      code,
      message,
      data: null,
    };
  }
}
