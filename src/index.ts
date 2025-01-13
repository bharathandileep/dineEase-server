import Express, { Application, Request, Response } from "express";
import { CustomError } from "./lib/errors/customError";
import { port } from "./config/environment";
import { errorHandler } from "./middleware/globelErrorHandler";
import { HTTP_STATUS_CODE } from "./lib/constants/httpStatusCodes";
import { ERROR_TYPES } from "./lib/constants/errorType";
import { connectToMongoDB } from "./db/connectMongoDb";

// import figlet from "figlet";
// import chalk from "chalk";

const app: Application = Express();
app.use(Express.json());

app.get("/", (req: Request, res: Response) => {
  throw new CustomError(
    "Request Url not found",
    HTTP_STATUS_CODE.BAD_REQUEST,
    ERROR_TYPES.BAD_REQUEST_ERROR,
    false
  );
});

app.use(errorHandler);
app.use("*", errorHandler);

// connectToMongoDB()
//   // .then(() => {
//   //   figlet("DINEEASE!", (err:any, data:any) => {
//   //     if (err) {
//   //       console.log("Error generating ASCII art");
//   //       return;
//   //     }
//   //     console.log(chalk.green(data));
//   //     console.log(chalk.green.bold(`======================================`));
//   //     console.log(chalk.blue.bold(`🌐 Server is running on:`));
//   //     console.log(chalk.greenBright(`    http://localhost:${port}`));
//   //     console.log(chalk.green.bold(`======================================`));
//   //   });
//     app.listen(port, () => {
//       console.log(`Express Server running on http://localhost:${port}`);
//     });
//   })
//   .catch((error) => {
//     console.error("MongoDB connection failed:", error);
//     process.exit(1);
//   });

connectToMongoDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
