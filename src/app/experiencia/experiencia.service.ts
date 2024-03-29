import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experiencia, ExperienciaWithId } from './Experiencia.model';
import experiencia from 'src/assets/mockBD/experiencia.json'
import I18N from 'src/assets/I18n.json'
import { LanguageService } from '../Shared/services/language.service';

@Injectable({
  providedIn: 'root'
})

//implementacion con mockBD
export class ExperienciaService {

  private useMock = environment.mockDB;
  private apiUrl = environment.apiBaseUrl;
  esEspanolSub: Subscription = new Subscription;

  constructor( private http: HttpClient,  private languageService: LanguageService) { } 
  idiomaEspanol:boolean =true

  ngOnInit() {
    this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
      this.idiomaEspanol = isAuthenticated
    })
  }

  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
  }

  public getExperiencias():Observable<Experiencia[]>{
    if (this.useMock) {
      return of(experiencia.experiencia)
    } else {
      return this.http.get<Experiencia[]>( this.apiUrl + '/Experiencia/todos');
    }
  }

  public updateExperiencia(expLab: ExperienciaWithId):Observable<Experiencia>{
    if (this.useMock) {
      const index = experiencia.experiencia.findIndex(e => e.idExp === expLab.idExp);
      if (index >= 0) {
        const updatedElemento = { ...expLab };
        experiencia.experiencia[index] = updatedElemento;
        return of(updatedElemento);
      } else {
        return throwError(this.idiomaEspanol ? I18N.error.request.es : I18N.error.request.en);
      }
    } else {
      return this.http.put<Experiencia>(`${this.apiUrl}/Experiencia/editar`, expLab);
    }
  }

  public deleteExperiencia(id: number):Observable<void>{
    if (this.useMock) {
      const index = experiencia.experiencia.findIndex(e => e.idExp === id);
      if (index >= 0) {
        experiencia.experiencia.splice(index, 1);
        return of(undefined);
      } else {
        return throwError(this.idiomaEspanol ? I18N.error.request.es : I18N.error.request.en);
      }
    } else {
      return this.http.delete<void>(this.apiUrl + '/Experiencia/eliminar/' + id);
    }
  }

  public createExperiencia(expLab: Experiencia):Observable<any>{
    if (this.useMock) {
      const newId = experiencia.experiencia.length + 1;
      const newElemento = { idExp: newId, ...expLab };
      experiencia.experiencia.push(newElemento);
      return of(newElemento);
    } else {
      return this.http.post<Experiencia>(this.apiUrl + '/Experiencia/agregar', expLab);
    }
  }
}