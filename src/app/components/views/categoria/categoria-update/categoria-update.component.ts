import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent implements OnInit {

  categoria: Categoria = {
    id: '',
    nome: '',
    descricao: ''
  }

  constructor(
    private router: Router,
    private service: CategoriaService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.categoria.id!).subscribe({
      next: (resposta) => {
        this.categoria = resposta;
      },
      error: (e) => {
        this.router.navigate(['/categorias']);
        this.service.mensagem('Categoria não encontrada');
      }
    });
  }

  update(): void {
    this.service.update(this.categoria).subscribe({
      next: (resposta) => {
        this.router.navigate(['/categorias']);
        this.service.mensagem('Categoria atualizada com sucesso');
      },
      error: (err) => {
        this.service.mensagem(err.error.error);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/categorias']);
  }

}
