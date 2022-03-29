import { Signal } from "typed-signals";
import {Component, ElementHelper, Property, component} from "../../CoreExports";
import type {ButtonProps} from "../../CoreExports";

//@component
export class Button extends Component implements ButtonProps{

    //region properties
    readonly type = new Property<string>(this, 'button');
    readonly ariaLabel = new Property<string|undefined>(this,undefined);
    readonly disabled = new Property<boolean>(this,false);
    //endregion

    //region DOM nodes, events and others
    readonly onClick = new Signal<(ev:MouseEvent) => void>();
    //endregion

    constructor(props: ButtonProps) {
        super({...{element: document.createElement('button')}, ...props});
        //Button properties
        this.readProperties(props,true);
        //Let's write the properties into the DOM
        this.render(true);
        //Events
        this.element!.onclick=(ev)=>this.onClick.emit(ev);
    }

    public render(firstRender: boolean = false):void {
        super.render(firstRender);

        let btn=this.element as HTMLButtonElement;
        btn.type=this.type.value;
        btn.disabled=this.disabled.value;
        if(this.key.value)btn.setAttribute('key',this.key.value);
    }
}
