import { Options } from "@mikro-orm/core";
import { Test } from "./entities/test-entity";

const options: Options = {
  entities: [Test],
  type: "sqlite",
  dbName: "testdb2",
  debug: true,
  port: 3306,
  user: "root",
  password: "password",
};

export default options;
