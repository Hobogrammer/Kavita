import { BookReaderComponent } from './book-reader.component';
import { TestBed } from '@angular/core/testing';


describe('BookReaderComponent', () => {

  beforeEach(async () => {
    TestBed.configureTestingModule({
        declarations: [ BookReaderComponent ],
    });

    let fixture = TestBed.createComponent(BookReaderComponent);
    let testReaderComponent = fixture.componentInstance;
  });


  it('should always progress linearly, not skipping pages in two column mode', () => {

  });
});
