import { TestBed } from '@angular/core/testing';

import { RequisicaoService } from './requisicao.service';

describe('RequisicaoService', () => {
  let service: RequisicaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequisicaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
