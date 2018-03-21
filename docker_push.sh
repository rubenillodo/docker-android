#!/bin/bash

echo "Logging in to Docker Hub…"
docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD"

for apiLevel in ./build/*/
do
  apiLevel=${apiLevel%*/}
  apiLevel=${apiLevel##*/}

  for buildToolsVersion in ./build/$apiLevel/*/
  do
    buildToolsVersion=${buildToolsVersion%*/}
    buildToolsVersion=${buildToolsVersion##*/}

    echo "Building for API level ${apiLevel} with build tools ${buildToolsVersion}…"
    docker build -t rubenillodo/android:api-$apiLevel-tools-$buildToolsVersion -f build/$apiLevel/$buildToolsVersion/Dockerfile .
    docker push rubenillodo/android:api-$apiLevel-tools-$buildToolsVersion
  done
done
