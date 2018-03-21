FROM rubenillodo/android-base

RUN sdkmanager "extras;google;m2repository"
RUN sdkmanager "extras;android;m2repository"
RUN sdkmanager "build-tools;{{BUILD_TOOLS_VERSION}}"
RUN sdkmanager "platforms;android-{{API_LEVEL}}"
