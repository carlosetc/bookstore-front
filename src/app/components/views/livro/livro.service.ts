import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Livro } from './livro.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  base_url: String = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  findByCategoria(id_cat: String): Observable<Livro[]> {
    const url = `${this.base_url}/livros?id_categoria=${id_cat}`;
    return this.http.get<Livro[]>(url);
  }

}
