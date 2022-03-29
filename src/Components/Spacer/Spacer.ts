import { Component} from "../Item/Component";
import {SpacerProps} from "./SpacerProps";


export class Spacer extends Component implements SpacerProps{

    //#region constructor
    constructor(props:SpacerProps) {
        super({...{element: document.createElement('mat-spacer')}, ...props});
        if(!this.element)return;

        this.element.className='flex-grow-1';
    }
    //#endregion
}
