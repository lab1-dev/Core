import {render} from "lit-html";
import {WindowProps} from "./WindowProps";
import {Component, Property} from "../../CoreExports";

//Remember: Only one element on document allowed
export class Window extends Component implements WindowProps{

  constructor(props:WindowProps) {
    super(props);
    this.element=document.createElement('div') as HTMLDivElement;
    this.element.id=this.id;
    this.element.style.width='100%'
    this.element.style.minHeight='100vh';
    // this.element.style.minHeight='100vh';
    // this.width.value=document.documentElement.clientWidth;//window width excluding scrollbars
    // this.height.value=document.documentElement.clientHeight;//window height excluding scrollbars
    let renderNode: HTMLElement|null = document.getElementById("app");
    //renderNode.appendChild(this.element);
    if(!renderNode){
      console.error('DOM element with id app not found');
      return;
    }
    render(this.element, renderNode);
    window.onresize=(ev:UIEvent)=>this.onWindowResized(ev);
  }

  public render(firstRender: boolean = false):void {
    super.render(firstRender);

    if(!this.element)return;
    // this.element.style.width=this.width.value+'px'
    // this.element.style.height=this.height.value+'px'
    if(this.backgroundColor.value) this.element.style.backgroundColor=this.backgroundColor.value;
  }

  onWindowResized(ev:UIEvent){
    //console.log('window resized');
    // if(this.width.value!==document.documentElement.clientWidth) {
    //   this.width.value=document.documentElement.clientWidth;
    // }
    // if(this.height.value!==document.documentElement.clientHeight) {
    //   this.height.value=document.documentElement.clientHeight;
    // }
  }
}
