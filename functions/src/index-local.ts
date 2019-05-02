import { app } from "./app";

const { PORT } = process.env;
if (!PORT) {
  throw new Error("Environment variable PORT must be required");
}

app.listen(PORT, () => {
  console.log(`Server listening on :${PORT}`);
});
