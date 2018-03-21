const fs = require("fs-extra");

const { getApiLevels } = require("./getApiLevels");
const { getBuildToolsVersions } = require("./getBuildToolsVersions");

module.exports.start = async function start() {
  await fs.remove("./build");
  const template = await fs.readFile("./template.Dockerfile", { encoding: "utf-8" });
  const apiLevels = (await getApiLevels()).filter((level) => level >= 15);
  const buildToolsVersions = await getBuildToolsVersions();

  await Promise.all(
    apiLevels.map(async (apiLevel) => {
      return buildToolsVersions.filter((it) => it.startsWith(`${apiLevel}.`)).map(async (buildToolsVersion) => {
        const path = `./build/${apiLevel}/${buildToolsVersion}/Dockerfile`;
        const generatedDockerfile = template
          .replace(/{{API_LEVEL}}/i, apiLevel)
          .replace(/{{BUILD_TOOLS_VERSION}}/i, buildToolsVersion);

        await fs.ensureFile(path);
        return await fs.writeFile(path, generatedDockerfile, { encoding: "utf-8" });
      });
    }),
  );
};
