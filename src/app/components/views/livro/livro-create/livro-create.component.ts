import { VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  id_cat: String = '';
  
  livro: Livro = {
    id: '',
    titulo: '',
    nomeAutor: '',
    texto: ''
  }

  titulo = new FormControl("",[Validators.minLength(3)]);
  nome_autor = new FormControl("",[Validators.minLength(3)]);
  texto = new FormControl("",[Validators.minLength(10)]);

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
  }

  create(): void {
    this.service.create(this.livro, this.id_cat).subscribe({
      next: (resposta) => {
        this.voltar();
        this.service.mensagem("Livro criado com sucesso");
      },
      error: (e) => {
        this.voltar();
        this.service.mensagem("Erro ao criar Livro. Tente mais tarde.");
      }
    });
  }

  cancel(): void {
    this.voltar();
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

  voltar(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

}
