// code away!
require("dotenv").config();
const server = require("./server.js");

const port = process.env.PORT || 4000;
const greeting = process.env.GREETING;
server.listen(5000, () => {
  console.log(
    `\n*** ${greeting} Server Running on http://localhost:${port} ***\n`
  );
});
