import TestBed from '@angular/core/testing'; 

import { BookReaderComponent } from '../../../src/app/_components/book-reader/';

describe('BookReaderComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ BookReaderComponent ],
    });

    fixture = TestBed.createComponent(BookReaderComponent);
    testReaderComponent = fixture.componentInstance;
  });


  it('should always progress linearly, not skipping pages in two column mode', () => {

  });
});
