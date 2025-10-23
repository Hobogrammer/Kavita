import { FileTypeGroup } from "../../src/app/_models/library/file-type-group.enum";
import { Library, LibraryType } from "../../src/app/_models/library/library";
import { LibraryFactory } from "./library-factory";
import { Series } from "../../src/app/_models/series";
import { SeriesFactory } from "./series-factory";
import { MangaFormat } from "../../src/app/_models/manga-format";

describe('SeriesFactory', () => {
  it('createSeries() should create a series with no volumes', () => {
    const folders: Array<string> = ["/books"];
    const fileTypes: Array<FileTypeGroup> = [FileTypeGroup.Epub];
    const library: Library = LibraryFactory.create("test", LibraryType.Book, fileTypes, folders);

    const series: Series = SeriesFactory.create(library, MangaFormat.EPUB);

    expect(series).toBeDefined();
    expect(series.volumes.length).toEqual(0);
  });
});
