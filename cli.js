import { mdLinks } from "./mdLinks.js";
import { argv } from "node:process";

// CODIGO EXTERNO

const pathToFile = argv[2];

function cli() {
  const validate = argv.includes("--validate");
  const stats = argv.includes("--stats");

  mdLinks(pathToFile, { validate: validate })
    .then((resp) => {
      let uniqueUrlsArray = [];
      let brokenUrlsArray = [];

      resp.forEach((element) => {
        const { file, href, ok, status, text } = element;
        let hrefTruncated = href;

        if (hrefTruncated.length > 50) {
          hrefTruncated = hrefTruncated.slice(0, 50) + "...";
        }

        const uniqueUrls = resp.filter((obj) => href === obj.href);

        if (uniqueUrls.length === 1) {
          uniqueUrlsArray.push(uniqueUrls[0]);
        }

        if (status === 404) {
          brokenUrlsArray.push(element);
        }

        console.log(
          "\n=========================================================="
        );
        console.log("File: ", file);
        console.log("URL: ", href);
        if (validate) {
          console.log("Status: ", ok);
          console.log("Status Code: ", status);
        }
        console.log("Link Text: ", text);
        console.log(
          "============================================================"
        );
      });

      if (stats) {
        console.log("\nTotal: " + resp.length);
        console.log("Unique: " + uniqueUrlsArray.length);
        if (validate) {
          console.log("Broken: " + brokenUrlsArray.length);
        }
      }
      process.exit(0);
    })
    .catch((error) => {
      console.log(error);
    });
}
cli();
