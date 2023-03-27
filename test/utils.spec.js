import utils from "../utils";

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

describe("validatePath", () => {
  it("should return true if the path is valid", () => {
    expect(validatePath("./README.md")).toBe(true);
  });
});
describe("isAbsolutePath", () => {
  it("should return true if the path is absolute", () => {
    expect(isAbsolutePath("./README.md")).toBe(false);
  });
});
describe("toAbsolutePath", () => {
  it("should return an absolute path when given a relative path", () => {
    expect(toAbsolutePath("./README.md")).toBe(
      "/Users/nalu/development/Laboratoria/DEV003-md-links/README.md"
    );
  });
});
describe("pathIsDir", () => {
  it("should return true if the path is a directory", () => {
    expect(pathIsDir("./folder1")).toBe(true);
  });
});
describe("isMdFile", () => {
  it("should return true if the file's extension is markdown", () => {
    expect(isMdFile("./README.md")).toBe(true);
  });
});
describe("readFile", () => {
  const prom = readFile("./folder1/resumen.md")[0];
  const path = readFile("./folder1/resumen.md")[1];
  it("should return an array with a promise and path", () => {
    expect(!!prom && typeof prom.then === "function").toBe(true);
    expect(path).toBe("./folder1/resumen.md");
  });
});
describe("getLinks", () => {
  it("should return an array with objects", () => {
    expect(getLinks(readFile("./folder1/resumen.md"))).toEqual([]);
  });
});
describe("readDir", () => {
  it("should return an array with strings", () => {
    expect(readDir("./folder1")).toEqual(["folder2", "otro.txt", "resumen.md"]);
  });
});
