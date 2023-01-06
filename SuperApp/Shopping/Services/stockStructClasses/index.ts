import { COMMON_RESPONSE_HEADER_STRUCTURE } from './common';

export class INDEX_STRUCT {
  public bHeader: COMMON_RESPONSE_HEADER_STRUCTURE;
  public LTP: number;
  public fOpen: number;
  public fClose: number;
  public fHigh: number;
  public fLow: number;

  constructor(arrayBuffer: ArrayBuffer) {
    const dataView = new DataView(arrayBuffer);
    let offset = 0;

    // Read the COMMON_RESPONSE_HEADER_STRUCTURE from the buffer
    this.bHeader = new COMMON_RESPONSE_HEADER_STRUCTURE(arrayBuffer.slice(offset, offset + 31));
    offset += 31;

    // Read the float values from the buffer
    this.LTP = dataView.getFloat32(offset, true);
    offset += 4;
    this.fOpen = dataView.getFloat32(offset, true);
    offset += 4;
    this.fClose = dataView.getFloat32(offset, true);
    offset += 4;
    this.fHigh = dataView.getFloat32(offset, true);
    offset += 4;
    this.fLow = dataView.getFloat32(offset, true);
  }
}