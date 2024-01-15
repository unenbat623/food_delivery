import express, { Application } from "express";
import color from "colors";

const app: Application = express();

app.listen(8080, () => console.log(color.rainbow("Server is running")));
