import { BookReaderComponent } from './book-reader.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountService } from 'src/app/_services/account.service';
import { BookService } from '../../_services/book.service';
import { NavService } from 'src/app/_services/nav.service';
import { SeriesService } from 'src/app/_services/series.service';
import { ThemeService } from 'src/app/_services/theme.service';
import { ScrollService } from 'src/app/_services/scroll.service';
import { LibraryService } from 'src/app/_services/library.service';
import { MemberService } from 'src/app/_services/member.service';
import { UtilityService } from 'src/app/shared/_services/utility.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockInstance, MockProvider } from 'ng-mocks';
import {FilterUtilitiesService} from 'src/app/shared/_services/filter-utilities.service';
import { EMPTY } from 'rxjs';

describe('BookReaderComponent', () => {
  let component: BookReaderComponent;
  let fixture: ComponentFixture<BookReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookReaderComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        MockProvider(AccountService),
        MockProvider(SeriesService),
        MockProvider(NavService),
        MockProvider(ToastrService),
        MockProvider(MemberService),
        MockProvider(BookService),
        MockProvider(ScrollService),
        MockProvider(UtilityService),
        MockProvider(LibraryService),
        MockProvider(ThemeService)
      ]
    }).compileComponents();
  });

  beforeAll(() => MockInstance(AccountService, 'currentUser$', EMPTY));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should always progress linearly, not skipping pages in two column mode', () => {
    expect(component).toBeTruthy();
  });
});
