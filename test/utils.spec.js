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
  it("should return false if the path is a file", () => {
    expect(pathIsDir("./README.md")).toBe(false);
  });
});
describe("isMdFile", () => {
  it("should return true if the file's extension is markdown", () => {
    expect(isMdFile("./README.md")).toBe(true);
  });
});
describe("readFile", () => {
  const prom = readFile("./README.md")[0];
  const path = readFile("./README.md")[1];
  it("should return an array with a promise and path", () => {
    expect(!!prom && typeof prom.then === "function").toBe(true);
    expect(path).toBe("./README.md");
  });
});
describe("getLinks", () => {
  it("should return an array with objects", () => {
    expect(getLinks(readFile("./README.md"))).toEqual([]);
  });
});
describe("readDir", () => {
  it("should return an array with strings", () => {
    expect(readDir("./test")).toEqual(["md-links.spec.js", "utils.spec.js"]);
  });
});
