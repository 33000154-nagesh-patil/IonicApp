import { COMMON_RESPONSE_HEADER_STRUCTURE } from './common';

export class STRUCT_52WKHIGHLOW {
  public bHeader: COMMON_RESPONSE_HEADER_STRUCTURE;
  public F52WKHIGH: number;
  public F52WKLOW: number;

  constructor(arrayBuffer: ArrayBuffer) {
    const dataView = new DataView(arrayBuffer);
    let offset = 0;

    // Read the COMMON_RESPONSE_HEADER_STRUCTURE from the buffer
    this.bHeader = new COMMON_RESPONSE_HEADER_STRUCTURE(arrayBuffer.slice(offset, offset + 19));
    offset += 19;

    // Read the F52WKHIGH and F52WKLOW floats from the buffer
    this.F52WKHIGH = dataView.getFloat32(offset, true);
    offset += 4;
    this.F52WKLOW = dataView.getFloat32(offset, true);
  }
}
