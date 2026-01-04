/**
 * Problem Details utilities
 * Handles RFC 7807 Problem Details for HTTP APIs
 */

export interface FieldErrorVM {
  objectName?: string;
  field: string;
  message: string;
}

export interface ProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  message?: string;
  fieldErrors?: FieldErrorVM[];
  error?: string;
  params?: string;
}

/**
 * Type guard to check if an object is ProblemDetails with a message
 */
export function isProblemWithMessage(data: any): data is ProblemDetails {
  return data && typeof data === 'object' && 'message' in data;
}
