"use strict";

import { Document, Schema, model } from "mongoose";

export interface AccessTokenDocument extends Document {
  expireTime: number;
  accessToken: string;
  refreshToken: string;
  createdAt: Date;
  updateAt: Date;
  user: Schema.Types.ObjectId;
}

export interface AccessTokenModel extends AccessTokenDocument {}

const AccessTokenSchema: Schema = new Schema(
  {
    expireTime: {
      type: Number,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    // RELATIONS
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

AccessTokenSchema.index({
  accessToken: 1,
});

export const AccessToken = model<AccessTokenModel>(
  "AccessToken",
  AccessTokenSchema
);
