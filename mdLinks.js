import utils from "./utils.js";
// Para el archivo cli.js
// import { argv } from "node:process";
// const userPath = argv[2];

const {
  validatePath,
  isAbsolutePath,
  toAbsolutePath,
  pathIsDir,
  isMdFile,
  getLinks,
} = utils;

function mdLinks(userPath) {
  let mdFilesArr = [];
  let linksArr = [];
  return new Promise((resolve, reject) => {
    if (validatePath(userPath)) {
      let absPath = userPath;
      isAbsolutePath(userPath) ? absPath : (absPath = toAbsolutePath(userPath));
      if (!pathIsDir(absPath)) {
        isMdFile(absPath) ? mdFilesArr.push(absPath) : mdFilesArr;
      } else {
        console.log("must check directory");
      }
      resolve(
        mdFilesArr.map((file) => {
          getLinks(absPath);
          console.log("Resolved promise!");
        })
      );
    } else {
      reject("ERROR! This path doesn't exist :(");
    }
  });
}

mdLinks("preambulo.md").catch((msg) => {
  console.log(msg);
});
