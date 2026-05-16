pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'navbilak/devops-capstone'
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
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh "docker push ${DOCKER_IMAGE}:latest"
                }
            }
        }
        stage('Deploy Locally') {
            steps {
                sh '''
                    docker pull navbilak/devops-capstone:latest
                    docker stop capstone-app || true
                    docker rm capstone-app || true
                    docker run -d --name capstone-app -p 80:3000 navbilak/devops-capstone:latest
                '''
            }
        }
    }
}
