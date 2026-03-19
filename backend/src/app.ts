import express from "express";
import cors from "cors";

import userRouter from "./routes/user.route";
import categoryRouter from "./routes/category.route";
import transactionRouter from "./routes/transaction.route";
import { errorHander } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", userRouter);
app.use("/api", categoryRouter);
app.use("/api", transactionRouter);
app.use(errorHander);

export default app;
