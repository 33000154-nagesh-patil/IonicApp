import { COMMON_RESPONSE_HEADER_STRUCTURE } from './common';

export class STRUCT_PCLOSE {
  public bHeader: COMMON_RESPONSE_HEADER_STRUCTURE;
  public PClose: number;
  public POI: number;

  constructor(arrayBuffer: ArrayBuffer) {
    const dataView = new DataView(arrayBuffer);
    let offset = 0;

    // Read the COMMON_RESPONSE_HEADER_STRUCTURE from the buffer
    this.bHeader = new COMMON_RESPONSE_HEADER_STRUCTURE(arrayBuffer.slice(offset, offset + 35));
    offset += 35;

    // Read the float values from the buffer
    this.PClose = dataView.getFloat32(offset, true);
    offset += 4;
    this.POI = dataView.getFloat32(offset, true);
  }
}