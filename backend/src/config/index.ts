const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 3001,
  maxRequests: process.env.MAX_REQUESTS ? Number(process.env.MAX_REQUESTS) : 200,
  timeWindow: process.env.TIME_WINDOW ? Number(process.env.TIME_WINDOW) : "15 minutes",
  bodyLimit: process.env.BODY_LIMIT ? Number(process.env.BODY_LIMIT) : 100_000_000,
  corsOrigins: process.env.CORS_ORIGINS?.split(",") ?? ["http://localhost:5173"],
};



export default config;