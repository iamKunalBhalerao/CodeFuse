import app from "./app";
import { PORT } from "./config/server";

app.listen(PORT, () => {
  console.log(`Codefuse Core server is running....`);
});
