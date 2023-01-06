export class MBP_ROW_STRUCT {
    public iBuyqty: number;
    public iSellqty: number;
    public iBuyordno: number;
    public iSellordno: number;
    public fBuyprice: number;
    public fSellprice: number;
  
    constructor(arrayBuffer: ArrayBuffer) {
      const dataView = new DataView(arrayBuffer);
      let offset = 0;
  
      // Read the uint, ushort, and float values from the buffer
      this.iBuyqty = dataView.getUint32(offset, true);
      offset += 4;
      this.iSellqty = dataView.getUint32(offset, true);
      offset += 4;
      this.iBuyordno = dataView.getUint16(offset, true);
      offset += 2;
      this.iSellordno = dataView.getUint16(offset, true);
      offset += 2;
      this.fBuyprice = dataView.getFloat32(offset, true);
      offset += 4;
      this.fSellprice = dataView.getFloat32(offset, true);
    }
  }