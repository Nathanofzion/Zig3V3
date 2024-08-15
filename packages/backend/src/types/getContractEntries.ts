export interface ContractEntriesResponse {
  entryUpdateByContractIdAndKey: ContractEntries;
}

export interface ContractEntries {
  edges: Edge[];
}

export interface Edge {
  node: Node;
}

export interface Node {
  id: string;
  contractId: string;
  keyXdr: string;
  valueXdr: string;
  txInfoByTx?: TxInfoByTx;
}

export interface TxInfoByTx {
  ledger: number;
  ledgerByLedger: LedgerByLedger;
}

export interface LedgerByLedger {
  closeTime: number;
}

export interface ParsedFactoryInstanceEntry {
  FeeTo: string;
  FeeToSetter: string;
  totalPairs: number;
  FeesEnabled?: boolean;
}

export interface SubscribeToLedgerEntriesInterface {
  ok: boolean;
  data: any;
  error: any;
}
