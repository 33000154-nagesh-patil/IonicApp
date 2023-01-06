import { COMMON_RESPONSE_HEADER_STRUCTURE } from './common';

export class TOP_BID_ASK {
  public bHeader: COMMON_RESPONSE_HEADER_STRUCTURE;
  public iTotalSellQty: number;
  public iTotalBuyQty: number;
  public iBuyqty: number;
  public iSellqty: number;
  public fBuyprice: number;
  public fSellprice: number;

  constructor(arrayBuffer: ArrayBuffer) {
    const dataView = new DataView(arrayBuffer);
    let offset = 0;

    // Read the COMMON_RESPONSE_HEADER_STRUCTURE from the buffer
    this.bHeader = new COMMON_RESPONSE_HEADER_STRUCTURE(arrayBuffer.slice(offset, offset + 11));
    offset += 11;

    // Read the uint and float values from the buffer
    this.iTotalSellQty = dataView.getUint32(offset, true);
    offset += 4;
    this.iTotalBuyQty = dataView.getUint32(offset, true);
    offset += 4;
    this.iBuyqty = dataView.getUint32(offset, true);
    offset += 4;
    this.iSellqty = dataView.getUint32(offset, true);
    offset += 4;
    this.fBuyprice = dataView.getFloat32(offset, true);
    offset += 4;
    this.fSellprice = dataView.getFloat32(offset, true);
  }
}