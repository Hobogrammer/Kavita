import {LoginRoutes, VolumeRoutes, setLoginRoutes, setVolumeRoutes} from 'utils/playwright-utils';
import {test, expect, Locator} from '@playwright/test';
import {LoginPage} from "pages/LoginPage";
import {VolumePage} from "pages/VolumePage";
import {FileTypeGroup} from "src/app/_models/library/file-type-group.enum";
import {Library, LibraryType} from "src/app/_models/library/library";
import {HourEstimateRange} from "src/app/_models/series-detail/hour-estimate-range";
import {User} from "src/app/_models/user";
import {UserFactory } from "utils/factories/user-factory";
import {SeriesDetailPlus} from "src/app/_models/series-detail/series-detail-plus";
import {RelatedSeries} from "src/app/_models/series-detail/related-series";
import {ScrobbleProvider} from "src/app/_services/scrobbling.service";
import {Rating, RatingAuthority} from "src/app/_models/rating";
import {Series} from "src/app/_models/series";
import {SeriesMetadata} from "src/app/_models/metadata/series-metadata";
import {SeriesDetail} from "src/app/_models/series-detail/series-detail";
import {SeriesFactory} from "utils/factories/series-factory";
import { MangaFormat } from "src/app/_models/manga-format";
import { LibraryFactory } from "utils/factories/library-factory";
import { SideNavStream } from "src/app/_models/sidenav/sidenav-stream";
import { SideNavStreamType } from "src/app/_models/sidenav/sidenav-stream-type.enum";
import { faker } from "@faker-js/faker";

test.describe('Volume detail page', ()=> {
  let user: User;
  let library: Library;
  let series: Series;
  let volume: Volume;
  let loginRoutes: LoginRoutes;
  let volumeRoutes: VolumeRoutes;

 test.beforeEach(async ({page}) => {
    user = UserFactory.createUser();
    library = LibraryFactory.create("epub", LibraryType.Book, [FileTypeGroup.Epub], ["/epubs"]);
    series = SeriesFactory.create(library, MangaFormat.EPUB);
    series.volumes = SeriesFactory.createVolumesForSeries(series);

    loginRoutes = {
      adminExists: true,
      user: user
    };

   const rating = {
     averageScore: 0,
     meanScore: 0,
     favoriteCount: 0,
     provider: ScrobbleProvider.Kavita,
     providerUrl: undefined,
     authority: RatingAuthority.User
   } as Rating;

   const chapterDetailPlus = {
     rating: 0,
     hasBeenRated: false,
     reviews: [],
     ratings: []
   } as ChapterDetailPlus;

   const sideNav = {
     id: 2,
     name: library.name,
     isProvided: false,
     order: 1,
     smartFilterEncoded: undefined,
     smartFilterId: 0,
     streamType: SideNavStreamType.Library,
     externalSourceId: 0,
     externalSource: undefined,
     visible: true,
     libraryId: library.id,
     library: library
   } as SideNavStream;

   volume = series.volumes[Math.floor(Math.random() * series.volumes.length)];

   volumeRoutes = {
     pluginVersion: '0.8.8',
     device: [],
     validLicense: false,
     libraries: [library],
     libraryType: library.type,
     hasLibraryAccess: true,
     sideNav: [sideNav],
     volume: volume,
     chapterDetailPlus: chapterDetailPlus,
     listsForChapter: [],
     rating: rating,
     series: series,
     volumeImageFilePath: "src/assets/images/image-placeholder.dark.png",
     publisherImageFilePath: "src/assets/images/error-person-missing.dark.png",
     libraryImageFilePath: "src/assets/images/ExternalServices/GoogleBooks.png",
     user: user
   };
 });

 test('should display volume detail metadata', async ({page}) => {
   setLoginRoutes(page, loginRoutes);
   setVolumeRoutes(page, volumeRoutes);

   const loginPage = new LoginPage(page);
   await loginPage.login(user.username, faker.internet.password());
   await page.goto('/library/' + library.id + '/series/' + series.id + '/volume/' + volume.id);
   const volumePage = new VolumePage(page);

   const expectedSubTitle = "Volume " + volume.name + " - " + volume.chapters[0].titleName;
 });

 test.only('Detail tab should show expected data', async ({page}) => {
   setLoginRoutes(page, loginRoutes);
   setVolumeRoutes(page, volumeRoutes);

   const loginPage = new LoginPage(page);
   await loginPage.login(user.username, faker.internet.password());
   await page.goto('/library/' + library.id + '/series/' + series.id + '/volume/' + volume.id);
   const volumePage = new VolumePage(page);
   await volumePage.goToDetailsTab();
   const detailsWriters: Array<Locator> = await volumePage.getDetailsTabWriters();
   await expect(detailsWriters.length).toEqual(volume.chapters[0].writers.length);
   const writersNames: Array<string> = series.writers.map((writer) => writer.name);
   detailsWriters.forEach(detailsWriter => {
     detailsWriter.textContent().then(name => {
       expect(writersNames.includes(name)).toBe(true);
     })
   });
 });

 test('Book tab should show expected volume', async ({page}) => {
   setLoginRoutes(page, loginRoutes);
   setVolumeRoutes(page, volumeRoutes);

   const loginPage = new LoginPage(page);
   await loginPage.login(user.username, faker.internet.password());
   await page.goto('/library/' + library.id + '/series/' + series.id + '/volume/' + volume.id);
   const volumePage = new VolumePage(page);
 });
});
