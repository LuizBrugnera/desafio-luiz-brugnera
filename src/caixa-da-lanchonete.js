class CaixaDaLanchonete {
  _produtos = {
    cafe: 3.0,
    chantily: 1.5,
    suco: 6.2,
    sanduiche: 6.5,
    queijo: 2.0,
    salgado: 7.25,
    combo1: 9.5,
    combo2: 7.5,
  };

  _pagamento = {
    dinheiro: -0.05,
    credito: 0.03,
    debito: 0,
  };

  _chantily = 0;
  _queijo = 0;
  _sanduiche = 0;
  _cafe = 0;
  _erro = "";

  _validaProdutos(produto, quantidade) {
    if (quantidade <= 0) {
      this._erro = "Quantidade inválida!";
    } else if (!(produto in this._produtos)) {
      this._erro = "Item inválido!";
    } else if (produto === "chantily") {
      this._chantily++;
    } else if (produto === "queijo") {
      this._queijo++;
    } else if (
      produto === "combo1" ||
      produto === "combo2" ||
      produto === "sanduiche"
    ) {
      this._sanduiche++;
    }
    if (produto === "cafe" || produto === "combo2") {
      this._cafe++;
    }
  }

  _calculadorDeItens(itens) {
    return itens.reduce((total, item) => {
      if (this._erro) {
        return this._erro;
      }

      const [produto, quantidade] = item.split(",");
      this._validaProdutos(produto, quantidade);

      return total + this._produtos[produto] * quantidade;
    }, 0);
  }

  _validaExtras() {
    if (
      (this._chantily > 0 && this._cafe === 0) ||
      (this._queijo > 0 && this._sanduiche === 0)
    ) {
      this._erro = "Item extra não pode ser pedido sem o principal";
    }
  }

  _reset() {
    this._chantily = 0;
    this._queijo = 0;
    this._sanduiche = 0;
    this._cafe = 0;
    this._erro = "";
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    if (!(metodoDePagamento in this._pagamento)) {
      return "Forma de pagamento inválida!";
    }
    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    this._reset();

    const valorTotal = this._calculadorDeItens(itens);

    this._validaExtras();

    if (this._erro) {
      return this._erro;
    }

    const valorComDesconto =
      valorTotal + valorTotal * this._pagamento[metodoDePagamento];
    return `R$ ${valorComDesconto.toFixed(2).replace(".", ",")}`;
  }
}

export { CaixaDaLanchonete };
