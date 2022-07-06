declare type CryptoSimbolsGroups =
  | "btcSymbols"
  | "ethSymbols"
  | "trxSymbols"
  | "eosSymbols"
  | "terSymbols"
  | "creditSymbols"
  | "fiatSymbols"
  | "cryptoSymbols";

declare interface ICryptoSymbol {
  symbol: Uppercase<string>;
  tokenType: string;
  type: "CRYPTO" | "FIAT";
  network: string;
  display: Uppercase<string>;
  unit: Uppercase<string>;
  name: string;
  external: Uppercase<string>;
  groups: CryptoSimbolsGroups[];
  decimals: number;
}

declare type InputSymbolData = Partial<ICryptoSymbol> &
  Pick<
    ICryptoSymbol,
    "symbol" | "tokenType" | "type" | "decimals" | "groups" | "network"
  >;

declare type ISymbols = Record<string, ICryptoSymbol>;

declare interface ISymbolBuilder {
  addSymbol: (token: InputSymbolData) => ISymbolBuilder;
  getGroup: (group: CryptoSimbolsGroups) => ICryptoSymbol[];
  freeze: () => ISymbolBuilder;
  symbols: ISymbols;
  groups: Record<CryptoSimbolsGroups, ICryptoSymbol>;
}
