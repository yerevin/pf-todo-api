"use strict";
import * as config from "config";

import * as Bcrypt from "bcrypt";
import * as moment from "moment";


export const generateAccessToken = (user: any) => {
  const saltAccess = Bcrypt.genSaltSync(parseInt(config.get("SALT_FACTOR")));
  const accessToken = Bcrypt.hashSync("B4c0//", saltAccess);
  const saltRefresh = Bcrypt.genSaltSync(parseInt(config.get("SALT_FACTOR")));
  const refreshToken = Bcrypt.hashSync("B4c0//", saltRefresh);
  const expireTime = moment().add(7, "d").unix();
  return {
    user: user._id,
    expireTime: expireTime,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};
