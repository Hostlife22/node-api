import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { HTTPError } from "../errors/http-error.class";
import { LoggerService } from "../logger/logger.service";

export class UserConroller extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);
    this.bindRoutes([
      { path: "/register", method: "post", func: this.register },
      { path: "/login", method: "post", func: this.login },
    ]);
  }

  public login(req: Request, res: Response, next: NextFunction) {
    next(new HTTPError(401, "error logging in", "login"));
  }

  public register(req: Request, res: Response, next: NextFunction) {
    next(new HTTPError(401, "error registering"));
  }
}
