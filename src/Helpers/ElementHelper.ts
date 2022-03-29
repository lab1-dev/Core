import {StringHelper} from "./StringHelper";

export class ElementHelper {

    static appendClass(element:HTMLElement, className:string):void{
        if(!StringHelper.contains(element.className,className))element.className+=' '+ className;
    }

    static removeClass(element:HTMLElement, className:string):void{
        element.className.replace(className,'')
    }

    static removeClasses(element:HTMLElement, classNames:string[]):void{
        for(let className of classNames){
            element.className.replace(className,'')
        }
    }

    static containsClass(element:HTMLElement, className:string):boolean{
        if(!StringHelper.contains(element.className,className))return false;
        return true;
    }

    static clearChildren(element:HTMLElement):void{
        while (element.lastElementChild) {
            let lastChildElement=element.lastElementChild;
            element.removeChild(lastChildElement);
        }
    }

    static toggleAttribute(element:HTMLElement, attributeName:string, visible:boolean){
        if(visible) element.setAttribute(attributeName,'');
        else element.removeAttribute(attributeName);
    }

    static insertAfter(parentElement:HTMLElement,elementToInsert:HTMLElement, afterNode:Node):void{
        parentElement.insertBefore(elementToInsert,afterNode.nextSibling);
    }

    static insertFragmentAfter(parentElement:HTMLElement,fragmentToInsert:DocumentFragment, afterNode:Node):void{
        parentElement.insertBefore(fragmentToInsert,afterNode.nextSibling);
    }
}
