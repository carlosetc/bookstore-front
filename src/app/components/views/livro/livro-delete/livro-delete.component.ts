import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {

  id_cat: String = '';
  
  livro: Livro = {
    id: '',
    titulo: '',
    nomeAutor: '',
    texto: ''
  }

  constructor(
    private route: ActivatedRoute,
    private service: LivroService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
    this.livro.id = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.livro.id!).subscribe(
      (resposta) => {
        this.livro = resposta;
      }
    );
  }

  delete(): void {
    this.service.delete(this.livro.id!).subscribe({
      next: (resposta) => {
        this.voltar();
        this.service.mensagem("Livro excluído com sucesso");
      },
      error: (e) => {
        this.voltar();
        this.service.mensagem("Problema ao excluir Livro");
      }
    });
  }

  cancel(): void {
    this.voltar();
  }

  voltar(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

}
