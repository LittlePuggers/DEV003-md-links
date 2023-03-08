import { argv } from "node:process";
import utils from "./utils.js";

const {
  validatePath,
  isAbsolutePath,
  toAbsolutePath,
  pathIsDir,
  isMdFile,
  getLinks,
} = utils;

const userPath = argv[2];

function mdLinks(userPath) {
  let mdFilesArr = [];
  let linksArr = [];
  if (validatePath(userPath)) {
    // console.log(`${userPath} exists!`);
    let absPath = userPath;
    isAbsolutePath(userPath) ? absPath : (absPath = toAbsolutePath(userPath));
    // console.log(userPath);
    // console.log(absPath);
    if (!pathIsDir(absPath)) {
      isMdFile(absPath) ? mdFilesArr.push(absPath) : mdFilesArr;
      // console.log(mdFilesArr);
    } else {
      console.log("must check directory");
    }
    mdFilesArr.map((file) => {
      getLinks(absPath);
    });
  } else {
    console.log(`ERROR! ${userPath} doesnt exist :(`);
  }
}

mdLinks(userPath);
