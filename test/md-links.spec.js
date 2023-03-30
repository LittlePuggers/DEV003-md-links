import { mdFiles, mdLinks } from "../mdLinks.js";

describe("mdFiles", () => {
  it("should reject promise", async () => {
    await expect(mdFiles("./README2.md")).rejects.toBe(
      "ERROR! This path doesn't exist"
    );
  });
  it("should resolve with an array of markdown files", async () => {
    await expect(mdFiles("./README.md")).resolves.toEqual([
      "/Users/nalu/development/Laboratoria/DEV003-md-links/README.md",
    ]);
  });
});

global.fetch = jest.fn(() => {
  return Promise.resolve({
    status: 200,
    ok: true,
  });
});

describe("mdLinks with validate:false", () => {
  it("should resolve with an array of links", async () => {
    await expect(
      mdLinks("./README.md", {
        validate: false,
      })
    ).resolves.toEqual([
      {
        href: "https://nodejs.org/",
        text: "Node.js",
        file: "/Users/nalu/development/Laboratoria/DEV003-md-links/README.md",
      },
      {
        href: "https://www.linkedin.com/in/anaibarram/",
        text: "LinkedIn",
        file: "/Users/nalu/development/Laboratoria/DEV003-md-links/README.md",
      },
    ]);
  });
});

describe("mdLinks with validate:true", () => {
  it("should resolve with an array of links and their status", async () => {
    await expect(
      mdLinks("./README.md", {
        validate: true,
      })
    ).resolves.toEqual([
      {
        href: "https://nodejs.org/",
        text: "Node.js",
        file: "/Users/nalu/development/Laboratoria/DEV003-md-links/README.md",
        ok: undefined,
        status: 200,
      },
      {
        href: "https://www.linkedin.com/in/anaibarram/",
        text: "LinkedIn",
        file: "/Users/nalu/development/Laboratoria/DEV003-md-links/README.md",
        ok: undefined,
        status: 200,
      },
    ]);
  });
});
