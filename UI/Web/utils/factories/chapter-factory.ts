import { Chapter } from "src/app/_models/chapter";

export class ChapterFactory {
  constructor() {}

  createEpubChapter(): Chapter {
    return new ChapterBuilder()
      .build();
  }
}
