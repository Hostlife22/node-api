import express, { Express } from "express";
import { Server } from "http";
import { ExeptionFilter } from "./errors/exeption.filter";
import { ILogger } from "./logger/logger.interface";
import { UserConroller } from "./users/user.controller";

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: ILogger;
  userConroller: UserConroller;
  exeptionFilter: ExeptionFilter;

  constructor(
    logger: ILogger,
    userConroller: UserConroller,
    exeptionFilter: ExeptionFilter
  ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.userConroller = userConroller;
    this.exeptionFilter = exeptionFilter;
  }

  userRouter() {
    this.app.use("/users", this.userConroller.router);
  }

  useExeptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  init() {
    this.userRouter();
    this.useExeptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server started on http://localhost:${this.port}`);
  }
}
