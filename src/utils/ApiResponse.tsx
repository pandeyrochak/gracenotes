import { NextResponse } from 'next/server';

export class ApiError extends Error {
  statusCode: number;
  errors: string[];

  constructor(statusCode: number, message: string, errors: string[] = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export class ApiResponse {
  static success<T>(data: T, message: string = 'Success', statusCode: number = 200) {
    return NextResponse.json({
      success: true,
      message,
      data,
    }, { status: statusCode });
  }

  static error(error: ApiError | Error, statusCode: number = 500) {
    if (error instanceof ApiError) {
      return NextResponse.json({
        success: false,
        message: error.message,
        errors: error.errors,
      }, { status: error.statusCode });
    }

    return NextResponse.json({
      success: false,
      message: error.message || 'Internal Server Error',
    }, { status: statusCode });
  }
}

// Utility function to handle async operations in routes
export const asyncHandler = (fn: Function) => async (req: Request, ...args: any[]) => {
  try {
    return await fn(req, ...args);
  } catch (error) {
    console.error('API Error:', error);
    return ApiResponse.error(error instanceof ApiError ? error : new ApiError(500, 'Internal Server Error'));
  }
};