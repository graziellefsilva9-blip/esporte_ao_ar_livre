import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-corrida-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './corrida-component.html',
  styleUrl: './corrida-component.css',
})
export class CorridaComponent {
  descricao: string = '';
  data: string = '';

  distancia5km: boolean = false;
  distancia10km: boolean = false;
  distancia25km: boolean = false;

  cadastrar() {
    console.log('Descrição:', this.descricao);
    console.log('Data:', this.data);
    console.log('5km:', this.distancia5km);
    console.log('10km:', this.distancia10km);
    console.log('25km:', this.distancia25km);
  }
}
