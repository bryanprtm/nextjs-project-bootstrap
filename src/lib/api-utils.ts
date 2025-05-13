export class APIError extends Error {
  constructor(
    message: string,
    public status: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export async function handleAPIError(error: unknown): Promise<never> {
  if (error instanceof APIError) {
    throw error;
  }

  if (error instanceof Error) {
    throw new APIError(error.message);
  }

  throw new APIError('An unexpected error occurred');
}

export function createErrorResponse(error: unknown) {
  console.error('API Error:', error);

  if (error instanceof APIError) {
    return Response.json(
      { success: false, error: error.message, code: error.code },
      { status: error.status }
    );
  }

  if (error instanceof Error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return Response.json(
    { success: false, error: 'An unexpected error occurred' },
    { status: 500 }
  );
}
