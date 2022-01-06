const {
  userRoutes,
  authRoutes,
  reportsRoutes,
  locationRoutes,
} = require("./routes");

const setupRoutes = (app) => {
  app.use("/users", userRoutes);
  app.use("/auth", authRoutes);
  app.use("/reports", reportsRoutes);
  app.use("/location", locationRoutes);
};

module.exports = { setupRoutes };
