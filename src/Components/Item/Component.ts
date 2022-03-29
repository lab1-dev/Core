import {
    Anchor, Builder, ChildContentHelper, ColumnLayoutAlignSelf, CssHelper, GridLayoutAlignSelf, HorizontalAlign, IComponent, ILogger, ComponentProps, Lab1,
    Layout, PlaceHolder, Property, PropertyHelper, RowLayoutAlignSelf, StyleHelper, TypescriptHelper
} from "../../CoreExports";
import {Signal} from "typed-signals";

export class Component implements ComponentProps {

    //region properties
    readonly rowLayoutGrow = new Property<number | undefined>(this, undefined);
    readonly rowLayoutAlignSelf = new Property<RowLayoutAlignSelf>(this, RowLayoutAlignSelf.Auto);
    readonly columnLayoutGrow = new Property<number | undefined>(this, undefined);
    readonly columnLayoutAlignSelf = new Property<ColumnLayoutAlignSelf>(this, ColumnLayoutAlignSelf.Auto);
    readonly gridLayoutRowSpan = new Property<number>(this, 1);
    readonly gridLayoutColumnSpan = new Property<number>(this, 1);
    readonly gridLayoutAlignSelf = new Property<GridLayoutAlignSelf>(this, GridLayoutAlignSelf.Auto);
    readonly key = new Property<string | undefined>(this, undefined);//used by Manager to allow a more precise component management in for loops
    readonly anchors = new Property<Anchor>(this, Anchor.NotSet);
    readonly horizontalAlign = new Property<HorizontalAlign | undefined>(this, undefined);
    readonly width = new Property<number | string | undefined>(this, undefined);
    readonly minWidth = new Property<number | string | undefined>(this, undefined);
    readonly maxWidth = new Property<number | string | undefined>(this, undefined);
    readonly height = new Property<number | string | undefined>(this, undefined);
    readonly minHeight = new Property<number | string | undefined>(this, undefined);
    readonly maxHeight = new Property<number | string | undefined>(this, undefined);
    readonly backgroundColor = new Property<string | undefined>(this, undefined);
    readonly backgroundImage = new Property<string | undefined>(this, undefined);
    readonly className = new Property<string | undefined>(this, undefined);
    readonly style = new Property<string | undefined>(this, undefined);
    readonly tabIndex = new Property<number | undefined>(this, undefined);
    readonly margin = new Property<number | string | undefined>(this, undefined);
    readonly marginTop = new Property<number | string | undefined>(this, undefined);
    readonly marginBottom = new Property<number | string | undefined>(this, undefined);
    readonly marginLeft = new Property<number | string | undefined>(this, undefined);
    readonly marginRight = new Property<number | string | undefined>(this, undefined);
    readonly padding = new Property<number | string | undefined>(this, undefined);
    readonly paddingTop = new Property<number | string | undefined>(this, undefined);
    readonly paddingBottom = new Property<number | string | undefined>(this, undefined);
    readonly paddingLeft = new Property<number | string | undefined>(this, undefined);
    readonly paddingRight = new Property<number | string | undefined>(this, undefined);
    readonly visible = new Property<boolean>(this, true, {
        customSetter: (value) => {
            this.visible._value = value;
            if (this.element) this.element.style.visibility = value ? 'visible' : 'hidden';
            if (!this.holdRender) this.render();
            this.onVisibleChange.emit(value);
        }
    });
    readonly display = new Property<string>(this, '', {
        customGetter: () => {
            if (!this.element) return '';
            return this.element.style.display;
        },
        customSetter: (value) => {
            if (!this.element) return;
            this.display._value = value;
            this.element!.style.display = value;
        }
    })
    //endregion

    //region DOM nodes, events and others
    readonly uniqueID: string //automatically generated random uuid for this component instance.
    internalID?: string
    _id: string = '';
    get id() {
        return this._id;
    }
    set id(value: string) {
        this._id = value;
        if (this.element && value.length > 0) this.element.id = value;
    }
    get partialID(): string {
        if (this.id.length > 0) return this.id;
        if (this.key.value != undefined) return this.key.value;
        return this.uniqueID;
    }
    get completeID(): string {
        return `${this.constructor.name}-${this.partialID}`
    }
    public tag?: Object;
    public index = -1//internally used by Manager
    public indexToReplace?: number;//internally used by Manager
    public isManaged = false;
    public userAttributes?: NamedNodeMap
    element?: HTMLElement;
    public holdRender = false;
    children: any[] = []
    public _parent?: Component;
    get parent(): Component | undefined {
        return this._parent;
    }
    set parent(value: Component | undefined) {
        this._parent = value;
    }
    placeHolderList: PlaceHolder[] = [];
    isLayout = false;//todo remove in the future. instanceof is crashing
    readonly onVisibleChange = new Signal<(visible: boolean) => void>();
    //endregion

