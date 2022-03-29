
export class StringHelper{

    static contains(str:string, txt:string):boolean{
        if(str.indexOf(txt)>-1)return true;
        else return false;
    }

    static isNullOrEmpty(str:string|null|undefined):boolean{
        if(str==undefined)return true;
        return str.length == 0;
    }

    static isNullOrWhiteSpace(str:string|number| null|undefined):boolean{
        if(str==undefined)return true;
        if(typeof str==='number')str=str.toString();
        return str.trim().length == 0;
    }

    static replace(str:string,currentValue:string, newValue:string):string{
        return str.split(currentValue).join(newValue);
    }
}
