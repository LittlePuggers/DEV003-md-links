import { mdLinks } from "./mdLinks.js";
import { argv } from "node:process";

const path = argv[2];

function cli() {
  const validate = argv.includes("--validate");
  const stats = argv.includes("--stats");
  mdLinks(path, { validate: validate })
    .then((resp) => {
      let uniqueUrlsArr = [];
      let brokenUrlsArr = [];
      resp.forEach((link) => {
        const { href, text, file, status, ok } = link;
        let trimText = text;
        if (trimText.length > 50) {
          trimText = `${trimText.slice(0, 50)}...`;
        }
        const uniqueUrls = resp.filter((linkObj) => href === linkObj.href);
        if (uniqueUrls.length === 1) {
          uniqueUrlsArr.push(uniqueUrls[0]);
        }
        if (status === 404) {
          brokenUrlsArr.push(link);
        }
        if (!stats) {
          console.log("------------------------------");
          console.log(`URL: ${href}`);
          console.log(`Text: ${trimText}`);
          console.log(`File: ${file}`);
        }
        if (validate && !stats) {
          console.log(`Status: ${ok}`);
          console.log(`Status Code: ${status}`);
        }
      });

      if (stats) {
        console.log(`Total: ${resp.length}`);
        console.log(`Unique: ${uniqueUrlsArr.length}`);
        if (validate) {
          console.log(`Broken: ${brokenUrlsArr.length}`);
        }
      }
      process.exit(0);
    })
    .catch((error) => {
      console.log(error);
    });
}
cli();
