pipeline {
  agent any

  environment {
    DOCKER_HUB_CREDENTIALS = credentials('docker-hub')
    IMAGE_NAME_FRONTEND = "yourdockerhub/frontend"
    IMAGE_NAME_BACKEND = "yourdockerhub/backend"
  }

  stages {
    stage('Clone') {
      steps {
        git 'https://github.com/your-name/ecommerce-project.git'
      }
    }

    stage('Build Backend') {
      steps {
        dir('backend') {
          sh './mvnw clean package -DskipTests'
        }
      }
    }

    stage('Build & Push Docker Images') {
      steps {
        sh 'docker login -u $DOCKER_HUB_CREDENTIALS_USR -p $DOCKER_HUB_CREDENTIALS_PSW'

        dir('frontend') {
          sh 'docker build -t $IMAGE_NAME_FRONTEND .'
          sh 'docker push $IMAGE_NAME_FRONTEND'
        }

        dir('backend') {
          sh 'docker build -t $IMAGE_NAME_BACKEND .'
          sh 'docker push $IMAGE_NAME_BACKEND'
        }
      }
    }

    stage('Deploy') {
      steps {
        sh 'docker-compose down || true'
        sh 'docker-compose pull'
        sh 'docker-compose up -d'
      }
    }
  }
}
