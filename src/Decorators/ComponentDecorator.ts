import {Component, Property} from "../CoreExports";

export function component<T extends { new (...args: any[]): {} }>(constructor: T) {
    const originalConstructor = constructor;
    //console.log('rodando component decorator')

    let extendedClass=class extends constructor {
        //adds a hidden field: newField = "https://www...";

        constructor(...args: any[]) {
            super(...args)
            let thisObj=this as object;
            Object.getOwnPropertyNames(this).forEach(function(val:string, idx, array) {
                // @ts-ignore
                let fieldValue=thisObj[val];
                if(fieldValue instanceof Property){
                    let prop=fieldValue as Property<any>
                    if(val.startsWith('_'))prop.name=val.substring(1);//removes the _ from property name
                    else prop.name = val;
                    let currentComponent=thisObj as Component;
                    if(currentComponent) prop.ownerItem=currentComponent;
                    else {
                        console.log('(component decorator)ownerItem not found');
                        prop.ownerItem=thisObj as Component;
                    }
                }
            });
        }
    };
    extendedClass.prototype = originalConstructor.prototype;
    return extendedClass;
}
