export interface response {
  data: any;
  error: Error | null;
  success: boolean;
}

interface Error {
  message: string;
  code: number;
}