    constructor(props: ComponentProps) {
        this.uniqueID = Lab1.newID();
        if (props.element) this.element = props.element;
        if (props.id != undefined) this.id = props.id;
        if (props.internalID != undefined) this.internalID = props.internalID;
        this._parent = props.parent;
        if (TypescriptHelper.implementsILogger(this)) (this as unknown as ILogger).onStartLogging();
        if (!props.element) return;//maybe it's svg
        if (!props.parent/*usually, only MainWindow*/) return;
        this.readBaseProps(props);
        if (this.indexToReplace != undefined) {
            //console.log('replacing index ',this.indexToReplace)
            this.parent?.replaceChildComponent(this.indexToReplace, this);
        } else {
            //todo if(this.isManaged){
            //     if(this.parentComponent?.element==undefined){//Total managed component. Ex: Chip
            //         console.log('(Item)total managed component', this.constructor.name, '.ParentItem:',this.parentComponent?.constructor.name)
            //         this.parentComponent!.element=this.element;
            //         this.parentComponent?.parentComponent?.addChildItem(this.parentComponent);
            //         if (this.parentComponent?.parentComponent?.isLayout) this.parentComponent.parentComponent.render();
            //     }
            // }
            this.parent?.addChildComponent(this);
        }
        if (this.parent?.isLayout) this.parent.render();
    }

    private readBaseProps(props: ComponentProps): void {//isso é pq está chamando o addChildItem sem ter as propriedades básicas setadas. Todo talvez ver uma forma melhor
        if (props.indexToReplace != undefined) this.indexToReplace = props.indexToReplace;
        if (props.isManaged != undefined) this.isManaged = props.isManaged;
        if (props.anchors != undefined) {
            if (this.parent == undefined || this.parent.constructor.name != 'AnchorsLayout') console.error(`${this.constructor.name} requires AnchorsLayout as parentComponent. Anchors ignored`)
            this.readPropertyWithoutSetter(props, 'anchors');
        }
    }

    /**
     * This function is called automatically by Lab1Manager when coding with Managed Typescript/TSX. It replaces an old component by a new one in the specified index position.
     * @param index Index position where the current component is in the parent's children list.
     * @param newComponent The new component that will take the index position after removing the current component.
     */
    public replaceChildComponent(index: number, newComponent: Component): void {
        let oldItem = this.children[index]
        for (let child of oldItem.children) {
            (child as Component).delete();
        }
        this.element?.replaceChild(newComponent.element!, oldItem.element!);
        this.children[index] = newComponent;
        this.indexToReplace = undefined;
    }

    /**
     * Renders the basic properties into the DOM.
     * Override this method on each Component subclass to render your component properties.
     * This function works together with Property. Whenever a Property changes, Property will attempt to call render() in the component where the property changed,
     * if the function is available in the component.
     */
    public render(firstRender: boolean = false): void {
        this.holdRender = false;
        if (!this.element) return;
        this.setStyleAndClassProperties();
        this.updateLayout();
        CssHelper.setClassName(this.element, this.className.value);
        if (this.tabIndex.value) this.element!.tabIndex = this.tabIndex.value;
        if (!firstRender) setTimeout(() => this.onAfterRender(false), 500);
    }

