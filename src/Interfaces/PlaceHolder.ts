import {Component} from "../Components/Item/Component";

export interface PlaceHolder{
    name:string
    placeHolderNode:Comment
    component?:Component,
    propertyToDelete?:Component

    //when using fragment
    fragment?:DocumentFragment
}
