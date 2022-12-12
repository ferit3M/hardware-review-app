import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalRegistrationComponent } from './modal-registration.component';

describe('ModalRegistrationComponent', () => {
  let component: ModalRegistrationComponent;
  let fixture: ComponentFixture<ModalRegistrationComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
