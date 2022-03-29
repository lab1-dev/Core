
export class Logger{

  public static logError(id:string, msg:string){
    console.error('('+id+')'+msg)
  }

  public static logDebug(id:string, msg:string,...optionalParams: any[]){
    console.log('('+id+')'+msg,...optionalParams)
  }

  public static logWithColor(color:string, msg:string,...optionalParams: string[]){
    let array=[...optionalParams];
    console.log(`%c%s %s`, `background: #222; color: ${color}`, msg, array.join(' '));
  }
}
