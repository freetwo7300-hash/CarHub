export function handleError(error: unknown) {
  if (error instanceof Error) {
    return {
      title: 'Error',
      message: error.message,
    }
  }
  return {
    title: 'Error',
    message: 'An unexpected error occurred',
  }
}
