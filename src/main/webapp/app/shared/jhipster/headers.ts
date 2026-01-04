/**
 * HTTP Headers utilities
 * Extracts messages from response headers
 */

export interface MessageFromHeaders {
  alert?: string;
  param?: string;
  error?: string;
}

/**
 * Extract alert/error messages from HTTP headers
 */
export function getMessageFromHeaders(headers: Record<string, any>): MessageFromHeaders {
  const alert = headers?.['x-geestackApp-alert'] ?? headers?.['x-gestackapp-alert'];
  const error = headers?.['x-geestackApp-error'] ?? headers?.['x-gestackapp-error'];
  const param = headers?.['x-geestackApp-params'] ?? headers?.['x-gestackapp-params'];

  return {
    alert,
    error,
    param,
  };
}
