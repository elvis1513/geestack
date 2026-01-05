const getErrorMessage = errorData => {
  let { message } = errorData;
  if (errorData.fieldErrors) {
    errorData.fieldErrors.forEach(fErr => {
      message += `\nfield: ${fErr.field},  Object: ${fErr.objectName}, message: ${fErr.message}\n`;
    });
  }
  return message;
};

export default () => next => action => {
  /**
   *
   * The error middleware serves to log error messages from dispatch
   * It need not run in production
   */
  if (DEVELOPMENT) {
    const { error } = action;
    if (error) {
      // 过滤认证相关的 401 错误（预期行为，不应输出到 console）
      const isAuthError =
        error.response?.status === 401 && (error.config?.url?.endsWith('api/account') || error.config?.url?.endsWith('api/authenticate'));

      if (!isAuthError) {
        console.error(`${action.type} caught at middleware with reason: ${JSON.stringify(error.message)}.`);
        if (error.response && error.response.data) {
          const message = getErrorMessage(error.response.data);
          console.error(`Actual cause: ${message}`);
        }
      }
    }
  }
  // Dispatch initial action
  return next(action);
};
