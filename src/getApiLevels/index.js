const cheerio = require("cheerio");
const fetch = require("cross-fetch");

module.exports.getApiLevels = async function getApiLevels() {
  const $ = cheerio.load(await (await fetch("https://source.android.com/setup/build-numbers")).text());

  const $table = $("#platform-code-names-versions-api-levels-and-ndk-releases")
    .nextAll("table")
    .first();

  return $table
    .find("tr")
    .map((_, element) => {
      const levelString = $(element)
        .children("td")
        .last()
        .html();

      if (typeof levelString !== "string") return null;

      return Number.parseInt(levelString.match(/^API level ([0-9]+)/)[1]);
    })
    .get();
};
