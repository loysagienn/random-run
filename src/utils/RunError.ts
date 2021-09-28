type Options = {
  message?: string;
  statusCode?: number;
  error?: Error | unknown;
};

export class RunError {
  message?: string;
  code: string;
  statusCode?: number;
  error?: Error | unknown;

  constructor(code: string, options: Options = {}) {
    this.code = code;
    this.message = options.message;
    this.statusCode = options.statusCode;
    this.error = options.error;
  }
}
