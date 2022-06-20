import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe(AppComponent.name, () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('NgOnInit deve criar o formulário', () => {
    fixture.detectChanges();
    expect(component.form).toBeTruthy();
  });

  it('Metodo show deve criar uma instancia de Referência do modal', () => {
    fixture.detectChanges();
    component.show();
    expect(component.modalRef).toBeTruthy();
  });

  it('Metodo submit não deve fechar o modal quando estiver inválido', () => {
    fixture.detectChanges();
    component.form.patchValue({
      firstName: 'Mateus',
      surname: '',
      age: 23,
      info: true
    });
    component.show();
    fixture.detectChanges();
    spyOn(component.modalRef, 'close');
    const modalExistInTheDocument: HTMLElement = document.querySelector('.form-field');
    component.submit();
    expect(modalExistInTheDocument).toBeTruthy();
    expect(component.modalRef.close).not.toHaveBeenCalled();
  });

  it('Metodo submit deve fechar o modal quando estiver válido', () => {
    fixture.detectChanges();
    component.form.patchValue({
      firstName: 'Mateus',
      surname: 'Amaral',
      age: 23,
      info: true
    });
    component.show();
    fixture.detectChanges();
    spyOn(component.modalRef, 'close');
    const modalExistInTheDocument: HTMLElement = document.querySelector('.form-field');
    component.submit();
    expect(modalExistInTheDocument).toBeTruthy();
    expect(component.modalRef.close).toHaveBeenCalled();
  });
});
