node(null) {
    
    checkout scm

    docker.image('cimg/node:16.20').inside('-p 3000:3000 -u root') {
        stage('Build') {
            sh 'npm cache clear --force'
            sh 'npm install'
        }
        stage('Test') {
            sh './jenkins/scripts/test.sh'
        }
        
        stage('Deliver') {
            // sh './jenkins/scripts/deliver.sh'
            sh 'ls -la'
            sh 'cd src && cat App.js'
        }
        // stage('Manual Approval') {
        //     input message: 'Ingin manjutkan ke tahap Deploy? (Klik "Proceed" untuk melanjutkan)'
        // }
        
        // stage('Deploy') {
        //     sshagent(credentials: ['ec2-ssh-agent-key']) {
        //         sh """
        //             scp -o StrictHostKeyChecking=no -r build ${env.AWS_USER}@${env.AWS_IP}:/home/ubuntu/ \
        //         """
        //     }
        // }
    }
}
