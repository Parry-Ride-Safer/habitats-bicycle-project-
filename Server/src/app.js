const {
  userRoutes,
  authRoutes,
  reportsRoutes,
  locationRoutes,
  admRoutes,
} = require("./routes");

const setupRoutes = (app) => {
  app.use("/users", userRoutes);
  app.use("/auth", authRoutes);
  app.use("/reports", reportsRoutes);
  app.use("/location", locationRoutes);
  app.use("/adm", admRoutes);
};

module.exports = { setupRoutes };
