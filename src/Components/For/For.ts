import {Component} from "../../CoreExports";
import type {ForProps} from "../../CoreExports";
import {Property} from "../../Codes/Property";

export class For extends Component implements ForProps{

    //region properties
    readonly start = new Property<number>(this, 0);
    readonly end = new Property<number>(this, -1);
    readonly step = new Property<number>(this, 1);
    //endregion

    constructor(props:ForProps) {
        super(props);
        //if (props.condition != undefined) this.condition = props.condition;
        this.parent?.addChildComponent(this);//todo coloquei aqui pq tem uma checagem no ComponentBase.ts se tem element antes e nem chega nesta parte no construtor do ComponentBase.ts
    }

    public render(firstRender: boolean = false):void{
        super.render(firstRender);
    }

    public addChildComponent(component: Component): void {
        console.log(`(For)addChildItem: ${component.constructor.name}.${component.uniqueID}`);
        component._parent = this;
        this.children.push(component);

        //If is just a section holder without element, let's add the component into the parent
        this.parent?.addChildComponent(component);
    }
}
