import {Component,IfProps,Property} from "../../CoreExports";

//todo recolocar @NewLab1ComponentDecorator
export class If extends Component implements IfProps{

    //region properties
    readonly condition = new Property<boolean>(this, false);
    //endregion

    constructor(props:IfProps) {
        super(props);
        this.readProperties(props,true);
        console.log(`(If)constructor. Condition: ${this.condition}`);
        this.parent?.addChildComponent(this);//todo coloquei aqui pq tem uma checagem no ComponentBase.ts se tem element antes e nem chega nesta parte no construtor do ComponentBase.ts
    }

    render(firstRender:boolean=false):void{
        console.log('(If)render. FirstRender:',firstRender)
    }

    public addChildComponent(component: Component): void {
        //console.log(`(If)addChildItem: ${component.name}`);
        component._parent = this;
        this.children.push(component);

        //If is just a section holder without element, let's add the component into the parent
        this.parent?.addChildComponent(component);
    }

    removeChildComponents():void{
        console.log('(If)destroyChildren');
        for(let child of this.children){
            this.parent?.removeChildComponent(child,true);
        }
        this.children=[];
    }
}
