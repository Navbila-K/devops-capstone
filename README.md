# DevOps Capstone Project

A Node.js web app deployed via a full CI/CD pipeline.

## Tech Stack
- Node.js + Express
- Docker + Docker Hub
- Jenkins on AWS EC2
- Prometheus + Grafana
- Bash + Cron

## Run locally
npm install && node app.js

## CI/CD Flow
Push to GitHub → Jenkins triggers → Docker image built → pushed to Hub → deployed to App EC2