import type {ImageProps} from "../../CoreExports";
import {Component} from "../../CoreExports";

export class Image extends Component implements ImageProps{

    // //region className
    // get className(): string {
    //     return this.element!.className;
    // }
    // set className(value: string) {
    //     this.element!.className=value;
    // }
    // //endregion
    // //#region style
    // private _style: string=''
    // get style(): string {
    //     return this._style;
    // }
    // set style(value:string){
    //     if(this._style===value)return;
    //     this._style=value;
    //     this.element!.style.cssText=value;
    // }
    // //#endregion
    //region src
    private _src?:string
    get src(): string|undefined {
        return this._src;
    }
    set src(value: string|undefined) {
        if(this._src===value)return;
        this._src = value;
        (this.element! as HTMLImageElement).src=value??'';
    }
    //endregion
    //region alt
    private _alt?:string
    get alt(): string |undefined{
        return this._alt;
    }
    set alt(value: string|undefined) {
        if(this._alt===value)return;
        this._alt = value;
        (this.element! as HTMLImageElement).alt=value??'';
    }
    //endregion

    constructor(props:ImageProps) {
        super({...<Partial<ImageProps>>{element:document.createElement('img')}, ...props});
        if (!this.element) return;


        //Image properties
        this.readProperties(props);
        if(props.src!=undefined) this.src=props.src;
        if(props.alt!=undefined) this.alt=props.alt;

        this.render(true);
    }

    render(firstRender: boolean = false) {
        super.render(firstRender);

        if(this.className.value!=undefined) this.element!.className=this.className.value;
        if(this.style.value!=undefined) this.element!.style.cssText=this.style.value;
    }
}
