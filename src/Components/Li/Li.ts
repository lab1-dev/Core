import {LiProps} from "./LiProps";
import {Component} from "../../CoreExports";

export class Li extends Component implements LiProps{

    constructor(props:LiProps) {
        super({...<Partial<LiProps>>{element:document.createElement('li')}, ...props});

        //Li properties
        this.readProperties(props,true);

        //Let's write the properties into the DOM
        this.render(true);
    }

    public render(firstRender: boolean = false):void {
        super.render(firstRender);
    }
}
