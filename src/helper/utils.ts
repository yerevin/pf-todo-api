const Path = require("path");
const moment = require("moment");

export const bearerTokenCheck = async (server, token: string) => {
  const AccessToken = server.db.models.AccessToken;
  const existingAcessToken = await AccessToken.findOne({
    accessToken: token?.replace("Bearer ", ""),
  });
  try {
    if (existingAcessToken === null) {
      return false;
    } else {
      const actualTimestamp = moment().unix();

      if (existingAcessToken.expireTime - actualTimestamp < 0) {
        return false;
      } else {
        return existingAcessToken.user;
      }
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getFiles = async (path: string) => {
  path = path[path.length - 1] !== "/" ? path + "/" : path;
  let files = [];
  try {
    files = require("fs").readdirSync(Path.resolve(__dirname, "../..", path));
  } catch (e) {
    console.log(e);
    process.exit();
  }
  return files.map((file: any) => {
    return Path.resolve(__dirname, "../..", path, file);
  });
};
