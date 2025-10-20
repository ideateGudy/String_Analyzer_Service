import "dotenv/config";
import express, { type Request, type Response } from "express";

//Importing Routes
import analyzerRoutes from "./routes/analyzer.routes.ts";
import { loggingMiddleware } from "./middlewares/logging.ts";
import { limiter } from "./middlewares/rate-limiting.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggingMiddleware);
app.use(limiter);

// Routes
app.use("/", analyzerRoutes);

// Root Endpoint
app.get("/", (req: Request, res: Response) => {
  res.send("String Analyzer Service is running");
});

// Error Handling Middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {    
  console.log(`Server is running on port ${PORT}`);
});