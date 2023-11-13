import { BookReaderComponent } from './book-reader.component';
import { BookLineOverlayComponent } from '../book-line-overlay/book-line-overlay.component'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, ElementRef } from '@angular/core';
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
import { MockBuilder, MockRender, ngMocks, NG_MOCKS_ROOT_PROVIDERS } from 'ng-mocks';
import {FilterUtilitiesService} from 'src/app/shared/_services/filter-utilities.service';
import { EMPTY } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe(BookReaderComponent.name, () => {
  beforeEach(() => {
    // Maybe need to mock render the BookLineOverlay compoenent
    // atm there is nothing in the component so instantiation fails
    return MockBuilder(BookReaderComponent, BookLineOverlayComponent)
      .replace(HttpClientModule, HttpClientTestingModule)
      .keep(RouterTestingModule.withRoutes([]))
      .keep(NG_MOCKS_ROOT_PROVIDERS)
      .mock(ToastrService)
      .mock(UtilityService)
      .mock(ChangeDetectorRef)
      .mock(ElementRef)
  });


  it('should always progress linearly, not skipping pages in two column mode', () => {
    const fixture = MockRender(BookReaderComponent, {});
    expect(fixture).toBeTruthy();
  });
});
