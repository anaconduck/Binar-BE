import { Request, Response } from "express";
import { DefaultResponse } from "../models/dto/default";
import { User } from "../models/entity/user";
import { UserRequest } from "../models/dto/user";
import UsersServices from "../services/users";

class UsersHandler {
  async createUser(req: Request, res: Response) {
    const payload: UserRequest = req.body;
    payload.profile_picture_file = req.file;
    if (payload.role === "superadmin") {
      const response: DefaultResponse = {
        status: "BAD_REQUEST",
        message: "cant create superadmin",
        data: {
          created_user: null,
        },
      };

      return res.status(400).send(response);
    }
    if (
      !(
        payload.name &&
        payload.email &&
        payload.profile_picture_file &&
        payload.password
      )
    ) {
      const response: DefaultResponse = {
        status: "BAD_REQUEST",
        message: "fields cannot be empty",
        data: {
          created_user: null,
        },
      };

      return res.status(400).send(response);
    }

    const createdUser: User = await UsersServices.createUser(payload);

    const response: DefaultResponse = {
      status: "CREATED",
      message: "User succesfully created",
      data: {
        created_user: createdUser,
      },
    };

    res.status(201).send(response);
  }
}

export default UsersHandler;