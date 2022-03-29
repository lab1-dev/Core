import { Signal } from "typed-signals";
import type {RectangleProps} from "../../CoreExports";
import {Component, component, Property, StyleHelper} from "../../CoreExports";

//@component
export class Rectangle extends Component implements RectangleProps {

    //region properties
    readonly childContent = new Property<any>(this, undefined);
    readonly border = new Property<number|string|undefined>(this, undefined);
    readonly borderStyle = new Property<string|undefined>(this, undefined);
    readonly borderColor = new Property<string|undefined>(this, undefined);
    readonly borderRadius = new Property<number|string|undefined>(this, undefined);
    readonly borderWidth = new Property<number|string|undefined>(this, undefined);
    readonly elevation = new Property<number | undefined>(this, undefined,{
        customSetter:(value)=>{
            this.elevation._value=value;
            if(!this.element)return;
            switch (value) {
                case 0:
                    this.element.style.boxShadow = 'unset';
                    break;
                case 1:
                    this.element.style.boxShadow = '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
                    break;
                case 2:
                    this.element.style.boxShadow = '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
                    break;
                case 3:
                    this.element.style.boxShadow = '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
                    break;
                case 4:
                    this.element.style.boxShadow = '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)'
                    break;
            }
        }
    });
    //endregion

    //region Events and others
    readonly onClick = new Signal<(ev:MouseEvent) => void>();
    //endregion

    constructor(props: RectangleProps) {
        super({...{element: document.createElement('div')}, ...props});
        this.readProperties(props,true);
        this.render(true);
        //wire events
        this.element!.onclick=(ev)=>this.onClick.emit(ev);
    }

    public render(firstRender: boolean = false):void {
        super.render(firstRender);

        StyleHelper.setPixelAttr(this.element!,'border',undefined,this.border.value);
        StyleHelper.setAttr(this.element!,'borderStyle',undefined,this.borderStyle.value);
        StyleHelper.setPixelAttr(this.element!,'borderRadius',undefined,this.borderRadius.value);
        StyleHelper.setPixelAttr(this.element!,'borderWidth',undefined,this.borderWidth.value);
        StyleHelper.setAttr(this.element!,'borderColor',undefined,this.borderColor.value);
        this.setChildContent(this.childContent.value);
    }
}
