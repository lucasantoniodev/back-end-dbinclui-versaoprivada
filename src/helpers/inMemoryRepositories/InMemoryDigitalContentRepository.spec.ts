import { InMemoryDigitalContentRepository } from "./InMemoryDigitalContentRepository";

describe("description", () => {
  let repository: InMemoryDigitalContentRepository;

  beforeAll(() => {
    repository = new InMemoryDigitalContentRepository();
  });

  beforeEach(async () => {
    await repository.clear();
    await repository.loadData(3);
  });

  it("Should create and return a DigitalContent", async () => {
    const contentExample = {
      title: `Título do conteúdo digital ${repository.database.length}`,
      shortDescription: `Descrição do conteúdo digital`,
      guide: {
        _id: String(repository.database.length),
        title: `Título do guia ${repository.database.length}`,
        content: `Conteúdo do guia ${repository.database.length}`,
      },
      category: {
        _id: String(repository.database.length),
        title: `Título da categoria ${repository.database.length}`,
        shortDescription: `Descrição da categoria ${repository.database.length}`,
        guide: {
          _id: String(repository.database.length),
          title: `Título do guia ${repository.database.length}`,
          content: `Conteúdo do guia ${repository.database.length}`,
        },
      },
      filePaths: [
        {
          filename: `arquivo${repository.database.length}`,
          path: `link.com/arquivo${repository.database.length}`,
        },
      ],
    };

    const result = await repository.create(contentExample);

    expect(result).not.toBeNull();
    expect(result._id).toBe("3");
    expect(result.title).toBe(`Título do conteúdo digital ${3}`);
  });

  describe("update", () => {
    it("Should return 0 if DigitalContent ID not found", async () => {
      const contentExample = {
        id: "1290-1",
        title: `Título do conteúdo digital ${repository.database.length}`,
        shortDescription: `Descrição do conteúdo digital`,
        guide: {
          _id: String(repository.database.length),
          title: `Título do guia ${repository.database.length}`,
          content: `Conteúdo do guia ${repository.database.length}`,
        },
        category: {
          _id: String(repository.database.length),
          title: `Título da categoria ${repository.database.length}`,
          shortDescription: `Descrição da categoria ${repository.database.length}`,
          guide: {
            _id: String(repository.database.length),
            title: `Título do guia ${repository.database.length}`,
            content: `Conteúdo do guia ${repository.database.length}`,
          },
        },
        filePaths: [
          {
            filename: `arquivo${repository.database.length}`,
            path: `link.com/arquivo${repository.database.length}`,
          },
        ],
      };

      const result = await repository.update(contentExample);

      expect(result).toEqual(0);
    });

    it("Should update and return 1 like an updateCount", async () => {
      const contentExample = {
        _id: "0",
        title: `Título do conteúdo digital ${repository.database.length}`,
        shortDescription: `Descrição do conteúdo digital`,
        guide: {
          _id: String(repository.database.length),
          title: `Título do guia ${repository.database.length}`,
          content: `Conteúdo do guia ${repository.database.length}`,
        },
        category: {
          _id: String(repository.database.length),
          title: `Título da categoria ${repository.database.length}`,
          shortDescription: `Descrição da categoria ${repository.database.length}`,
          guide: {
            _id: String(repository.database.length),
            title: `Título do guia ${repository.database.length}`,
            content: `Conteúdo do guia ${repository.database.length}`,
          },
        },
        filePaths: [
          {
            filename: `arquivo${repository.database.length}`,
            path: `link.com/arquivo${repository.database.length}`,
          },
        ],
      };

      const result = await repository.update(contentExample);

      expect(result).toEqual(1);
    });
  });

  describe("Update Media by public_id", () => {
    it("Should return 0 if DigitalContent public_id not found", async () => {
      const result = await repository.updateMediaByPublicId(
        "indaskdjal",
        "Novo Path",
        "Novo Filename"
      );

      expect(result).toEqual(0);
    });

    it("Should update and return 1 like an updateCount", async () => {
      const result = await repository.updateMediaByPublicId(
        "arquivo0",
        "Novo path",
        "Novo FileName"
      );

      expect(result).toEqual(1);
      expect(repository.database[0].filePaths[0].filename).toBe(
        "Novo FileName"
      );
    });
  });

  describe("findMediaByPublicId", () => {
    it("Should return null if public_id not found", async () => {
      const result = await repository.findMediaByPublicId("sadasd");

      expect(result).toBeNull();
    });

    it("Should return a digital content by public_id", async () => {
      const result = await repository.findMediaByPublicId("arquivo1");

      expect(result).not.toBeNull();
      expect(result?._id).toBe("1")
    });
  });
  describe("findById", () => {
    it("Should be null if ID not found", async () => {
      const result = await repository.findById("123");

      expect(result).toBeNull();
    });

    it("Should return a DigitalContent by ID", async () => {
      const result = await repository.findById("0");
      expect(result).not.toBeNull();
      expect(result?._id).toBe("0");
      expect(result?.title).toBe("Título do conteúdo digital 0");
    });
  });

  describe("findAll", () => {
    it("Should return an array empty", async () => {
      await repository.clear();
      const result = await repository.findAll();
      expect(result.length).toEqual(0);
    });

    it("Should return all digital contents", async () => {
      const result = await repository.findAll();

      expect(result.length).not.toBeNull();
      expect(result.length).toEqual(3);
    });
  });

  describe("delete", () => {
    it("Should return a delete count like 0 if ID not found", async () => {
      const result = await repository.delete("092022");

      expect(result).toEqual(0);
    });

    it("Should return a delete count like 1 if ID exists", async () => {
      const result = await repository.delete("0");

      expect(result).toEqual(1);
    });
  });
});
