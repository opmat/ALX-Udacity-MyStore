import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyToastComponent } from './my-toast.component';

describe('MyToastComponent', () => {
  let component: MyToastComponent;
  let fixture: ComponentFixture<MyToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyToastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