    protected setStyleAndClassProperties(): void {
        if (!this.element) return;
        StyleHelper.setHorizontalAlign(this.element, this.horizontalAlign.value);
        StyleHelper.setStyle(this.element, this.style.value, true);
        StyleHelper.setPixelAttr(this.element, 'width', undefined, this.width.value);
        StyleHelper.setPixelAttr(this.element, 'minWidth', undefined, this.minWidth.value);
        StyleHelper.setPixelAttr(this.element, 'maxWidth', undefined, this.maxWidth.value);
        StyleHelper.setPixelAttr(this.element, 'height', undefined, this.height.value);
        StyleHelper.setPixelAttr(this.element, 'minHeight', undefined, this.minHeight.value);
        StyleHelper.setPixelAttr(this.element, 'maxHeight', undefined, this.maxHeight.value);
        StyleHelper.setPixelAttr(this.element, 'margin', undefined, this.margin.value);
        StyleHelper.setPixelAttr(this.element, 'marginTop', undefined, this.marginTop.value);
        StyleHelper.setPixelAttr(this.element, 'marginBottom', undefined, this.marginBottom.value);
        StyleHelper.setPixelAttr(this.element, 'marginLeft', undefined, this.marginLeft.value);
        StyleHelper.setPixelAttr(this.element, 'marginRight', undefined, this.marginRight.value);
        StyleHelper.setPixelAttr(this.element, 'padding', undefined, this.padding.value);
        StyleHelper.setPixelAttr(this.element, 'paddingTop', undefined, this.paddingTop.value);
        StyleHelper.setPixelAttr(this.element, 'paddingBottom', undefined, this.paddingBottom.value);
        StyleHelper.setPixelAttr(this.element, 'paddingLeft', undefined, this.paddingLeft.value);
        StyleHelper.setPixelAttr(this.element, 'paddingRight', undefined, this.paddingRight.value);
        StyleHelper.setAttr(this.element, 'backgroundColor', undefined, this.backgroundColor.value);
        StyleHelper.setAttr(this.element, 'backgroundImage', undefined, this.backgroundImage.value);
    }

    public isInherited(className: any): boolean {
        return (this.constructor.name != className.name)
    }

    /**
     * This function is automatically called in 2 situations:
     * 1) by RouterView after the router page is rendered
     * 2) by Component after subsequent render calls (not firstRender). In this case, it waits 500ms and then call onAfterRender(false)
     * You can override this function as async in your component or router page to perform any post render processing. (Ex: retrieve data from a server side).
     * @param firstRender
     */
    onAfterRender(firstRender: boolean = false): void {}

    /**
     * This function is called automatically by Router whenever the history pops to the previous page.
     */
    public onDestroy(): void {
        console.log(`(Component:${this.completeID})onDestroy`)
        if (this.element && this.parent && this.parent.element) this.parent.element.removeChild(this.element)
    }

    public delete(): undefined {
        if (!this.element) return undefined;
        if (this.parent) {//let's remove the component from parent's children list first
            this.parent.removeChildComponent(this, true);
            return undefined;
        }
        this.element.remove();
        for (let child of this.children) {
            (child as Component).delete();
        }
        return undefined;
    }

    public updateLayout(): void {
        if (!this.parent || !this.parent.isLayout) return;
        (this.parent as any as Layout).updateChildContent(this);
    }

    //Managed TS and TSX=========================================================
    protected buildManagedFragment(parentComponent: Component, tsxComponents: IComponent[], key: string = 'fullComponent'): void {
        Lab1.obj.buildTsxFragment(this, parentComponent, tsxComponents, key);
    }

    protected buildManaged(parentComponent: Component, managedContent: IComponent | IComponent[], key: string = 'fullComponent'): void {
        Lab1.obj.buildManagedComponent(this, parentComponent, managedContent, key);
    }

    //Properties================================================================
    public readProperties(props: any, holdRender = true): void {
        this.holdRender = holdRender;
        PropertyHelper.readProperties(this, props);
    }

    public readPropertyWithoutSetter(props: any, propName: string): void {
        PropertyHelper.readPropertyWithoutSetter(this, props, propName);
    }

    //ChildContent================================================================
    public addChildComponent(component: Component): void {
        ChildContentHelper.addChildComponent(this, component);
    }

    public insertAfter(components: Component[]): void {
        ChildContentHelper.insertAfter(this, components);
    }

    public appendChildren(components: Component[]): void {
        ChildContentHelper.appendChildren(this, components);
    }

    public addChild(component: Component): void {//todo talvez remover essa funcao e deixar só addChildItem. Deixei ela pq em addChildren e insertAfter que usam ela.
        ChildContentHelper.addChild(this, component);
    }

    public removeChildComponent(component: Component, alsoDelete: boolean = true): void {
        ChildContentHelper.removeChildItem(this, component, alsoDelete);
    }

    public removeChildComponents(): void {
        ChildContentHelper.removeChildComponents(this);
    }

    public destroyChildrenWithIDStartingWith(idFilter: string): void {
        ChildContentHelper.destroyChildrenWithIDStartingWith(this, idFilter);
    }

    public setChildContent(childContent: any): void {
        ChildContentHelper.setChildContent(this, childContent);
    }

    public buildChild(builder: Builder): void {
        ChildContentHelper.buildChild(this, builder);
    }

    public buildChildFragment(builder: Builder): void {
        ChildContentHelper.buildChildFragment(this, builder);
    }
}
