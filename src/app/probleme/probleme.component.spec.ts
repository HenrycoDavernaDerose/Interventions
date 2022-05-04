import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';
import { ProblemeService } from './probleme.service';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ProblemeComponent],
      providers: [ProblemeService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("#1 | Zone PRÉNOM invalide avec 2 caractèress", () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("a".repeat(2));
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeFalsy();
  });
  it("#2 | Zone PRÉNOM invalide avec 3 caractères", () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("a".repeat(3));
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeFalsy();
  });
  it("#3 | Zone PRÉNOM invalide avec 200 caractères", () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("a".repeat(200));
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeFalsy();
  });
  it("#4 | Zone PRÉNOM invalide avec aucun caractères", () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("a".repeat(0));
    let errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  it("#5 | Zone PRÉNOM invalide avec 10 espaces", () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(" ".repeat(10));
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeFalsy();
  });
  it("#6 | Zone PRÉNOM invalide avec 2 espaces et 1 caractères", () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(" ".repeat(3));
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeFalsy();
  });
  it('#15 Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.setNotifications('numeroTelephone');

    let errors = {};
    let zone = component.problemeForm.get('telephone');
    expect(zone.disabled).toBeTruthy()
  });

  it('#16 Zone TELEPHONE est vide quand ne pas me notifier', () => {
    component.setNotifications('numeroTelephone');

    let errors = {};
    let zone = component.problemeForm.get('telephone');
    expect(zone.disabled).toBeTruthy()
  });

  it('#17 Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    component.setNotifications('courrielGroup.courriel');
    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.disabled).toBeTruthy()
  });

  it('#18 Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
    component.setNotifications('courrielConfirmation');
    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.disabled).toBeTruthy()
  });
  it('#19 Zone TELEPHONE est désactivée quand notifier par courriel', () => {
    component.setNotifications('courrielGroup.courriel');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED'); 
  });
  it('#20 Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
    component.setNotifications('courrielGroup.courriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED'); 
  });
  it('#21 Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
    component.setNotifications('courrielGroup.courriel');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toBeTruthy()
  });
  it('#22 Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.setNotifications('notification');
    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue(" ");
    
    expect(errors['required']).toBeUndefined();
  });
  it('#23 Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.setNotifications('notification');
    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue(" ");
    errors = zone.errors||{};
    expect(errors['required']).toBeFalsy(); 
  });
  it('#24 Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    component.setNotifications('pasnotification');
    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue(" ");
    errors = zone.errors||{};
    expect(errors['required']).toBeFalsy(); 
  });
  it('#25 Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
    component.setNotifications('notification');
    let errors = {};
    let zoneAdrresseCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneAdrresseCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneAdrresseCourriel.setValue('')
    zoneAdrresseCourrielConfirmation.setValue('')
    expect(errors['null']).toBeFalsy(); 
  });
  it('#26 Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
    component.setNotifications('notification');
    let errors = {};
    let zoneAdrresseCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneAdrresseCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneAdrresseCourriel.setValue('dsdasd@.com')
    zoneAdrresseCourrielConfirmation.setValue('')
    expect(errors['null']).toBeFalsy(); 
  });
  it('#27 Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
    component.setNotifications('courriel');
    let errors = {};
    let zoneAdrresseCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneAdrresseCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneAdrresseCourriel.setValue('dsdasd@.com')
    zoneAdrresseCourrielConfirmation.setValue('adasdgfwf@.com')
    let groupe = component.problemeForm.get('courrielGroup')
     errors = groupe.errors|| {};
    expect(errors['courriels invalide']).toBeUndefined(); 
  });
  it('#28 Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
    component.setNotifications('courriel');
    let errors = {};
    let zoneAdrresseCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneAdrresseCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneAdrresseCourriel.setValue('dsdasd@.com')
    zoneAdrresseCourrielConfirmation.setValue('dsdasd@.com')
    let groupe = component.problemeForm.get('courrielGroup')
     errors = groupe.errors|| {};
    expect(errors['courriels valide']).toBeFalsy(); 
  });
  it('#29 |Zone TELEPHONE est activée quand notifier par messageTexte', () => {
    component.setNotifications('messageTexte');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).not.toEqual('DISABLED');
    });
  it('#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.setNotifications('messageTexte');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });
  it('#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.setNotifications('messageTexte');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  });
  it('#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
    component.setNotifications('messageTexte');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('INVALID');
  });
  it('#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte', () => {
    component.setNotifications('messageTexte');
    let errors = {};
    let zoneTelephone = component.problemeForm.get('courrielGroup.courriel');
    let zoneAdrresseCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneAdrresseCourrielConfirmation.setValue('dsdasd@.com')
    let groupe = component.problemeForm.get('courrielGroup')
     errors = groupe.errors|| {};
    expect(errors['courriels valide']).toBeFalsy(); 
  });
  it('#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.setNotifications('notification');
    let errors = {};
    let zoneAdrresseCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneAdrresseCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneAdrresseCourriel.setValue('dsdasd@.com')
    zoneAdrresseCourrielConfirmation.setValue('dsdasd@.com')
    let groupe = component.problemeForm.get('courrielGroup')
     errors = groupe.errors|| {};
    expect(errors['courriels valide']).toBeFalsy(); 
  });
  it('#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.setNotifications('notification');
    let errors = {};
    let zoneAdrresseCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneAdrresseCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneAdrresseCourriel.setValue('dsdasd@.com')
    zoneAdrresseCourrielConfirmation.setValue('dsdasd@.com')
    let groupe = component.problemeForm.get('courrielGroup')
     errors = groupe.errors|| {};
    expect(errors['courriels valide']).toBeFalsy(); 
  });
  it('#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.setNotifications('notification');
    let errors = {};
    let zoneAdrresseCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneAdrresseCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneAdrresseCourriel.setValue('dsdasd@.com')
    zoneAdrresseCourrielConfirmation.setValue('dsdasd@.com')
    let groupe = component.problemeForm.get('courrielGroup')
     errors = groupe.errors|| {};
    expect(errors['courriels valide']).toBeFalsy(); 
  });
});
