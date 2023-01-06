import { COMMON_RESPONSE_HEADER_STRUCTURE } from './common';

export class PRICE_TICKER {
  public bHeader: COMMON_RESPONSE_HEADER_STRUCTURE;
  public LTP: number;

  constructor(arrayBuffer: ArrayBuffer) {
    const dataView = new DataView(arrayBuffer);
    let offset = 0;

    // Read the COMMON_RESPONSE_HEADER_STRUCTURE from the buffer
    this.bHeader = new COMMON_RESPONSE_HEADER_STRUCTURE(arrayBuffer.slice(offset, offset + 15));
    offset += 15;

    // Read the float value from the buffer
    this.LTP = dataView.getFloat32(offset, true);
  }
}