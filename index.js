const fs = require("fs-extra");
const apiLevels = require("./api-levels.json");
const buildToolsVersions = require("./build-tools-versions.json");

(async () => {
  const template = await fs.readFile("./Dockerfile.template", { encoding: "utf-8" });

  await fs.remove("./build");

  await Promise.all(
    apiLevels.map(async apiLevel => {
      const buildToolsVersion = buildToolsVersions.find(it => it.includes(apiLevel));
      const path = `./build/${apiLevel}/Dockerfile`;
      const generatedDockerfile = template
        .replace(/{{API_LEVEL}}/i, apiLevel)
        .replace(/{{BUILD_TOOLS_VERSION}}/i, buildToolsVersion);

      await fs.ensureFile(path);
      return await fs.writeFile(path, generatedDockerfile, { encoding: "utf-8" });
    }),
  );
})();
