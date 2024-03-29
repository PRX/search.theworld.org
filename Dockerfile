FROM node:20-alpine

LABEL maintainer="PRX <sysadmin@prx.org>"
LABEL org.prx.spire.publish.s3="LAMBDA_ZIP"

WORKDIR /app

RUN mkdir --parents /.prxci

RUN apk add zip

ADD package.json .
ADD index.js .

# This zip file is what will be deployed as the Lambda layer.
# Add any necessary files to it.
RUN zip --quiet --recurse-paths /.prxci/build.zip .
