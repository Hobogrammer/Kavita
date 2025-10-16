import {FileTypeGroup} from "src/app/_models/library/file-type-group.enum";
import {Library, LibraryType} from "src/app/_models/library/library";

export class LibraryBuilder {
  private library: Partial<Library> = {
    lastScanned: Date.now().toString(), // TODO: String Format YYYY-MM-DDtHH:mm:ss.SSSSSS
    coverImage: null,
    folderWatching: false,
    includeInDashboard: true,
    includeInRecommended: true,
    includeInSearch: true,
    allowScrobbling: false,
    folders: [],
    collapseSeriesRelationships: false,
    libraryFileTypes: [],
    excludePatterns: [""],
    allowMetadataMatching: false,
    enableMetadata: true,
    removePrefixForSortName: true,
    manageReadingLists: false
  }

  setId(id: number): this {
    this.library.id = id;
    return this;
  }

  setName(name: string): this {
    this.library.name = name;
    return this;
  }

  setType(type: LibraryType): this {
    this.library.type = type;
    return this;
  }

  addFolders(folders: Array<string>): this {
    this.library.folders = [...folders];
    return this;
  }

  addExcludePatterns(excludePatterns: Array<string>): this {
    this.library.excludePatterns = [...excludePatterns];
    return this;
  }

  addLibraryFileTypes(libraryFileTypes: Array<FileTypeGroup>): this {
    this.library.libraryFileTypes = [...libraryFileTypes];
    return this;
  }

  setCoverImage(coverImagePath: string): this {
    this.library.coverImage = coverImagePath;
    return this;
  }

  setFolderWatching(folderWatching: boolean): this {
    this.library.folderWatching = folderWatching;
    return this;
  }

  setIncludeInDashboard(includeInDashboard: boolean): this {
    this.library.includeInDashboard = includeInDashboard;
    return this;
  }

  setincludeInRecommended(includeInRecommended: boolean): this {
    this.library.includeInRecommended = includeInRecommended;
    return this;
  }
  setManageCollections(manageCollections: boolean): this {
    this.library.manageCollections = manageCollections;
    return this;
  }
  setincludeInSearch(includeInSearch: boolean): this {
    this.library.includeInSearch = includeInSearch;
    return this;
  }

  setAllowScrobbling(allowScrobbling: boolean): this {
    this.library.allowScrobbling = allowScrobbling;
    return this;
  }
  setCollapseSeriesRelationships(collapseSeriesRelationships: boolean): this {
    this.library.collapseSeriesRelationships = collapseSeriesRelationships;
    return this;
  }

  setAllowMetadataMatching(allowMetadataMatching: boolean): this {
    this.library.allowMetadataMatching = allowMetadataMatching;
    return this;
  }

  setEnableMetadata(enableMetadata: boolean): this {
    this.library.enableMetadata = enableMetadata;
    return this;
  }
  setRemovePrefixForSortName(removePrefixForSortName: boolean): this {
    this.library.removePrefixForSortName = removePrefixForSortName;
    return this;
  }
  setManageReadingLists(manageReadingLists: boolean): this {
    this.library.manageReadingLists = manageReadingLists;
    return this;
  }

  build(): Library {
    // Verification here yea
    return {...this.library} as Library;
  }
}
