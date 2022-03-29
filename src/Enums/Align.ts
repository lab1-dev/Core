
export enum Align{
  Left=1<< 1,
  Right= 1 << 2,
  Top= 1 << 3,
  Bottom= 1 << 4,
  HorizontalCenter= 1 << 5,
  VerticalCenter= 1 << 6,
  FillHeight=1<<7,//Ignored in ColumnLayout
  FillWidth=1<<8,//Ignored in RowLayout
  Baseline= 1 << 9
}
