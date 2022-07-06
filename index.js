import { wallet, mapCryptoSymbols } from "./wallet";

const symbols = {
  all: mapCryptoSymbols(wallet.symbols),
  blockchain: {
    eth: mapCryptoSymbols(wallet.getGroup("ethSymbols")),
    btc: mapCryptoSymbols(wallet.getGroup("btcSymbols")),
    eos: mapCryptoSymbols(wallet.getGroup("eosSymbols")),
    trx: mapCryptoSymbols(wallet.getGroup("trxSymbols")),
  },
  crypto: mapCryptoSymbols(wallet.getGroup("cryptoSymbols")),
  fiat: mapCryptoSymbols(wallet.getGroup("fiatSymbols")),
  credit: mapCryptoSymbols(wallet.getGroup("creditSymbols")),
};
console.log(symbols);

class TokenSymbolEntity {
  constructor(symbol) {
    if (wallet.symbols[symbol]) this._symbol = wallet.symbols[symbol];
    else throw new Error("TokenSymbol. Invalid symbol: " + symbol);
    return this;
  }

  get symbol() {
    return this._symbol;
  }

  get decimals() {
    return this._symbol.decimals;
  }

  get unit() {
    return this._symbol.unit;
  }

  get name() {
    return this._symbol.name;
  }

  get type() {
    return this._symbol.type;
  }

  get network() {
    return this._symbol.network;
  }

  get tokenType() {
    return this._symbol.tokenType;
  }

  get displaySymbol() {
    return this._symbol.decimals;
  }
}

const tokenSymbolEntity = new TokenSymbolEntity("BTC");
console.log(tokenSymbolEntity.decimals);
