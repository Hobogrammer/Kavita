/// <reference lib="webworker" />

import {TestBed} from '@angular/core/testing';
import {MockService} from "ng-mocks";

describe('OpfsWorker', () => {
  let worker: Worker;

  beforeEach(() => {
    worker = new Worker('/src/app/cache.worker.ts');
  });

  it('should be created', () => {
    expect(worker).toBeInstanceOf(Worker);
  });

  it('should save files', () => {
  });

  it('should delete files', () => {

  });

  it('should delete empty folders', () => {

  });

  it('should delete folders', () => {

  });

  it('should retrieve files', () => {

  });
});
