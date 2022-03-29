import {BuilderState} from "../Enums/BuilderState";
import {Component} from "../Components/Item/Component";

export interface Builder{
    parentComponent?:Component,//todo precisa disso . Ver problema no button
    holder:string
    builderFunction?: (firstRender:boolean) => Component
    condition:boolean
    propertyNameToDelete?:string

    //when using fragment
    builderFragmentFunction?:(state:BuilderState)=>DocumentFragment|undefined
}
