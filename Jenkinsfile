node(null) {
    docker.image('cimg/node:16.20').inside('-p 3000:3000 -u root') {
        stage('Build') {
            sh 'npm cache clear --force'
            sh 'npm install'
        }
        stage('Test') {
            sh './jenkins/scripts/test.sh'
        }
        
        stage('Deliver') {
            steps {
                sh './jenkins/scripts/deliver.sh'
            }
        }
        stage('Manual Approval') {
            input message: 'Lanjutkan ke tahap Deploy? (Klik "Proceed" untuk melanjutkan)'
        }
        
        stage('Deploy') {
            sshagent(credentials: ['ec2-ssh-agent-key']) {
                sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@18.142.230.90 \
                    'pwd'
                """
            }
        }
    }
}

// 2390a0e74caef5c2feb5ae123d2fb6fb5026a8e3a57bf878a8e81819a09c5628

// scp -i /path/to/my-key.pem -r /path/to/build/ ec2-user@ec2-public-ip:/home/ec2-user/my-react-app


// scp -i /path/to/my-key.pem -r build/ ec2-user@123.45.67.89:/home/ec2-user/my-react-app


// instal nginx