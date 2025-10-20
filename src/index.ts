import "dotenv/config";
import express, { type Request, type Response } from "express";

//Importing Routes
import analyzerRoutes from "./routes/analyzer.routes.ts";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use("/", analyzerRoutes);

// Root Endpoint
app.get("/", (req: Request, res: Response) => {
  res.send("String Analyzer Service is running");
});

app.listen(PORT, () => {    
  console.log(`Server is running on port ${PORT}`);
});