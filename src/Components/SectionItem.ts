import {Component, SectionItemProps, IComponent, Lab1} from "../CoreExports";

export class SectionItem extends Component implements SectionItemProps {

    //region fields
    ownerComponent?:Component//owner component is the component where the tsx was written
    //endregion

    constructor(props: SectionItemProps) {
        super(props);
        this.readProperties(props,true)
        this.ownerComponent=props.ownerComponent;
        this.parent?.addChildComponent(this);//todo coloquei aqui pq tem uma checagem no ComponentBase.ts se tem element antes e nem chega nesta parte no construtor do ComponentBase.ts
    }

    render(firstRender: boolean = false): void {
        //not used
    }

    public addChildComponent(component: Component): void {
        //this.log(`addChildItem: ${component.name}`);
        component._parent = this;
        this.children.push(component);
        //SectionItem is just a section holder, we add the component into the parent instead
        this.parent?.addChildComponent(component);
    }

    /**
     * Sets the initial content managed by this SectionItem.
     * All remaining render calls use setContent instead
     * @param tsxComponent
     */
    public setContent(tsxComponent:IComponent| IComponent[]):void{
        Lab1.obj.log(`(SectionItem)setContent. Key name: ${this.key}. ParentItem: ${this.parent!.constructor.name}`);
        if(Array.isArray(tsxComponent)) {//Ex: many tsxComponents created using the code embedded in tsx, like: {this.cars.map((car, i) =><CheckBox...
            Lab1.obj.createOrUpdateOrReplaceArrayOfItems(this, this,0,tsxComponent as any, true,0);
        }else Lab1.obj.createOrUpdateOrReplaceItem(this,this,0,tsxComponent as IComponent,true,0);
    }
}
