import {ILogger, LogItem} from "../../Interfaces/ILogger";
import {Align, GridLayoutAlignSelf, GridLayoutProps, Component, Layout, LayoutType, Property, RowLayoutAlignSelf} from "../../CoreExports";

function defaultProps(): Partial<GridLayoutProps> {
    return {
        type: LayoutType.GridLayout,
        element: document.createElement('grid-layout')
    }
}
export class GridLayout extends Layout implements ILogger, GridLayoutProps {

    //region properties
    readonly alignChildContent = new Property<Align>(this, Align.Left | Align.Top);
    readonly rows = new Property<number|string>(this, 0);
    readonly columns = new Property<number|string>(this, 0);
    readonly rowSpacing = new Property<number>(this, 0);
    readonly columnSpacing = new Property<number>(this, 0);
    //endregion

    //region other fields
    type = LayoutType.GridLayout
    logItems: LogItem[] = [];
    isLogging = false;
    //gridStyle:CSS.Properties={}
    onStartLogging() {this.isLogging = true;};
    onStopLogging() {this.isLogging = false;}
    //endregion

    constructor(props: GridLayoutProps) {
        super({...defaultProps(), ...props});
        this.isLayout = true;
        this.type = LayoutType.GridLayout;
        this.element!.style.display = 'grid';
        this.readProperties(props);
        this.render(true);
    }

    public render(firstRender: boolean = false): void {
        super.render(firstRender);

        if (this.rows.value < 1 || this.columns.value < 1) return;
        this.element!.style.gridTemplateRows = '';
        this.element!.style.gridTemplateColumns = '';
        if(typeof this.rows.value=='number'){//User passed the number of rows. We set 'auto' as height for each row
            for (let row = 0; row < this.rows.value; row++) {
                this.element!.style.gridTemplateRows += ' auto'
            }
        }else {//User passed the height for each row. Ex: rows: '12px 12px 12px'
            this.element!.style.gridTemplateRows=this.rows.value;
        }
        if(typeof this.columns.value=='number'){
            for (let column = 0; column < this.columns.value; column++) {
                this.element!.style.gridTemplateColumns += ' auto'
            }
        }else this.element!.style.gridTemplateColumns=this.columns.value;
        if (this.rowSpacing.value) this.element!.style.rowGap = this.rowSpacing + 'px';
        if (this.columnSpacing.value) this.element!.style.columnGap = this.columnSpacing + 'px';
        for (let child of this.children) {
            if (child.element) child.element.style.position = ''
            //child.render();//check if needed
        }

        //ChildContent Horizontal Alignment
        if (Align.Left === (this.alignChildContent.value & Align.Left))this.element!.style.justifyItems='start';
        else if (Align.Right === (this.alignChildContent.value & Align.Right))this.element!.style.justifyItems='end';
        else if (Align.HorizontalCenter === (this.alignChildContent.value & Align.HorizontalCenter))this.element!.style.justifyItems='center';
        else if (Align.FillWidth === (this.alignChildContent.value & Align.FillWidth))this.element!.style.justifyItems='stretch';

        //ChildContent Vertical Alignment
        if (Align.Top === (this.alignChildContent.value & Align.Top))this.element!.style.alignItems='start';
        else if (Align.Bottom === (this.alignChildContent.value & Align.Bottom))this.element!.style.alignItems='end';
        else if (Align.VerticalCenter === (this.alignChildContent.value & Align.VerticalCenter))this.element!.style.alignItems='center';
        else if (Align.Baseline === (this.alignChildContent.value & Align.Baseline))this.element!.style.alignItems='baseline';
        else if (Align.FillHeight === (this.alignChildContent.value & Align.FillHeight))this.element!.style.alignItems='stretch';
    }

    onGetLogs(): LogItem[] {
        return [];
    }

    public updateChildContent(component: Component): void {
        if (!component.parent || !component.parent.isLayout) return;
        component.element!.style.position = ''

        component.element!.style.gridColumnEnd = 'span ' + component.gridLayoutColumnSpan.value;
        component.element!.style.gridRowEnd = 'span ' + component.gridLayoutRowSpan.value;

        //AlignSelf Horizontal Alignment
        if (GridLayoutAlignSelf.Auto === (component.gridLayoutAlignSelf.value & GridLayoutAlignSelf.Auto))component.element!.style.removeProperty('justifySelf');
        if (GridLayoutAlignSelf.Left === (component.gridLayoutAlignSelf.value & GridLayoutAlignSelf.Left))component.element!.style.justifySelf='start';
        else if (GridLayoutAlignSelf.Right === (component.gridLayoutAlignSelf.value & GridLayoutAlignSelf.Right))component.element!.style.justifySelf='end';
        else if (GridLayoutAlignSelf.HorizontalCenter === (component.gridLayoutAlignSelf.value & GridLayoutAlignSelf.HorizontalCenter))component.element!.style.justifySelf='center';
        else if (GridLayoutAlignSelf.FillWidth === (component.gridLayoutAlignSelf.value & GridLayoutAlignSelf.FillWidth))component.element!.style.justifySelf='stretch';

        //AlignSelf Vertical Alignment
        if (GridLayoutAlignSelf.Top === (component.gridLayoutAlignSelf.value & GridLayoutAlignSelf.Top))component.element!.style.alignSelf='start';
        else if (GridLayoutAlignSelf.Bottom === (component.gridLayoutAlignSelf.value & GridLayoutAlignSelf.Bottom))component.element!.style.alignSelf='end';
        else if (GridLayoutAlignSelf.VerticalCenter === (component.gridLayoutAlignSelf.value & GridLayoutAlignSelf.VerticalCenter))component.element!.style.alignSelf='center';
        else if (GridLayoutAlignSelf.Baseline === (component.gridLayoutAlignSelf.value & GridLayoutAlignSelf.Baseline))component.element!.style.alignSelf='baseline';
        else if (GridLayoutAlignSelf.FillHeight === (component.gridLayoutAlignSelf.value & GridLayoutAlignSelf.FillHeight))component.element!.style.alignSelf='stretch';
    }
}
