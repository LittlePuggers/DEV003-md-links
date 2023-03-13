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
  readFile,
  getLinks,
  readDir,
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
        const dirContentsArr = readDir(absPath);
        dirContentsArr.forEach((element) => {
          const newPath = userPath + "/" + element;
          mdFiles(newPath).then((arr) => {
            // console.log(arr);
            return mdFilesArr.push(...arr);
          });
        });
      }
      resolve(mdFilesArr);
    } else {
      reject(`ERROR! ${userPath} doesn't exist :(`);
    }
  });
}

mdFiles("mdFiles") //Promesa, toma path y devuelve arr de archivos md
  .then((mdFilesArray) => {
    return mdFilesArray.map((mdFile) => {
      //devuelve arreglo que yo definí como [promesa,path]
      return readFile(mdFile);
    });
  })
  .then((promiseAndPathArray) => {
    return promiseAndPathArray.map((promisePath) => {
      //toma promesas y paths y devuelve un arreglo de promesas que resuelven en objetos
      return promisePath[0].then((fileContent) => {
        return getLinks(fileContent, promisePath[1]);
      });
    });
  })
  .then((promiseArray) => {
    return Promise.allSettled(promiseArray); //resuelve todas las promesas del array y devuelve un array [{estado,valor}] donde no necesitamos estado
  })
  .then((promiseArray) => {
    return promiseArray.map((result) => {
      //devuelve un arreglo con el valor de cada elemento
      return result.value;
    });
  })
  .then((data) => console.log(data)) //muestra el resultado
  .catch((err) => console.log(err));
