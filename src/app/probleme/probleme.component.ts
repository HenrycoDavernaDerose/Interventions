import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum.component';
import { ITypeProbleme } from './probleme';
import { ProblemeService } from './probleme.service';
import { IproblemeDesc } from './problemeDesc';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  categoriesProbleme: ITypeProbleme[];
  errorMessage: string;
  probleme:IproblemeDesc
  constructor(private fb: FormBuilder,private problemes: ProblemeService,private route: Router) { }

  ngOnInit(): void {
    
    
    this.problemeForm=this.fb.group({
      prenom: ['' , [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]], 
    nom:[ ],noTypeProbleme: ['', Validators.required], 
    courrielGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}],
      }),
      telephone: [{value: '', disabled: true}],
      messageTexte: [{value: '', disabled: true}],

  });
      this.problemes.obtenirProbleme()
      .subscribe(cat => this.categoriesProbleme = cat,
              error => this.errorMessage = <any>error);  
              
    //numeroTelephone
  }
  setNotifications(typesNotification: string): void{
    const courriel = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmation = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const telephone = this.problemeForm.get('telephone');
    const messageTexte = this.problemeForm.get('telephone');
    courriel.clearValidators();
    courriel.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    courriel.disable();  

    courrielConfirmation.clearValidators();
    courrielConfirmation.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    courrielConfirmation.disable();  
    
    telephone.clearValidators();
    telephone.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    telephone.disable();  

    messageTexte.clearValidators();
    messageTexte.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    messageTexte.disable();  


     if (typesNotification=='courriel'){
     // courriel.setValidators([Validators.required]);   
      courriel.enable();
      courriel.updateValueAndValidity();
      courrielConfirmation.enable();

    }else{

    }
      if (typesNotification=='telephone'){
     // telephone.setValidators([Validators.required,Validators.pattern(' [0-9]+')]);   
      telephone.enable();
    }else{
      
    }
    if (typesNotification=='messageTexte'){
      //messageTexte.setValidators([Validators.required]);   
      messageTexte.enable();
    }else{
      
    }

    courrielConfirmation.updateValueAndValidity();

    telephone.updateValueAndValidity();

  }
   save(): void {
    if (this.problemeForm.dirty && this.problemeForm.valid) {
        // Copy the form values over the problem object values
        this.probleme = this.problemeForm.value;
        this.probleme.id = 0;
        // if(this.problemeForm.get('courrielGroup.courriel').value != '')
        //{
          //this.probleme.courriel = this.problemeForm.get('courrielGroup.courriel').value;
        //}
        this.problemes.saveProbleme(this.probleme)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
          })
    } else if (!this.problemeForm.dirty) {
        this.onSaveComplete();
    }
  }
 onSaveComplete(): void { 
    // Reset the form to clear the flags
    this.problemeForm.reset();  // Pour remettre Dirty à false.  Autrement le Route Guard va dire que le formulaire n'est pas sauvegardé
    this.route.navigate(['/accueil']);
  }

}
