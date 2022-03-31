import {Align, ILogger, Component, Layout, LayoutType, LogItem, LogType, Property, RowLayoutAlignSelf, StyleHelper} from "../../CoreExports";
import {RowLayoutProps} from "./RowLayoutProps";
import {Wrap} from "../../Enums/Wrap";

function defaultProps(): Partial<RowLayoutProps> {
    return {
        type: LayoutType.RowLayout,
        element: document.createElement('row-layout')
    }
}

export class RowLayout extends Layout implements ILogger, RowLayoutProps {

    //region properties
    readonly childContent = new Property<any>(this, undefined);
    readonly alignChildContent = new Property<Align>(this, Align.Left | Align.Top);
    readonly spacing = new Property<number | undefined>(this, undefined);
    readonly wrap = new Property<Wrap>(this, Wrap.NoWrap);
    //endregion

    //#region others
    type = LayoutType.RowLayout
    logItems: LogItem[] = [];
    isLogging = false;
    //#endregion

    //#region single line functions
    onStartLogging() {this.isLogging = true;};
    onStopLogging() {this.isLogging = false;}
    //#endregion

    //#region constructor
    constructor(props: RowLayoutProps) {
        super({...defaultProps(), ...props});
        if (!this.element) return;
        this.isLayout = true;
        this.type = LayoutType.RowLayout;
        this.element.style.display = 'flex';
        this.element.style.flexDirection = 'row';
        this.readProperties(props);
        this.render(true);
    }
    //#endregion

    public render(firstRender: boolean = false): void {
        super.render(firstRender);

        this.setChildContent(this.childContent.value);
        if(Align.FillWidth==(this.alignChildContent.value & Align.FillWidth))console.warn('FillWidth is ignored in RowLayout.');
        StyleHelper.setPixelAttr(this.element!,'gap',undefined,this.spacing.value);
        //Items Wrap
        if(this.wrap.value==Wrap.NoWrap)this.element!.style.flexWrap='nowrap';
        else if(this.wrap.value==Wrap.Wrap)this.element!.style.flexWrap='wrap';
        if(this.wrap.value==Wrap.WrapReverse)this.element!.style.flexWrap='wrap-reverse';

        //ChildContent Horizontal Alignment
        if (Align.Left === (this.alignChildContent.value & Align.Left))this.element!.style.justifyContent='flex-start';
        else if (Align.Right === (this.alignChildContent.value & Align.Right))this.element!.style.justifyContent='flex-end';
        else if (Align.HorizontalCenter === (this.alignChildContent.value & Align.HorizontalCenter))this.element!.style.justifyContent='center';

        //ChildContent Vertical Alignment
        if (Align.Top === (this.alignChildContent.value & Align.Top))this.element!.style.alignItems='flex-start';
        else if (Align.Bottom === (this.alignChildContent.value & Align.Bottom))this.element!.style.alignItems='flex-end';
        else if (Align.VerticalCenter === (this.alignChildContent.value & Align.VerticalCenter))this.element!.style.alignItems='center';
        else if (Align.Baseline === (this.alignChildContent.value & Align.Baseline))this.element!.style.alignItems='baseline';
        else if (Align.FillHeight === (this.alignChildContent.value & Align.FillHeight))this.element!.style.alignItems='stretch';
    }

    onGetLogs(): LogItem[] {
        if (this.children.length == 0) this.logItems.push({logType: LogType.debug, content: 'no children'});
        return this.logItems;
    }

    addChildComponent(component: Component): void {
        super.addChildComponent(component);
        //console.log('(RowLayout)addChildItem. id:',component.id)
    }

    /**
     * This function is called by render() on every child component inside RowLayout.
     * Component.render() then calls (this.parent as any as Layout).updateChildContent(this);
     * @param component The component inside RowLayout that was (re)rendered.
     */
    public updateChildContent(component: Component): void {
        if (!component.element) return;
        StyleHelper.setAttr(component.element,'flexGrow',undefined,component.rowLayoutGrow.value);
        switch(component.rowLayoutAlignSelf.value){
            case RowLayoutAlignSelf.Top:
                component.element.style.alignSelf='flex-start';
                break;
            case RowLayoutAlignSelf.VerticalCenter:
                component.element.style.alignSelf='center';
                break;
            case RowLayoutAlignSelf.Bottom:
                component.element.style.alignSelf='flex-end';
                break;
            case RowLayoutAlignSelf.FillHeight:
                component.element.style.alignSelf='stretch';
                break;
            case RowLayoutAlignSelf.Baseline:
                component.element.style.alignSelf='baseline';
                break;
            case RowLayoutAlignSelf.Auto:
                component.element.style.alignSelf='auto';
                break;
        }
    }
}

