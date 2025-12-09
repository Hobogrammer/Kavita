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

   volume = series.volumes[Math.floor(Math.random() * series.volumes.length)];

   volumeRoutes = {
     volume: volume,
     chapterDetailPlus: chapterDetailPlus,
     listsForChapter: [],
     rating: rating,
     volumeImageFilePath: "src/assets/images/image-placeholder.dark.png"
   };
 });

 test('should display volume detail metadata', async ({page}) => {
   setLoginRoutes(page, loginRoutes);
   setVolumeRoutes(page, volumeRoutes);

   const loginPage = new LoginPage(page);
   await loginPage.login(user.username, faker.internet.password());
   await page.goto('/library/' + library.id + '/series/' + series.id + '/volume/' + volume.id);
   const volumePage = new VolumePage(page);
 });

 test.only('Detail tab should show expected data', async ({page}) => {
   setLoginRoutes(page, loginRoutes);
   setVolumeRoutes(page, volumeRoutes);

   const loginPage = new LoginPage(page);
   await loginPage.login(user.username, faker.internet.password());
   const volume = series.volumes[Math.floor(Math.random() * series.volumes.length)];
   await page.goto('/library/' + library.id + '/series/' + series.id + '/volume/' + volume.id);
   const volumePage = new VolumePage(page);
   await page.pause();
   await volumePage.goToDetailsTab();
   const detailsWriters: Array<Locator> = await volumePage.getDetailsTabWriters();
   await expect(detailsWriters.length).toEqual(volume.writers.length);
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
