export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public title: string = 'Error',
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404, '404 - Not Found')
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, 'Validation Error')
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = 'Database operation failed') {
    super(message, 500, 'Database Error')
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'Network error occurred') {
    super(message, 503, 'Network Error')
  }
}

export function handleError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error
  }

  if (error instanceof Error) {
    console.error('Unexpected error:', error)
    return new AppError(error.message, 500, 'Something Went Wrong')
  }

  console.error('Unknown error:', error)
  return new AppError('An unexpected error occurred', 500, 'Something Went Wrong')
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'An unexpected error occurred'
}

export function getErrorTitle(error: unknown): string {
  if (error instanceof AppError) {
    return error.title
  }

  return 'Error'
}
