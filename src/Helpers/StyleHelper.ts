import {HorizontalAlign} from "../Enums/HorizontalAlign";

export class StyleHelper {

    /**
     * Applies the style to the element.
     * If appendMode=true, the style will be appended to the current element's style, if not there already.
     * @param element
     * @param style
     * @param appendMode
     */
    public static setStyle(element:HTMLElement, style:string|null|undefined, appendMode=false):void{
        if(style==undefined || style.length==0 && (!element.hasAttribute('style')))return;
        if(style.length > 0 && element.style.cssText==style)return;
        //console.log('applying style to element. Style:',style);
        if(!appendMode) element.style.cssText=style;
        else{
            //let's append to current style if not there already
            if(style.length>0 && element.style.cssText.indexOf(style)<0){
                //console.log('appending style');
                element.style.cssText+=' '+style;
            }
        }
    }

    /**
     * Applies the pixel value to the attribute.
     * If a defaultValue is provided a value is not, the defaultValue is set to the attribute.
     * @param element
     * @param attributeName
     * @param defaultValue
     * @param value
     */
    public static setPixelAttr(element: HTMLElement, attributeName: string, defaultValue: any, value: any): void {
        let style = element.style as any;
        if (value == undefined && (!style[attributeName]) && defaultValue==undefined) return;
        if (value != undefined && (style[attributeName] == value || style[attributeName] == value + 'px')) return;
        if (typeof value === 'number') style[attributeName] = value + 'px';
        else if (typeof value == 'string') style[attributeName] = value;
        else style[attributeName] = defaultValue;
    }

    public static setAttr(element:HTMLElement, attributeName:string,defaultValue:any, value:any):void{
        let style = element.style as any;
        if (value == undefined && (!style[attributeName]) && defaultValue==undefined) return;
        if (value != undefined && (style[attributeName] == value || style[attributeName] == value)) return;
        if (typeof value == 'string') style[attributeName] = value;
        if (typeof value == 'number') style[attributeName] = value.toString();
        else style[attributeName] = defaultValue;
    }

    public static setHorizontalAlign(element:HTMLElement, horizontalAlign:HorizontalAlign|undefined):void{
        if(horizontalAlign==undefined)return;
        switch (horizontalAlign){
            case HorizontalAlign.Center:
                if(element.style.position=='absolute' && element.style.left=='50%') return;//already centered
                element.style.position='absolute';
                element.style.top='0px';
                element.style.left='50%';
                element.style.transform='translateX(-50%)'
                break;
            case HorizontalAlign.Right:
                if(element.style.position=='absolute' && element.style.right=='0px')return;//already right
                element.style.position='absolute';
                element.style.top='0px';
                element.style.right='0px';
                break;
        }
    }
}
