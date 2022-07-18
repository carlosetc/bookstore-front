import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Livro } from './livro.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  base_url: String = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private _snack: MatSnackBar
  ) { }

  findById(id: String): Observable<Livro> {
    const url = `${this.base_url}/livros/${id}`;
    return this.http.get<Livro>(url);
  }

  update(livro: Livro): Observable<Livro> {
    const url = `${this.base_url}/livros/${livro.id}`;
    return this.http.put<Livro>(url, livro);
  }

  findByCategoria(id_cat: String): Observable<Livro[]> {
    const url = `${this.base_url}/livros?id_categoria=${id_cat}`;
    return this.http.get<Livro[]>(url);
  }

  create(livro: Livro, id_cat: String): Observable<Livro> {
    const url = `${this.base_url}/livros?id_categoria=${id_cat}`;
    return this.http.post<Livro>(url, livro);
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000
    });
  }

}
