import utils from "./utils.js";

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
  return mdFiles(path) //A promise, takes path and returns an array of md files
    .then((mdFilesArray) => {
      return mdFilesArray.map((mdFile) => {
        //returns an array of [promise, path]
        return readFile(mdFile);
      });
    })
    .then((promiseAndPathArray) => {
      return promiseAndPathArray.map((promisePath) => {
        //takes promises and paths, returns a promise array resolving with objects
        return promisePath[0].then((fileContent) => {
          return getLinks(fileContent, promisePath[1]);
        });
      });
    })
    .then((promiseArray) => {
      return Promise.allSettled(promiseArray);
      //resolves all promises in array, returns array with [{state,value}] don't need state
    })
    .then((promiseArray) => {
      return promiseArray.map((result) => {
        //returns an array with the value of each element
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
    }) //shows the result
    .then((result) => {
      const resultArr = result.map((element) => {
        return element.value;
      });
      return resultArr;
    })
    .catch((err) => console.log(err));
};
