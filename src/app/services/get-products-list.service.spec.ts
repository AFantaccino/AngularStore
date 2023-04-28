import { TestBed } from '@angular/core/testing';

import { GetProductsListService } from './get-products-list.service';

describe('GetProductsListService', () => {
  let service: GetProductsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetProductsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
