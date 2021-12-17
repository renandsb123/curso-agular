import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AnimaisService } from './../animais.service';
import { Animal, Animais } from './../animais';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalhe-animal',
  templateUrl: './detalhe-animal.component.html',
  styleUrls: ['./detalhe-animal.component.css']
})
export class DetalheAnimalComponent implements OnInit {


  animalId!:number;
  animal$!:Observable<Animal>
  constructor(
    private animaisService: AnimaisService,
    private activatedRoute:ActivatedRoute,
    private router: Router
  ) { }
//tem q ser o mesmo nome q esta na rota
  ngOnInit(): void {
    this.animalId = this.activatedRoute.snapshot.params.animalId
    this.animal$ = this.animaisService.buscaPorId(this.animalId)
  }

  curtir(){
    this.animaisService.curtir(this.animalId).subscribe(
      (curtida) => {
        if(curtida){
          console.log('curtir')
          this.animal$ = this.animaisService.buscaPorId(this.animalId)
        }
      }
    )
  }

  excluir(){
    this.animaisService.excluirAnimal(this.animalId).subscribe(
      () => {
        this.router.navigate(['/animais/'])
      },(error)=> console.log(error)
    )
  }
}
