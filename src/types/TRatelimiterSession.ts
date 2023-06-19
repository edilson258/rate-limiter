export type TRatelimiterSession = {
  APIKey: string;
  requestsPerWindow: number;
  numberOfDoneRequests: number;
  windowDurationInSeconds: number;
  windowStartTimeInSeconds: number;
};
