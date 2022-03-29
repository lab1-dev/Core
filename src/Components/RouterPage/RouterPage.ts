import {RouterPageProps,  Component} from "../../CoreExports";

export class RouterPage extends Component implements RouterPageProps{

    constructor(props:RouterPageProps) {
        super({...{element: document.createElement('div')}, ...props});//todo nao alterar a tag para vrouter pq o height 100% deixa de funcionar
        //RouterPage properties
        this.readProperties(props,true);
        this.parent?.element?.appendChild(this.element!)
        //Let's write the properties into the DOM

    }

    //Do not call render from this constructor
    public render(firstRender: boolean = false):void {
        super.render(firstRender);

        //this.element!.style.backgroundColor='lightgreen'
        this.element!.style.width='100%';
        this.element!.style.height='100%';
    }
}

