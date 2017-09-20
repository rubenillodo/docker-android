const fs = require('fs-extra');
const apiLevels = require('./api-levels.json');
const buildToolsVersions = require('./build-tools-versions.json');

(async () => {
  const template = await fs.readFile('./Dockerfile.template', { encoding: 'utf-8' });

  await fs.remove('./build');

  apiLevels.forEach(async (apiLevel) => {
    const buildToolsVersion = buildToolsVersions[0];
    const path = `./build/${apiLevel}/Dockerfile`;
    const generatedDockerfile = template.replace(/{{API_LEVEL}}/i, apiLevel)
        .replace(/{{BUILD_TOOLS_VERSION}}/i, buildToolsVersion);

    await fs.ensureFile(path);
    await fs.writeFile(path, generatedDockerfile, { encoding: 'utf-8' });
  });
})();
