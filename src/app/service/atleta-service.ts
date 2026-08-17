import { Injectable } from '@angular/core';
import { Atleta } from '../models/atleta';

@Injectable({
  providedIn: 'root'
})
export class AtletaService {

  private atletas: Atleta[] = [];

  adicionarAtleta(atleta: Atleta): void {
    this.atletas.push(atleta);
  }

  listarAtletas(): Atleta[] {
    return this.atletas;
  }
}