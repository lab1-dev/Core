import {Layout, LayoutType, ILogger, LogItem, StyleHelper, Property, Align, Wrap, Component, RowLayoutAlignSelf, ColumnLayoutAlignSelf, component} from "../../CoreExports";
import type {ColumnLayoutProps} from "../../CoreExports"

function defaultProps(): Partial<ColumnLayoutProps> {
    return{
        type: LayoutType.ColumnLayout,
        element: document.createElement('column-layout')
    }
}
export class ColumnLayout extends Layout implements ILogger, ColumnLayoutProps {

    //region properties
    readonly childContent = new Property<any>(this, undefined);
    readonly alignChildContent = new Property<Align>(this, Align.Left | Align.Top);
    readonly spacing = new Property<number | undefined>(this, undefined);
    readonly wrap = new Property<Wrap>(this, Wrap.NoWrap);
    //endregion

    //region other fields
    type=LayoutType.ColumnLayout
    logItems: LogItem[] = [];
    isLogging = false;
    onStartLogging() {this.isLogging = true;};
    onStopLogging() {this.isLogging = false;}
    //endregion

    constructor(props: ColumnLayoutProps) {
        super({...defaultProps(), ...props});
        this.isLayout = true;
        this.type = LayoutType.RowLayout;
        this.element!.style.display = 'flex';
        this.element!.style.flexDirection = 'column';
        this.readProperties(props)
        this.render(true);
        if(this.id=='myColumn') console.log('columnLayout created');
    }

    public render(firstRender: boolean = false):void {
        super.render(firstRender);

        this.setChildContent(this.childContent.value);
        if(Align.FillHeight==(this.alignChildContent.value & Align.FillHeight))console.warn('FillHeight is ignored in ColumnLayout.');
        StyleHelper.setPixelAttr(this.element!,'gap',undefined,this.spacing.value);
        //Items Wrap
        if(this.wrap.value==Wrap.NoWrap)this.element!.style.flexWrap='nowrap';
        else if(this.wrap.value==Wrap.Wrap)this.element!.style.flexWrap='wrap';
        if(this.wrap.value==Wrap.WrapReverse)this.element!.style.flexWrap='wrap-reverse';

        //ChildContent Vertical Alignment
        if (Align.Top === (this.alignChildContent.value & Align.Top))this.element!.style.justifyContent='flex-start';
        else if (Align.Bottom === (this.alignChildContent.value & Align.Bottom))this.element!.style.justifyContent='flex-end';
        else if (Align.VerticalCenter === (this.alignChildContent.value & Align.VerticalCenter))this.element!.style.justifyContent='center';

        //ChildContent Horizontal Alignment
        if (Align.Left === (this.alignChildContent.value & Align.Left))this.element!.style.alignItems='flex-start';
        else if (Align.Right === (this.alignChildContent.value & Align.Right))this.element!.style.alignItems='flex-end';
        else if (Align.HorizontalCenter === (this.alignChildContent.value & Align.HorizontalCenter))this.element!.style.alignItems='center';
        else if (Align.Baseline === (this.alignChildContent.value & Align.Baseline))this.element!.style.alignItems='baseline';
        else if (Align.FillWidth === (this.alignChildContent.value & Align.FillWidth))this.element!.style.alignItems='stretch';
    }

    onGetLogs(): LogItem[] {
        return [];
    }

    /**
     * This function is called by render() on every child component inside ColumnLayout.
     * Component.render() then calls (this.parent as any as Layout).updateChildContent(this);
     * @param component The component inside ColumnLayout that was (re)rendered.
     */
    public updateChildContent(component: Component): void {
        if (!component.element) {
            return;
        }
        StyleHelper.setAttr(component.element,'flexGrow',undefined,component.columnLayoutGrow.value);
        switch(component.columnLayoutAlignSelf.value){
            case ColumnLayoutAlignSelf.Left:
                component.element.style.alignSelf='flex-start';
                break;
            case ColumnLayoutAlignSelf.HorizontalCenter:
                component.element.style.alignSelf='center';
                break;
            case ColumnLayoutAlignSelf.Right:
                component.element.style.alignSelf='flex-end';
                break;
            case ColumnLayoutAlignSelf.FillWidth:
                component.element.style.alignSelf='stretch';
                break;
            case ColumnLayoutAlignSelf.Baseline:
                component.element.style.alignSelf='baseline';
                break;
            case ColumnLayoutAlignSelf.Auto:
                component.element.style.alignSelf='auto';
                break;
        }
    }
}
