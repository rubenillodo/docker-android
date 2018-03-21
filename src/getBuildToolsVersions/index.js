const cheerio = require("cheerio");
const fetch = require("cross-fetch");

module.exports.getBuildToolsVersions = async function getBuildToolsVersions() {
  const $ = cheerio.load(await (await fetch("https://developer.android.com/studio/releases/build-tools.html")).text());

  return $(".toggle-content-img")
    .parent()
    .map((_, element) => {
      const toolsVersionString = $(element).text();
      if (typeof toolsVersionString !== "string") return null;

      return toolsVersionString.match(/Build Tools, Revision ([0-9.]+)/)[1];
    })
    .get();
};
