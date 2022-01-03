const { userRoutes, authRoutes, reportsRoutes } = require("./routes");

const setupRoutes = (app) => {
  app.use("/users", userRoutes);
  app.use("/auth", authRoutes);
  app.use("/routes", reportsRoutes);
};

module.exports = { setupRoutes };
