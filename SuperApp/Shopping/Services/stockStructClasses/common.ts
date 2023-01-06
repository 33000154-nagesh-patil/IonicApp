export class COMMON_RESPONSE_HEADER_STRUCTURE {
    public ExchSeg: number;
    public ScripId: number;
    public ScripId2: number;
    public MsgLength: number;
    public MsgCode: number;
  
    constructor(arrayBuffer: ArrayBuffer) {
      const dataView = new DataView(arrayBuffer);
      let offset = 0;
  
      // Read the byte and uint values from the buffer
      this.ExchSeg = dataView.getUint8(offset);
      offset += 1;
      this.ScripId = dataView.getUint32(offset, true);
      offset += 4;
      this.ScripId2 = dataView.getUint32(offset, true);
      offset += 4;
      this.MsgLength = dataView.getUint8(offset);
      offset += 1;
      this.MsgCode = dataView.getUint8(offset);
    }
  }