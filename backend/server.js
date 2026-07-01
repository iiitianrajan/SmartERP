const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();

const pool = require("./src/config/db");

// Routes
const authRoutes = require("./src/routes/authRoutes");
const companyRoutes = require("./src/routes/companyRoutes");



const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/company",companyRoutes)

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to SmartERP Backend "
    });
});

app.get("/health", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            success: true,
            server: "Running",
            database: "Connected",
            time: result.rows[0].now
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            database: "Disconnected",
            error: error.message
        });

    }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
});