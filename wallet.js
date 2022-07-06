/**
 * @implements {ICryptoSymbol}
 */
class CryptoSymbol {
  /**
   * @param {InputSymbolData} symbol
   */
  constructor(symbol) {
    this.symbol = symbol.symbol;
    this.tokenType = symbol.tokenType;
    this.type = symbol.type;
    this.groups = symbol.groups;
    this.network = symbol.network;
    if (symbol.decimals < 0)
      throw new Error(`Token ${symbol.symbol} Decimals < 0`);
    this.decimals = symbol.decimals;
    // have default value like symbol
    this.name = symbol.name ?? symbol.symbol;
    this.unit = symbol.unit ?? symbol.symbol;
    this.display = symbol.display ?? symbol.symbol;
    this.external = symbol.external ?? symbol.symbol;
    console.log(this);
  }
}

/**
 * @extends {ISymbolBuilder}
 */
class SymbolBuilder {
  constructor() {
    this._symbols = {};
    this._groups = {};
    this.freezed = false;
  }

  /**
   * @param {InputSymbolData} input
   * @returns SymbolFabric
   */
  addSymbol(input) {
    if (this.freezed) throw new Error(`Already freezed`);
    if (this.symbols.hasOwnProperty(input.symbol)) return this;
    const symbol = new CryptoSymbol(input);
    this.symbols[input.symbol] = symbol;
    symbol.groups.forEach((group) => {
      this._groups[group] = this._groups[group] ?? {};
      this._groups[group][symbol.symbol] = symbol;
    });
    return this;
  }

  /**
   * @returns SymbolFabric
   */
  freeze() {
    Object.freeze(this._symbols);
    Object.freeze(this._groups);
    this.freezed = true;
    return this;
  }

  /**
   *
   * @param {CryptoSimbolsGroups} group
   * @returns {CryptoSymbol[]}
   */
  getGroup(group) {
    return this._groups[group] ?? [];
  }

  get symbols() {
    return this._symbols;
  }

  get groups() {
    return this._groups;
  }
}

const symbolsBuilder = new SymbolBuilder();
export const wallet = symbolsBuilder
  .addSymbol({
    decimals: 1,
    groups: ["btcSymbols", "cryptoSymbols"],
    symbol: "BTC",
    tokenType: "BTC",
    type: "CRYPTO",
    network: "BTC",
  })
  .addSymbol({
    decimals: 1,
    groups: ["ethSymbols", "cryptoSymbols"],
    symbol: "ETH",
    tokenType: "ERC-20",
    type: "CRYPTO",
    network: "ETH",
  })
  .freeze();

export const mapCryptoSymbols = (symbols) =>
  Object.fromEntries(
    Object.values(symbols).map((name) => [name.symbol, name.symbol])
  );
