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

export function mdFiles(userPath) {
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
            return mdFilesArr.push(...arr);
          });
        });
      }
      resolve(mdFilesArr);
    } else {
      reject("ERROR! This path doesn't exist");
    }
  });
}

export const mdLinks = (path, options) => {
  return mdFiles(path) //Promesa, toma path y devuelve arr de archivos md
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
      return Promise.allSettled(promiseArray);
      //resuelve todas las promesas del array y devuelve un array [{estado,valor}] donde no necesitamos estado
    })
    .then((promiseArray) => {
      return promiseArray.map((result) => {
        //devuelve un arreglo con el valor de cada elemento
        return result.value;
      });
    })
    .then((data) => {
      const dataFlat = data.flat();
      if (options.validate) {
        return dataFlat.map((linkObj) => {
          return fetch(String(linkObj.href)).then((res) => {
            const linkObj2 = {
              ...linkObj,
              status: res.status,
              ok: res.statusText,
            };
            return linkObj2;
          });
        });
      } else {
        return dataFlat;
      }
    })
    .then((arr) => {
      return Promise.allSettled(arr);
    }) //muestra el resultado
    .then((result) => {
      const resultArr = result.map((element) => {
        return element.value;
      });
      return resultArr;
    })
    .catch((err) => console.log(err));
};

mdLinks("folder1", { validate: true }).then((result) => {
  console.log(result);
});
