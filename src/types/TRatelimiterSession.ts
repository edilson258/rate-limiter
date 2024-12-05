export type RatelimiterSession = {
  userEmail: string;
  requestsPerWindow: number;
  numberOfDoneRequests: number;
  windowDurationInSeconds: number;
  windowStartTimeInSeconds: number;
};
