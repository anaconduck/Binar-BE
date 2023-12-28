import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UsersRepository from "../repositories/users";
import { TokenPayload } from "../models/entity/auth";

class AuthMiddleware {
  //Permission to login 
  static async authenticate(req: Request, res: Response, next: NextFunction) {
    // Decode token & validate token
    // Get token from authorization header
    const authHeader = req.get("Authorization");

    let accessToken: string;
    if (authHeader && authHeader.startsWith("Bearer"))
      accessToken = authHeader.split(" ")[1];
    else
      return res.status(401).send({
        status: "UNATHORIZED",
        message: "You need to login to access this resource",
        data: null,
      });

    // Validate jwt token
    try {
      const jwtSecret = "SECRET";

      const payload = jwt.verify(accessToken, jwtSecret) as TokenPayload;

      const user = await UsersRepository.getUserByEmail(payload.email);

      if (!user)
        return res.status(401).send({
          status: "UNATHORIZED",
          message: "User doesn't exist",
          data: null,
        });
      req.user = user;

      next();
    } catch (error) {
      return res.status(401).send({
        status: "UNAUTHORIZED",
        message: "Session expired, please login again",
        data: null,
      });
    }
  }

  //Only admin 
  static async authenticateAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // Decode token & validate token
    // Get token from authorization header
    const authHeader = req.get("Authorization");

    let accessToken: string;
    if (authHeader && authHeader.startsWith("Bearer"))
      accessToken = authHeader.split(" ")[1];
    else
      return res.status(401).send({
        status: "UNATHORIZED",
        message: "You need to logicccn to access this resource",
        data: null,
      });

    // Validate jwt token
    try {
      const jwtSecret = "SECRET";

      const payload = jwt.verify(accessToken, jwtSecret) as TokenPayload;

      const user = await UsersRepository.getUserByEmail(payload.email);

      if (!user)
        return res.status(401).send({
          status: "UNATHORIZED",
          message: "User doesn't exist",
          data: null,
        });

      // Check user role
      if (!(user.role === "admin" || user.role === "superadmin")) {
        return res.status(403).send({
          status: "FORBIDDEN",
          message: "Only Admin",
          data: null,
        });
      }

      req.user = user;

      next();
    } catch (error) {
      return res.status(401).send({
        status: "UNAUTHORIZED",
        message: "Session expired, please login again",
        data: null,
      });
    }
  }

  //Only Superadmin
  static async authenticateSuperAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // Decode token & validate token
    // Get token from authorization header
    const authHeader = req.get("Authorization");

    let accessToken: string;
    if (authHeader && authHeader.startsWith("Bearer"))
      accessToken = authHeader.split(" ")[1];
    else
      return res.status(401).send({
        status: "UNATHORIZED",
        message: "You need to lemango access this resource",
        data: null,
      });

    // Validate jwt token
    try {
      const jwtSecret = "SECRET";

      const payload = jwt.verify(accessToken, jwtSecret) as TokenPayload;

      const user = await UsersRepository.getUserByEmail(payload.email);

      if (!user)
        return res.status(401).send({
          status: "UNATHORIZED",
          message: "User doesn't exist",
          data: null,
        });

      // Check user role
      if (user.role !== "superadmin") {
        return res.status(403).send({
          status: "FORBIDDEN",
          message: "Only SuperAdmin",
          data: null,
        });
      }

      req.user = user;

      next();
    } catch (error) {
      return res.status(401).send({
        status: "UNAUTHORIZED",
        message: "Session expired, please login again",
        data: null,
      });
    }
  }
}

export default AuthMiddleware;