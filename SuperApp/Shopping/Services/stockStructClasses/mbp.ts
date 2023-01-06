import { COMMON_RESPONSE_HEADER_STRUCTURE } from './common';
import { MBP_ROW_STRUCT } from './mbpRow';

export class MBP_STRUCT {
  public bHeader: COMMON_RESPONSE_HEADER_STRUCTURE;
  public submbp: MBP_ROW_STRUCT[];

  constructor(arrayBuffer: ArrayBuffer) {
    const dataView = new DataView(arrayBuffer);
    let offset = 0;

    // Read the COMMON_RESPONSE_HEADER_STRUCTURE from the buffer
    this.bHeader = new COMMON_RESPONSE_HEADER_STRUCTURE(arrayBuffer.slice(offset, offset + 11));
    offset += 11;

    // Read the MBP_ROW_STRUCT values from the buffer
    this.submbp = [];
    for (let i = 0; i < 5; i++) {
      this.submbp.push(new MBP_ROW_STRUCT(arrayBuffer.slice(offset, offset + 20)));
      offset += 20;
    }
  }
}