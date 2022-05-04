import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ITypeProbleme } from './probleme';
import { IproblemeDesc } from './problemeDesc';

@Injectable({
  providedIn: 'root'
})
export class ProblemeService {
  //private baseUrl = 'https://localhost:7190/Intervention';
  private baseUrl = 'https://intervention2022.azurewebsites.net/Intervention';

  id: number;
  constructor(private _http: HttpClient) { }
  
  saveProbleme(probleme: IproblemeDesc): Observable<IproblemeDesc> {
    return this.createProbleme(probleme);
  }

  obtenirProbleme(): Observable<ITypeProbleme[]> {
    return this._http.get<ITypeProbleme[]>(this.baseUrl).pipe(
        tap(data => console.log('obtenirCategories: ' + JSON.stringify(data))),
        catchError(this.handleError)
        );
  }
  private createProbleme(probleme: IproblemeDesc): Observable<IproblemeDesc> {
    return this._http.post<IproblemeDesc>(this.baseUrl, probleme, this.httpOptions).pipe(
      tap((probleme: IproblemeDesc) => console.log('added problem w/ id=${probleme.id}')),
      catchError(this.handleError)
    );
  }
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}