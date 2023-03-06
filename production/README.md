# Production Image Creation

To publish production images to Amazon Elastic Container Registry (Docker Repo), use the following steps:

- Increment the version number in quantstop/production/.env
- Open a terminal, and navigate to the production folder
- Log into Docker with AWS credentials.
    - `docker login -u AWS -p $(aws ecr get-login-password --region us-east-1) 673090532170.dkr.ecr.us-east-1.amazonaws.com`
        - or (for Windows:)
    - `aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 673090532170.dkr.ecr.us-east-1.amazonaws.com`
- Run the following commands:
    - `docker-compose build`
    - `docker-compose push`
        - Note: building and pushing the images for the first time can take a while (up to 20 minutes for slow connections).
- This will create two image tags: latest and ${version}
- Log onto EC2 and run the following commands:
    - `docker-compose pull`
    - `docker-compose down`
    - `docker-compose up -d`

# Big Picture

The Docker images are built using the docker-compose workflow. This means that the docker-compose.yml file controls the build process and defines the context and image tags. The docker-compose.yml file specifies the Dockerfile that is used for each service. For example, the Dockerfile that is specified for the client service is the ClientDockerfile located in the production folder. This file is a self-contained script that tells Docker how to build the image for the client service. It specifies the Node base image, copies the necessary files over, installs all the specified npm packages, and compiles to static JS.

Once the images are built, they are stored on Amazon ECR, which serves as an image repository. 

The EC2 instance pulls the images from the repo, and builds out the container with these images.

In order to log into the EC2 instance, go to AWS (aws.amazon.com), click on instances, and select the quantstop-webserver instance. Click on "connect", and it will give you instructions for connecting. You'll need the dev.pem file connect via SSH.

# EC2 Configuration:

The folder `./remoteSetup` contains the files needed to configure the Ec2 instance.

The `dev.pem` file is what is needed to connect to the EC2 instance. Copy this to your local machine, and run `chmod 400` to set the permissions on the file. This sets the file for root read-only, and denies all other access.

The `./remoteSetup/docker-compose.yml` file is a copy of the file that should be placed on the EC2 instance. This file controls the `docker-compose up` system of creating the containers that the server and client images will run in.

# References for `docker-compose`

These were useful links for creating the docker-compose.yml files.

https://stackoverflow.com/questions/33816456/how-to-tag-docker-image-with-docker-compose
https://stackoverflow.com/questions/68469150/setting-context-in-docker-compose-file-for-a-parent-folder
https://www.back2code.me/2020/01/multiple-image-tags-with-docker-compose/