node {
    docker.image('node:16-buster-slim').inside('-p 3000:3000') {
        stage('Build') {
            sh 'npm cache clear --force'
            sh 'npm install'
        }
        stage('Test') {
            sh './jenkins/scripts/test.sh'
        }
        stage('Manual Approval') {
            input message: 'Lanjutkan ke tahap Deploy? (Klik "Proceed" untuk melanjutkan)'
        }
        stage('Deploy') {
            def ec2_ip = 'ec2-18-143-182-57.ap-southeast-1.compute.amazonaws.com'
            def ec2_user = 'ubuntu'
            def ec2_path = '/mnt/d/docker/aws_/test-environtment.pem'

            sh """
                ls /mnt/d/docker/a428-cicd-labs-submission
                ssh -i ${ec2_path} -o StrictHostKeyChecking=no -t ${ec2_user}@${ec2_ip} << EOF
                mkdir -p /home/ubuntu/my-app && cd /home/ubuntu/my-app
                git clone https://github.com/rinoagung/a428-cicd-labs.git || (cd a428-cicd-labs && git pull)
                cd a428-cicd-labs
                npm install
                npm start
                EOF
            """
            sh './jenkins/scripts/deliver.sh' 
            sleep 60
            sh './jenkins/scripts/kill.sh'
        }
    }
}
