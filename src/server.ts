export const serverStart = async (server) => {
  try {
    await server.listen(8080, "0.0.0.0");
    server.blipp();
    server.swagger();
  } catch (err) {
    console.log(err);
    server.log.error(err);
    process.exit(1);
  }
};