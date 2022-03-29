import {ElseProps, Component, Property} from "../../CoreExports";

export class Else extends Component implements ElseProps {

    //region properties
    readonly condition = new Property<boolean>(this, false);
    //endregion

    constructor(props: ElseProps) {
        super(props);
        this.readProperties(props,true);
        this.parent?.addChildComponent(this);//todo coloquei aqui pq tem uma checagem no ComponentBase.ts se tem element antes e nem chega nesta parte no construtor do ComponentBase.ts
    }

    render(firstRender: boolean = false): void {
        console.log('(Else)render. FirstRender:', firstRender)
    }

    public addChildComponent(component: Component): void {
        console.log(`(Else)addChildItem: ${component.internalID}`);
        component._parent = this;
        this.children.push(component);
        //Else is just a section holder with no element, let's add the component into the parent
        this.parent?.addChildComponent(component);
    }

    public removeChildComponents():void{
        console.log('(Else)destroyChildren');
        for(let child of this.children){
            this.parent?.removeChildComponent(child,true);
        }
        this.children=[];
    }
}
