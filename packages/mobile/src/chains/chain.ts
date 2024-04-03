export class Chain {
  type: string;
  chainId: string;
  name: string;
  id: string;
  logo: string;
  currency: string;
  rpc: string;
  rpcBackup: string;

  constructor(
    type: string,
    chainId: string,
    name: string,
    id: string,
    logo: string,
    currency: string,
    rpc: string,
    rpcBackup: string
  ) {
    this.type = type;
    this.chainId = chainId;
    this.name = name;
    this.id = id;
    this.logo = logo;
    this.currency = currency;
    this.rpc = rpc;
    this.rpcBackup = rpcBackup;
  }
}