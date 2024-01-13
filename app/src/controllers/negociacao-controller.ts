import { domInjector } from "../decorators/dom-injector.js";
import { inspect } from "../decorators/inspect.js";
import { logarTempo } from "../decorators/logar-tempo.js";
import { DiasdaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from '../models/negociacoes.js';
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from '../views/negociacoes-view.js';

export class NegociacaoController {

  @domInjector('#data')
  private inputData: HTMLInputElement;
  @domInjector('#quantidade')
  private inputQuantidade: HTMLInputElement;
  @domInjector('#valor')
  private inputValor: HTMLInputElement;

  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView('#negociacoesView');
  private mensagemView = new MensagemView('#mensagemView');
  private readonly DOMINGO = 0;
  private readonly SABADO = 6;

  constructor() {
    this.negociacoesView.update(this.negociacoes);
  }

  @inspect
  @logarTempo()
  public adiciona(): void {
    const negociacao = Negociacao.criaDe(
      this.inputData.value,
      this.inputQuantidade.value,
      this.inputValor.value
    );
    if (!this.ehDiaUtil(negociacao.data)){
      this.mensagemView.update('Apenas negociações em dias úteis são aceitas');
      return;
    }
    this.negociacoes.adiciona(negociacao);
    this.limpaFormulario();
    this.atualizaView();
  }

  private ehDiaUtil(data: Date) {
    return data.getDay() > 
    DiasdaSemana.DOMINGO
    && data.getDay() < 
    DiasdaSemana.SABADO;
  }

  private limpaFormulario(): void {
    this.inputData.value = '';
    this.inputQuantidade.value = '';
    this.inputValor.value = '';
    this.inputData.focus();
  }

  private atualizaView(): void {
    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update('Negociação adicionada com sucesso')
  }
}
