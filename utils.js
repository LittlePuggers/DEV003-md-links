import * as fs from "fs";
import path from "path";

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

  //método que extrae los links del archivo .md
  getLinks: (userPath) =>
    fs.readFile(userPath, "utf8", (err, data) => {
      if (err) {
        console.log(`ERROR!: ${err}`);
      } else {
        let mdFileStringData = JSON.stringify(data);
        let regex =
          /(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()\s])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g;
        let links = [];
        [...mdFileStringData.matchAll(regex)].forEach((m) => {
          links.push({
            text: m[2],
            link: m[4],
            file: userPath,
          });
        });
        console.log(links);
      }
    }),
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
