import {Component} from "../Item/Component";
import {PProps} from "./PProps";
import {Property} from "../../Codes/Property";

export class P extends Component implements PProps{

    readonly childContent = new Property<any>(this, undefined);

    constructor(props:PProps) {
        super({...<Partial<PProps>>{element: document.createElement('p')}, ...props});
        if (!this.element) return;
        this.readProperties(props);
        this.render(true);
    }

    public render(firstRender: boolean = false):void {
        super.render(firstRender);

        //P properties
        if(this.className.value!=undefined) this.element!.className=this.className.value;

        this.setChildContent(this.childContent.value);
    }
}
