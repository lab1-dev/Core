import {Component} from "../Components/Item/Component";


export function ref(target: any, propertyName: string, propertyDescriptor?: PropertyDescriptor/*always undefined*/):any {
    //console.log('(Ref). Key:', propertyName)
    let value : any;

    const getter = function() {
        if(value==undefined)return {
            propertyName:propertyName
        };
        return value;
    };
    const setter = function(newVal: any) {
        //console.log('(Ref)setter. NewVal:',newVal);
        value=newVal;
    };
    Object.defineProperty(target, propertyName, {
        get: getter,
        set: setter
    });
}
