pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'navbilak/devops-capstone'
        APP_EC2     = '52.55.224.154'
    }
    stages {
        stage('Clone') {
            steps { checkout scm }
        }
        stage('Install') {
            steps { sh 'npm install' }
        }
        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} ."
                sh "docker tag ${DOCKER_IMAGE}:${BUILD_NUMBER} ${DOCKER_IMAGE}:latest"
            }
        }
        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS')]) {
                    sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                    sh "docker push ${DOCKER_IMAGE}:latest"
                }
            }
        }
        stage('Deploy to App EC2') {
            steps {
                sshagent(['app-ec2-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@${APP_EC2} '
                        docker pull ${DOCKER_IMAGE}:latest &&
                        docker stop capstone-app || true &&
                        docker rm capstone-app || true &&
                        docker run -d --name capstone-app -p 80:3000 ${DOCKER_IMAGE}:latest
                        '
                    """
                }
            }
        }
    }
}
