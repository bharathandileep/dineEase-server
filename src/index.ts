import { app } from "./app";
import { port } from "./config/environment";
import { connectToMongoDB } from "./db/connectMongoDb";

connectToMongoDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
