require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Gateway is running");
});

app.use(
  "/api/users",
  createProxyMiddleware({
    target: "http://localhost:5001",
    changeOrigin: true,
    proxyTimeout: 30000,
    timeout: 30000,
    onError: (err, req, res) => {
      console.error("User service proxy error:", err.message);
      res.status(500).json({ message: "User service proxy error" });
    },
  })
);

app.use(
  "/api/doctors",
  createProxyMiddleware({
    target: "http://localhost:5002",
    changeOrigin: true,
    proxyTimeout: 30000,
    timeout: 30000,
    onError: (err, req, res) => {
      console.error("Doctor service proxy error:", err.message);
      res.status(500).json({ message: "Doctor service proxy error" });
    },
  })
);

app.use(
  "/api/appointments",
  createProxyMiddleware({
    target: "http://localhost:5003",
    changeOrigin: true,
    proxyTimeout: 30000,
    timeout: 30000,
    onError: (err, req, res) => {
      console.error("Appointment service proxy error:", err.message);
      res.status(500).json({ message: "Appointment service proxy error" });
    },
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});