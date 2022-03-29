import { StringHelper } from './StringHelper';

export class CssHelper {

    stringBuffer:string;

    public static default(value:string):CssHelper {
        return new this(value);
    }

    public static empty():CssHelper {
        return new this('');
    }

    constructor(value:string) {
        this.stringBuffer=value;
    }

    public static setClassName(element:HTMLElement, className:string|null|undefined, appendMode=false):void{
        if(className==undefined || className.length==0 && (!element.hasAttribute('class')))return;
        if(className.length > 0 && element.className==className)return;
        //console.log('applying css class to element. ClassName:',className);
        if(!appendMode) element.className=className;
        else{
            //let's append to current class if not there already
            if(className.length>0 && element.className.indexOf(className)<0){
                //console.log('appending style');
                element.className+=' '+className;
            }
        }
    }

    addValue(value:string):CssHelper{
        this.stringBuffer += value;
        return this;
    }

    addClass(value: string, when: boolean=true) : CssHelper {
        if(when)return this.addValue(" "+value);
        else return this;
    }

    addClassFromAttributes(additionalAttributes:  { [id: string] : object; } ) : CssHelper{
        if(additionalAttributes==undefined)return this;
        let value=additionalAttributes['class'];
        if(value)return this.addClass(value.toString());
        else return this;
    }

    build():string{
        return this.stringBuffer!=undefined?this.stringBuffer.trim():'';
    }

    toString():string{
        return this.build();
    }





    static containsClass(element:HTMLElement, className:string):boolean{
        if(!StringHelper.contains(element.className,className))return false;
        return true;
    }

    static appendClass(element:HTMLElement, className:string):void{
        if(!StringHelper.contains(element.className,className))element.className+=' '+ className;
    }

    static appendOrRemoveClass(element:HTMLElement, className:string,enabled:boolean):void{
        let contains=StringHelper.contains(element.className,className);
        if(!contains && enabled==false)return;//no class to set
        else if(contains && enabled==false)CssHelper.removeClass(element,className);
        else if(!contains && enabled==true)CssHelper.appendClass(element,className);
    }

    static removeClass(element:HTMLElement, className:string):void{
        element.className= element.className.replace(className,'')
    }
}
