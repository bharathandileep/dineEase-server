import Express, { Application, Request, Response } from "express";
import { CustomError } from "./lib/errors/customError";
import { errorHandler } from "./middleware/globelErrorHandler";
import { port } from "./lib/constants";


const app: Application = Express();

app.get("/", (req: Request, res: Response) => {
  throw new CustomError("bad request", 400, false);
});

app.use("*", errorHandler);
app.listen(port, () => {
  console.log("server running");
});
