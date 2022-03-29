
export class ERect{
  x?:number
  y?:number
  width?:number
  height?:number
  private _valid:boolean=false
  get valid(): boolean {
    if(!this._valid)return false
    if((this.x==undefined) || (this.y==undefined) || (!this.width) || (!this.height))return false
    return true
  }
  set valid(value: boolean) {
    this._valid = value;
  }

  print(){
    console.log( 'x:'+this.x+'. y:'+this.y+'. width:'+this.width+'. height:'+this.height)
  }

  getPrint(){
    return 'x:'+this.x+'. y:'+this.y+'. width:'+this.width+'. height:'+this.height
  }

}
