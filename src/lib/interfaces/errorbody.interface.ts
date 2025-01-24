export interface errorBody {
  message: string;
  statusCode: number;
  status: boolean;
  stack?: string;
  errorType: string;
  timestamp: string;
}
