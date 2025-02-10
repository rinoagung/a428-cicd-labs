node(null) {
    withEnv(readEnvFromFile('.env')) {
        docker.image('cimg/node:16.20').inside('-p 3000:3000 -u root') {
            stage('Build') {
                sh 'npm cache clear --force'
                sh 'npm install'
            }
            stage('Test') {
                sh './jenkins/scripts/test.sh'
            }
            stage('Deliver') {
                sh './jenkins/scripts/deliver.sh'
            }
            stage('Manual Approval') {
                input message: 'Lanjutkan ke tahap Deploy? (Klik "Proceed" untuk melanjutkan)'
            }
            stage('Deploy') {
                sshagent(credentials: ['ec2-ssh-agent-key']) {
                    sh """
                        scp -o StrictHostKeyChecking=no -r build ${env.AWS_USER}@${env.AWS_IP}:/home/ubuntu/
                    """
                }
            }
        }
    }
}

def readEnvFromFile(envFilePath) {
    def envVars = []
    def envFile = new File(envFilePath)
    
    if (envFile.exists()) {
        envFile.eachLine { line ->
            def keyValue = line.split('=', 2)
            if (keyValue.length == 2) {
                envVars.add("${keyValue[0]}=${keyValue[1]}")
            }
        }
    }
    return envVars
}
