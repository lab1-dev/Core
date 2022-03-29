import {CssHelper, Component, Property} from "../../CoreExports";
import {InputProps} from "./InputProps";

export class Input<T> extends Component implements InputProps<T>{

    //region properties
    readonly type = new Property<string>(this, 'text');
    readonly tabIndex = new Property<number|undefined>(this, undefined);
    readonly value = new Property<T|undefined>(this, undefined);
    readonly name = new Property<string|undefined>(this, undefined);
    readonly disabled = new Property<boolean>(this, false);
    readonly checked = new Property<boolean>(this, false);
    //endregion


    constructor(props:InputProps<T>) {
        super({...{element: document.createElement('input')}, ...props});
        //Input properties
        this.readProperties(props,true);
        //Let's write the properties into the DOM
        this.render(true);
    }

    public render(firstRender: boolean = false):void {
        super.render(firstRender);

        let element=this.element as HTMLInputElement;
        CssHelper.setClassName(element,this.className.value);
        element.type=this.type.value;
        element.tabIndex=this.tabIndex.value??-1
        if(this.value.value==undefined)this.element?.removeAttribute('value');
        else element.value=(this.value.value as any).toString();
        element.disabled=this.disabled.value;
        element.checked=this.checked.value;
    }
}
