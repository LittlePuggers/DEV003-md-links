import { mdFiles, mdLinks } from "../mdLinks.js";

describe("mdFiles", () => {
  it("should reject promise", async () => {
    await expect(mdFiles("./folder1/resumen2.md")).rejects.toBe(
      "ERROR! This path doesn't exist"
    );
  });
  it("should resolve with an array of markdown files", async () => {
    await expect(mdFiles("./folder1")).resolves.toEqual([
      "/Users/nalu/development/Laboratoria/DEV003-md-links/folder1/folder2/preambulo.md",
      "/Users/nalu/development/Laboratoria/DEV003-md-links/folder1/resumen.md",
    ]);
  });
});

global.fetch = jest.fn(() => {
  return Promise.resolve({
    href: true,
    text: true,
    file: true,
    status: true,
    ok: true,
  });
});

describe("mdLinks with validate:false", () => {
  it("should resolve with an array of links", async () => {
    await expect(
      mdLinks("./folder1/resumen.md", {
        validate: false,
      })
    ).resolves.toEqual([
      {
        href: "https://nodejs.org/es/",
        text: "Node.js",
        file: "/Users/nalu/development/Laboratoria/DEV003-md-links/folder1/resumen.md",
      },
      {
        href: "https://developers.google.com/v8/",
        text: "motor de JavaScript V8 de Chrome",
        file: "/Users/nalu/development/Laboratoria/DEV003-md-links/folder1/resumen.md",
      },
      {
        href: "https://nodejs.org/es/",
        text: "Link repetido con text largo para ver si corta el texto a los 50 caracteres",
        file: "/Users/nalu/development/Laboratoria/DEV003-md-links/folder1/resumen.md",
      },
      {
        href: "https://nodejs.org/s/",
        text: "Link roto",
        file: "/Users/nalu/development/Laboratoria/DEV003-md-links/folder1/resumen.md",
      },
    ]);
  });
});
