import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  id_cat: String = '';
  
  titulo = new FormControl("",[Validators.minLength(3)]);
  nome_autor = new FormControl("",[Validators.minLength(3)]);
  texto = new FormControl("",[Validators.minLength(10)]);

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
  }

  create(): void {
    
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

  getMessage() {
    if(this.titulo.invalid) {
      return "O campo TÍTULO deve conter entre 3 e 100 caracteres"
    }
    
    if(this.nome_autor.invalid) {
      return "O campo NOME DO AUTOR deve conter entre 3 e 100 caracteres"
    }
    
    if(this.texto.invalid) {
      return "O campo TEXTO deve conter entre 3 e 100 caracteres"
    }
    
    return false;
  }

}
