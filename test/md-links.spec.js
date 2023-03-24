import { mdFiles, mdLinks } from "../mdLinks.js";

describe("mdFiles", () => {
  it("should reject promise", () => {
    expect(mdFiles("./folder1/resumen2.md")).rejects.toBe(
      "ERROR! This path doesn't exist"
    );
  });
  it("should resolve with an array of markdown files", () => {
    expect(mdFiles("./folder1")).resolves.toEqual([
      "/Users/nalu/development/Laboratoria/DEV003-md-links/folder1/folder2/preambulo.md",
      "/Users/nalu/development/Laboratoria/DEV003-md-links/folder1/resumen.md",
    ]);
  });
});
// describe("mdLinks", () => {
//   it("should resolve with an array of links"), () => {};
// });
