import { Chapter } from "src/app/_models/chapter";

export abstract class ChapterFactory {

  createEpubChapter(): Chapter {
    return new ChapterBuilder()
      .build();
  }
}
