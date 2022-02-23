import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ProblemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("#1 | Zone PRÉNOM invalide avec 2 caractèress", () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("a".repeat(2));
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeTruthy();
    });
    it("#2 | Zone PRÉNOM invalide avec 3 caractères", () =>{
      let zone = component.problemeForm.controls['prenom'];
      zone.setValue("a".repeat(3));
      let errors = zone.errors || {};
      expect(errors['minlength']).toBeFalsy();
      });
      it("#3 | Zone PRÉNOM invalide avec 200 caractères", () =>{
        let zone = component.problemeForm.controls['prenom'];
        zone.setValue("a".repeat(200));
        let errors = zone.errors || {};
        expect(errors['minlength']).toBeFalsy();
        });
        it("#4 | Zone PRÉNOM invalide avec aucun caractères", () =>{
          let zone = component.problemeForm.controls['prenom'];
          zone.setValue("a".repeat(0));
          let errors = zone.errors || {};
          expect(errors['required']).toBeTruthy();
          });
          it("#5 | Zone PRÉNOM invalide avec 10 espaces", () =>{
            let zone = component.problemeForm.controls['prenom'];
            zone.setValue(" ".repeat(10));
            let errors = zone.errors || {};
            expect(errors['minlength']).toBeFalsy();
            });
            it("#6 | Zone PRÉNOM invalide avec 2 espaces et 1 caractères", () =>{
              let zone = component.problemeForm.controls['prenom'];
              zone.setValue(" ".repeat(3));
              let errors = zone.errors || {};
              expect(errors['minlength']).toBeFalsy();
              });
   
});
