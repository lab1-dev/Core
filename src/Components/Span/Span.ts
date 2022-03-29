import {SpanProps} from "./SpanProps";
import {Signal} from "typed-signals";
import {CssHelper, Component, Property} from "../../CoreExports";

export class Span extends Component implements SpanProps{

    //region properties
    readonly childContent = new Property<any>(this, undefined);
    readonly innerHtml = new Property<string>(this, '',{
        customGetter:()=>{
            return this.element!.innerHTML
        },
        customSetter:(value)=>{
            this.element!.innerHTML=value;
        }
    });
    //endregion

    //region events
    readonly onClick = new Signal<(ev: MouseEvent) => void>();
    readonly onMouseOver = new Signal<(ev: MouseEvent) => void>();
    readonly onMouseOut = new Signal<(ev: MouseEvent) => void>();
    //endregion

    constructor(props:SpanProps) {
        super({...{element:document.createElement('span')}, ...props});
        if (!this.element) return;

        //Wire events
        this.element.onclick=(ev:MouseEvent)=>this.onClick.emit(ev);
        this.element.onmouseover=(ev)=>this.onMouseOver.emit(ev);
        this.element.onmouseout=(ev)=>this.onMouseOut.emit(ev);

        this.readProperties(props,true);
        this.render(true);
    }

    public render(firstRender: boolean = false):void {
        super.render(firstRender);
        CssHelper.setClassName(this.element!,this.className.value);
        this.setChildContent(this.childContent.value);
    }
}
