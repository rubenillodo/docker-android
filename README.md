This repo downloads the list of [Android API levels](https://source.android.com/setup/build-numbers) and [build tools versions](https://developer.android.com/studio/releases/build-tools.html) and generates Docker images for all of them.

The Docker images are based on the https://github.com/rubenillodo/docker-android-base image, which contains the Android SDK tools. On top of that, this script installs:

```
sdkmanager "extras;google;m2repository"
sdkmanager "extras;android;m2repository"
sdkmanager "build-tools;{{BUILD_TOOLS_VERSION}}"
sdkmanager "platforms;android-{{API_LEVEL}}"
```

The images are pushed to [Docker Hub](https://hub.docker.com/r/rubenillodo/android-base/) with a tagging pattern: `api-${API_LEVEL}-tools-${BUILD_TOOLS_VERSION}`. You can see a [list of all the available tags on Docker Hub](https://hub.docker.com/r/rubenillodo/android/tags/).

## Generated combinations

Note that images are only generated for combinations of API levels and build tools that share the same major version. For example, you can find:

* `api-27-tools-27.0.3`
* `api-27-tools-27.0.2`
* `api-27-tools-27.0.1`

But you won't find:

* `api-27-tools-26.0.2`
* `api-26-tools-27.0.3`
