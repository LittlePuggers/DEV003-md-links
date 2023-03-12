import * as fs from "fs";
import path from "path";
import * as fsp from "fs/promises";

const utils = {
  //método que valida si la ruta existe
  validatePath: (userPath) => fs.existsSync(userPath),

  //método que checa si el path es absoluto
  isAbsolutePath: (userPath) => path.isAbsolute(userPath),

  //método que convierte el path relativo a absoluto
  toAbsolutePath: (userPath) => path.resolve(userPath),

  //método que checa si el path es una carpeta
  pathIsDir: (userPath) => fs.lstatSync(userPath).isDirectory(),

  //método que checa si el archivo es .md
  isMdFile: (userPath) => path.extname(userPath) === ".md",

  //método para leer el archivo
  readFile: (userPath) => {
    return [fsp.readFile(userPath, "utf8"), userPath];
  },

  //método que extrae los links del archivo .md
  getLinks: (fileContents, userPath) => {
    let mdFileStringData = JSON.stringify(fileContents);
    let regex =
      /(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()\s])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g;
    let links = [];
    // console.log(mdFileStringData);
    [...mdFileStringData.matchAll(regex)].forEach((m) => {
      links.push({
        href: m[4],
        text: m[2],
        file: userPath,
      });
    });
    // console.log(links);
    return links;
  },
};

//método que lee los elementos dentro de una carpeta y los mete a un array
// fs.readdir(file, null, (err, files) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(files);
//   }
// });

export default utils;
