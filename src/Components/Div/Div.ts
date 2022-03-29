import {Signal} from "typed-signals";
import {Property, ElementHelper, Component, DivProps, component} from "../../CoreExports";

//todo recolocar é que o constructor.name indica class_1 com o decorator @NewLab1ComponentDecorator
//@component
export class Div extends Component implements DivProps{

    //region properties
    readonly childContent = new Property<any>(this, undefined);
    readonly disabled = new Property<boolean>(this, false);
    readonly role = new Property<string|undefined>(this, undefined);
    //endregion

    //#region innerHtml
    private _innerHTML='';
    get innerHTML(): string {
        return this._innerHTML;
    }
    set innerHTML(value:string){
        if(this._innerHTML===value)return;
        this.element!.innerHTML=value;
    }
    //#endregion

    //region Events
    readonly onClick = new Signal<(ev:MouseEvent) => void>();
    readonly onContextMenu = new Signal<(ev:MouseEvent) => void>();
    readonly onMouseUp=new Signal<(ev:MouseEvent) => void>();
    readonly onMouseDown=new Signal<(ev:MouseEvent) => void>();
    readonly onMouseOver=new Signal<(ev:MouseEvent) => void>();
    readonly onMouseEnter=new Signal<(ev:MouseEvent) => void>();
    readonly onMouseLeave=new Signal<(ev:MouseEvent) => void>();
    readonly onFocusOut=new Signal<(ev:MouseEvent) => void>();
    //endregion

    constructor(props:DivProps) {
        super({...<Partial<DivProps>>{element:document.createElement('div')}, ...props});
        //Div properties
        this.readProperties(props,true);
        //Let's write the properties into the DOM
        this.render(true);
        //Events
        this.element!.onclick=(ev)=>this.onClick.emit(ev);
        this.element!.oncontextmenu=(ev)=>this.onContextMenu.emit(ev);
        this.element!.onmouseup=(ev)=>this.onMouseUp.emit(ev);
        this.element!.onmousedown=(ev)=>this.onMouseDown.emit(ev);
        this.element!.onmouseover=(ev)=>this.onMouseOver.emit(ev);
        this.element!.onmouseenter=(ev)=>this.onMouseEnter.emit(ev);
        this.element!.onmouseleave=(ev)=>this.onMouseLeave.emit(ev);
        //(this.element! as HTMLDivElement).onfo=(ev)=>this.onMouseOver.emit(ev);
    }

    public render(firstRender: boolean = false):void {
        super.render(firstRender);

        ElementHelper.toggleAttribute(this.element!,'disabled',this.disabled.value);

        if(this.role.value!=undefined)this.element?.setAttribute('role',this.role.value);
        else this.element?.removeAttribute('role');

        this.setChildContent(this.childContent.value);
    }

    public addChildComponent(component:Component):void{
        //console.log('(Div)addChildItem:'+component.constructor.name);
        super.addChildComponent(component);
    }
}
