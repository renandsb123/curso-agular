
import { TokenService } from './../autenticacao/token.service';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Animais, Animal } from './animais';
import { environment } from 'src/environments/environment';
import { catchError, mapTo } from 'rxjs/operators';

const API = environment.apiURL;
const NOT_MODIFIED = '304'

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(
    private http:HttpClient,
    private tokenService:TokenService
  ) { }

  listaDoUsuario(nomeDoUsuario:string):Observable<Animais>{
    const token = this.tokenService.retornaToken();
    const headers = new HttpHeaders().append('x-access-token', token)
    console.log(`${API}/${nomeDoUsuario}/photos`)
    return this.http.get<Animais>(`${API}/${nomeDoUsuario}/photos`, {headers, })
  }

  buscaPorId(id:number): Observable<Animal>{
    const token = this.tokenService.retornaToken();
    const headers = new HttpHeaders().append('x-access-token', token)
    return this.http.get<Animal>(`${API}/photos/${id}`, {headers, })
  }

  excluirAnimal(id:number): Observable<Animal>{
    return this.http.delete<Animal>(`${API}/photos/${id}`)
  }

  curtir(id:number): Observable<boolean>{
    return this.http.post(`${API}/photos/${id}/like`, {},{observe: 'response'} )
      .pipe(
        mapTo(true),
        catchError((error)=> {
          return error.status === NOT_MODIFIED ? of(false) : throwError(error);
        })
      )
  }
}
