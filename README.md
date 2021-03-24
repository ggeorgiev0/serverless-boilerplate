# pool-party-backend
A serverless application.
***
## Table of Contents
1. [Configure](#configure)
2. [Deploy](#deploy)
3. [Invoke Lambda](#invoke-lambda)

***
## Configure
To configure aws cli to use your credentials type ```aws configure```
You will be asked to provide ```AWS Access Key ID``` and ```AWS Secret Access Key```.
***
## Deploy
Full application deploy:
``sls deploy -v --stage dev`` - replace dev with the stage (dev, qa, production).
Lambda deploy:
``sls deploy -f {lambda} --stage dev``

## Invoke Lambda
To invoke run
``sls invoke -f {lambda}``