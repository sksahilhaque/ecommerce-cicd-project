pipeline {
  agent any

  environment {
    IMAGE_NAME_FRONTEND = "sksahilhaque/frontend"
    IMAGE_NAME_BACKEND = "sksahilhaque/backend"
  }

  tools {
    maven 'Maven 3.9.4'
  }

  // stages {
  //   stage('Clone') {
  //     steps {
  //       git 'https://github.com/sksahilhaque/ecommerce-cicd-project.git'
  //     }
  //   }

    stage('Build Backend') {
      steps {
        dir('backend') {
          sh 'mvn clean package -DskipTests'
        }
      }
    }

    stage('Build & Push Docker Images') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

            # Build and push frontend
            cd frontend
            docker build -t $IMAGE_NAME_FRONTEND .
            docker push $IMAGE_NAME_FRONTEND
            cd ..

            # Build and push backend
            cd backend
            docker build -t $IMAGE_NAME_BACKEND .
            docker push $IMAGE_NAME_BACKEND
          '''
        }
      }
    }

    stage('Deploy') {
      steps {
        sh '''
          docker-compose down || true
          docker-compose pull
          docker-compose up -d
        '''
      }
    }
  }

  post {
    success {
      echo '✅ CI/CD pipeline completed successfully!'
    }
    failure {
      echo '❌ CI/CD pipeline failed. Check build logs.'
    }
  }
}
