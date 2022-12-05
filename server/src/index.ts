//Import from type ORM
import "reflect-metadata";

import app from "./app";

async function main() {
  //Start connection with db
  try {
    app.listen(3000);
    console.log("server listening to port ", 3000);
  } catch (error) {
    console.log(error);
  }
}

main();
