const app = require("./src/app");
require("./mongo");

const { PORT } = process.env;

const server = app.listen(PORT, () => {
  console.log(`Server listening on http://192.168.1.67:${PORT}/`);
});

module.exports = server;
