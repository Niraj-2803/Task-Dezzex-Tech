require("dotenv").config();
const express = require("express");
const cors = require("cors");
const initDatabase = require("../config/init")
const setupSwagger = require("../utils/swagger/swagger");

const appointmentsRoutes = require("../routes/appointments.routes");
const blogRoutes = require("../routes/blog.routes");
const caseRoutes = require("../routes/case/case.routes");
const caseManagerRoutes = require("../routes/case/case-manager.route");
const clientRoutes = require("../routes/client.routes");
const lawyersRoutes = require("../routes/lawyer.routes");

const app = express();

app.use(cors());
app.use(express.json());

initDatabase();

// Routes
app.use("/api/appointments", appointmentsRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/cases", caseRoutes);
app.use("/api/cases/manager", caseManagerRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/lawyer", lawyersRoutes);

// Swagger
setupSwagger(app);

module.exports = app;