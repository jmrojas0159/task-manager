import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListApiComponent } from './list-api.component';

describe('ListApiComponent', () => {
  let component: ListApiComponent;
  let fixture: ComponentFixture<ListApiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListApiComponent]
    });
    fixture = TestBed.createComponent(ListApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
