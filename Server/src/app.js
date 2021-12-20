const { userRoutes, authRoutes } = require("./routes");

const setupRoutes = (app) => {
  app.use("/", userRoutes);
  app.use("/auth", authRoutes);
};

module.exports = { setupRoutes };
