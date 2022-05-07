"use strict";
import * as bcrypt from "bcrypt";
import * as config from "config";

import {
  Document,
  Schema,
  model,
  HookNextFunction,
  Query,
  Model,
} from "mongoose";

export interface IUserDocument extends Document {
  email: string;
  password: string;
  accessToken: string;
  createdAt: Date;
  updateAt: Date;
  // RELATIONS
  tasks: Array<Schema.Types.ObjectId>;
}

export interface UserModel extends IUserDocument {
  comparePassword(password: string): boolean;
  hashPassword(password: string): string;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=.]{6,30}$/,
    },
    accessToken: {
      type: String,
    },
    // RELATIONS
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  { collection: "users", timestamps: true }
);

UserSchema.index({
  email: 1,
});

UserSchema.methods.comparePassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, parseInt(config.get("SALT_FACTOR") as any));
};

UserSchema.pre<UserModel>("save", function (next: HookNextFunction) {
  if (this.password && this.isModified("password")) {
    this.password = this.hashPassword(this.password);
  }

  return next();
});

UserSchema.pre<Query<UserModel>>("findOneAndUpdate", function (
  next: HookNextFunction
) {
  if (this.getUpdate().password) {
    this.getUpdate().password = UserSchema.methods.hashPassword(
      this.getUpdate().password
    );
  }

  return next();
});

export const User: Model<UserModel> = model<UserModel>("User", UserSchema);
