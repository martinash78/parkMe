import app from "./app";

const port = 8080;
const host = "0.0.0.0";

app.listen(port, host, () =>
  console.log(`Example app listening at http://${host}:${port}`)
);
