import express, { Application, Request, Response } from "express";
import { checkConnection } from "./dbconfig";
import { userRoutes } from "./route/userRoute";
import cors from "cors";

const app: Application = express();
const PORT = 3080;
app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);

app.get("/", (req: Request, res: Response) => {
  return res.json({ message: "successssss" });
});

app.listen(PORT, () => {
  console.log(`listening in port http://localhost:${PORT}`);
  checkConnection();
});

