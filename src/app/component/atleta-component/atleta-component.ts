import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AtletaService } from '../../service/atleta-service';
import { Atleta } from '../../models/atleta';

@Component({
  selector: 'app-atleta-component',
  imports: [FormsModule],
  templateUrl: './atleta-component.html',
  styleUrl: './atleta-component.css',
})
export class AtletaComponent {

  // DECLARANDO ATRIBUTOS
  id = '';
  nome = '';
  cpf = 0;
  sexo = '';
  cep = 0;
  ruaLogradouro = '';
  bairro = '';
  cidade = '';
  uf = '';

  // CONSTRUTOR
  constructor(
    private atletaService: AtletaService,
    private rota: ActivatedRoute,
    private router: Router
  ) {}

  // QUANDO A PÁGINA É ABERTA
  ngOnInit() {
    this.id = this.rota.snapshot.params['id'];

    // Se existir ID, carrega os dados para edição
    if (this.id) {
      this.carregarAtleta();
    }
  }

  // CARREGA OS DADOS DO ATLETA PARA EDIÇÃO
  carregarAtleta() {
    this.atletaService.listarAtleta(this.id)
      .subscribe({
        next: (atleta: Atleta) => {
          this.id = atleta.id;
          this.nome = atleta.nome;
          this.cpf = atleta.cpf;
          this.sexo = atleta.sexo;
          this.cep = atleta.cep;
          this.ruaLogradouro = atleta.ruaLogradouro;
          this.bairro = atleta.bairro;
          this.cidade = atleta.cidade;
          this.uf = atleta.uf;
        },
        error: (msgErro: any) => {
          console.log('Erro ao carregar atleta:', msgErro);
        }
      });
  }

  // EXIBE OS DADOS NO CONSOLE
  exibirDados() {
    console.log(
      this.nome,
      this.cpf,
      this.sexo,
      this.cep,
      this.ruaLogradouro,
      this.bairro,
      this.cidade,
      this.uf
    );

    this.limparDados();
  }

  // LIMPA O FORMULÁRIO
  limparDados() {
    this.id = '';
    this.nome = '';
    this.cpf = 0;
    this.sexo = '';
    this.cep = 0;
    this.ruaLogradouro = '';
    this.bairro = '';
    this.cidade = '';
    this.uf = '';
  }

  // CADASTRA OU ALTERA O ATLETA
  enviarDadosAtleta() {
    const atleta = new Atleta();

    atleta.id = this.id;
    atleta.nome = this.nome;
    atleta.cpf = this.cpf;
    atleta.sexo = this.sexo;
    atleta.cep = this.cep;
    atleta.ruaLogradouro = this.ruaLogradouro;
    atleta.bairro = this.bairro;
    atleta.cidade = this.cidade;
    atleta.uf = this.uf;

    // SE TEM ID = ALTERAR
    if (this.id) {
      this.atletaService.alterarAtleta(atleta)
        .subscribe({
          next: (resposta: Atleta) => {
            console.log('Atleta alterado:', resposta);

            this.limparDados();
            this.router.navigate(['/listarAtletas']);
          },
          error: (msgErro: any) => {
            console.log('Erro ao alterar:', msgErro);
          }
        });

    } else {
      // SE NÃO TEM ID = CADASTRAR
      this.atletaService.salvarAtleta(atleta)
        .subscribe({
          next: (resposta: Atleta) => {
            console.log('Atleta cadastrado:', resposta);

            this.limparDados();
            this.router.navigate(['/listarAtletas']);
          },
          error: (msgErro: any) => {
            console.log('Erro ao cadastrar:', msgErro);
          }
        });
    }
  }
}