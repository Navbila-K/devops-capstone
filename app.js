const express = require('express');
const app = express();
const PORT = 3000;

// ---- EXTRA: parse incoming JSON requests ----
app.use(express.json());

// ---- EXTRA: log every request to console ----
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Home route
app.get('/', (req, res) => {
  // ---- EXTRA: added styled HTML page with more content ----
  res.send(`
    <html>
      <head>
        <title>DevOps Capstone</title>
        <style>
          body { font-family: Arial, sans-serif; background: #f0f4f8; text-align: center; padding: 50px; }
          h1 { color: #2c3e50; }
          .badge { background: #27ae60; color: white; padding: 8px 16px; border-radius: 20px; }
          .info { background: white; padding: 20px; border-radius: 10px; margin: 20px auto; max-width: 500px; }
        </style>
      </head>
      <body>
        <h1>🚀 DevOps Capstone App</h1>
        <p class="badge">Running in Docker on AWS EC2</p>
        <div class="info">
          <p><strong>Author:</strong> Navbila K</p>
          <p><strong>Stack:</strong> Node.js | Docker | Jenkins | AWS</p>
          <p><strong>Status:</strong> ✅ Live and Running</p>
          <!-- ---- EXTRA: shows live server time ---- -->
          <p><strong>Server Time:</strong> ${new Date().toLocaleString()}</p>
        </div>
      </body>
    </html>
  `);
});

// Health check route
app.get('/health', (req, res) => {
  // ---- EXTRA: added uptime and environment info to health response ----
  res.json({
    status: 'healthy',
    timestamp: new Date(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    port: PORT
  });
});

// ---- EXTRA: new /about route ----
app.get('/about', (req, res) => {
  res.json({
    project: 'DevOps Capstone Project',
    description: 'End-to-End CI/CD Pipeline using Jenkins, Docker, and AWS',
    techStack: ['Node.js', 'Docker', 'Jenkins', 'AWS EC2', 'Prometheus', 'Grafana'],
    author: 'Navbila K'
  });
});

// ---- EXTRA: 404 handler for unknown routes ----
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', status: 404 });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
  // ---- EXTRA: log environment on startup ----
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`
