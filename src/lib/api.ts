import { NextResponse } from 'next/server';

export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }
}

export function successResponse(data: any, status = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  );
}

export function errorResponse(error: Error) {
  console.error('API Error:', error);

  const statusCode = error instanceof ApiError ? error.statusCode : 500;
  const message =
    error instanceof ApiError
      ? error.message
      : 'An unexpected error occurred. Please try again later.';

  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: statusCode }
  );
}

export function validateRequest(session: any) {
  if (!session?.user) {
    throw new ApiError(401, 'Unauthorized');
  }
  return session.user;
}

export function validateAdmin(session: any) {
  const user = validateRequest(session);
  if (user.role !== 'ADMIN') {
    throw new ApiError(403, 'Forbidden');
  }
  return user;
}
