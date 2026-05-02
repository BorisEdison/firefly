import dotenv from "dotenv"
import app from "./app.js"
import { APP_CONSTANTS } from "./constants/app.constants.js";

dotenv.config();

const PORT = process.env.PORT || APP_CONSTANTS.DEFAULT_PORT;

app.listen(PORT, () => {
  console.log( `[INFO] Server running on port ${PORT}`)
})