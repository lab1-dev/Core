import { Signal } from 'typed-signals';
import {TextAlign, Component, Property, LabelProps, StyleHelper} from '../../CoreExports';

//@component
export class Label extends Component implements LabelProps {

    //region properties
    readonly text = new Property<string>(this, '');
    readonly textAlign = new Property<TextAlign>(this, TextAlign.Left);
    readonly font = new Property<string>(this, '');
    readonly fontWeight = new Property<string>(this, '');
    readonly color = new Property<string | undefined>(this, undefined);
    //endregion

    //region Events and others
    readonly onClick = new Signal<(ev:MouseEvent) => void>();
    //endregion

    constructor(props: LabelProps) {
        super({...{element: document.createElement('vlabel')}, ...props});
        this.element!.style.cursor = "default"
        this.element!.onclick=(ev)=>this.onClick.emit(ev);

        //Button properties
        this.readProperties(props, true);
        //Let's write the properties into the DOM
        this.render(true);

        //todo ver se funciona
        //this.applyStyle(Lab1.obj.baseTheme.typography.default)
    }

    public render(firstRender: boolean = false): void {
        super.render(firstRender);

        this.element!.textContent = this.text.value??'';
        this.element!.style.whiteSpace = 'nowrap';//to avoid line breaks when text contains spaces
        if (this.font.value?.length > 0) this.element!.style.font = this.font.value;
        if (this.fontWeight.value?.length > 0) this.element!.style.fontWeight = this.fontWeight.value;
        StyleHelper.setAttr(this.element!,'color',undefined,this.color.value);
        if (TextAlign.Left === (this.textAlign.value & TextAlign.Left)) {
            this.element!.style.textAlign = 'left'
        } else if (TextAlign.HCenter === (this.textAlign.value & TextAlign.HCenter)) {
            this.element!.style.textAlign = 'center'
        } else if (TextAlign.Right === (this.textAlign.value & TextAlign.Right)) {
            this.element!.style.textAlign = 'right'
        } else if (TextAlign.Justify === (this.textAlign.value & TextAlign.Justify)) {
            this.element!.style.textAlign = 'justify'
        }
    }
}
