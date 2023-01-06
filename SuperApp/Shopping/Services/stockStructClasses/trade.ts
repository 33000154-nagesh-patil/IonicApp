import { COMMON_RESPONSE_HEADER_STRUCTURE } from './common';

export class TRADE_STRUCT {
  public bHeader: COMMON_RESPONSE_HEADER_STRUCTURE;
  public LTP: number;
  public LTQ: number;
  public Volume: number;
  public ATP: number;
  public OI: number;
  public LTT: number;
  public LUT: number;

  constructor(arrayBuffer: ArrayBuffer) {
    const dataView = new DataView(arrayBuffer);
    let offset = 0;

    // Read the COMMON_RESPONSE_HEADER_STRUCTURE from the buffer
    this.bHeader = new COMMON_RESPONSE_HEADER_STRUCTURE(arrayBuffer.slice(offset, offset + 11));
    offset += 11;
    if(this.bHeader.MsgCode==1){
      // Read the float, ushort, uint, and int values from the buffer
      this.LTP = dataView.getFloat32(offset, true);
      offset += 4;
      this.LTQ = dataView.getUint16(offset, true);
      offset += 2;
      this.Volume = dataView.getUint32(offset, true);
      offset += 4;
      this.ATP = dataView.getFloat32(offset, true);
      offset += 4;
      this.OI = dataView.getInt32(offset, true);
      offset += 4;
      this.LTT = dataView.getInt32(offset, true);
      offset += 4;
      this.LUT = dataView.getInt32(offset, true);
    }
    
  }
}