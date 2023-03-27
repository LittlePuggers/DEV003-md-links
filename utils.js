import * as fs from "fs";
import path from "path";
import * as fsp from "fs/promises";

const utils = {
  //validates if the path exists
  validatePath: (userPath) => fs.existsSync(userPath),

  //validates if the path is absolute
  isAbsolutePath: (userPath) => path.isAbsolute(userPath),

  //converts a relative path to absolute
  toAbsolutePath: (userPath) => path.resolve(userPath),

  //validates if path is a directory
  pathIsDir: (userPath) => fs.lstatSync(userPath).isDirectory(),

  //validates if file is markdown
  isMdFile: (userPath) => path.extname(userPath) === ".md",

  //reads file
  readFile: (userPath) => {
    return [fsp.readFile(userPath, "utf8"), userPath];
  },

  //gets links from .md file
  getLinks: (fileContents, userPath) => {
    let mdFileStringData = JSON.stringify(fileContents);
    let regex =
      /(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()\s])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g;
    let links = [];
    [...mdFileStringData.matchAll(regex)].forEach((m) => {
      links.push({
        href: m[4],
        text: m[2],
        file: userPath,
      });
    });
    return links;
  },

  //reads directory
  readDir: (userPath) => {
    return fs.readdirSync(userPath);
  },
};

export default utils;
