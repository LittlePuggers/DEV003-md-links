import utils from "./utils.js";
import * as fs from "fs";
import * as fsp from "fs/promises";
// Para el archivo cli.js
// import { argv } from "node:process";
// const userPath = argv[2];

const {
  validatePath,
  isAbsolutePath,
  toAbsolutePath,
  pathIsDir,
  isMdFile,
  readFile,
  getLinks,
} = utils;

function mdFiles(userPath) {
  let mdFilesArr = [];
  return new Promise((resolve, reject) => {
    if (validatePath(userPath)) {
      let absPath = userPath;
      isAbsolutePath(userPath) ? absPath : (absPath = toAbsolutePath(userPath));
      if (!pathIsDir(absPath)) {
        isMdFile(absPath) ? mdFilesArr.push(absPath) : mdFilesArr;
      } else {
        console.log("must check directory");
      }
      resolve(mdFilesArr);
    } else {
      reject(`ERROR! ${userPath} doesn't exist :(`);
    }
  });
}

mdFiles("preambulo.md")
  .then((mdFilesArray) => {
    return readFile(mdFilesArray[0]); //necesito ir cambiando este index
  })
  .then((promiseAndPath) => {
    return promiseAndPath[0].then((fileContent) => {
      return getLinks(fileContent, promiseAndPath[1]);
    });
  })
  .then((linksArray) => {
    console.log(
      "This is the array of links found: " + JSON.stringify(linksArray)
    );
  });
