import { COMMON_RESPONSE_HEADER_STRUCTURE } from './common';

export class MARKET_STATUS {
  public bHeader: COMMON_RESPONSE_HEADER_STRUCTURE;
  public Mkt_Type: string;
  public Mkt_Status: number;

  constructor(arrayBuffer: ArrayBuffer) {
    const dataView = new DataView(arrayBuffer);
    let offset = 0;

    // Read the COMMON_RESPONSE_HEADER_STRUCTURE from the buffer
    this.bHeader = new COMMON_RESPONSE_HEADER_STRUCTURE(arrayBuffer.slice(offset, offset + 18));
    offset += 18;

    // Read the Mkt_Type string from the buffer
    const mktTypeBuffer = arrayBuffer.slice(offset, offset + 3);
    this.Mkt_Type = String.fromCharCode.apply(null, new Uint8Array(mktTypeBuffer));
    offset += 3;

    // Read the Mkt_Status float from the buffer
    this.Mkt_Status = dataView.getFloat32(offset, true);
  }
}