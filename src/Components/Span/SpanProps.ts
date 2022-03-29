import {ComponentProps} from "../Item/ComponentProps";
import {TypeSignal_MouseEvent, TypeString} from "../../Types";

export interface SpanProps extends ComponentProps{
    innerText?:string
    innerHtml?:TypeString

    //Signals
    onClick?:TypeSignal_MouseEvent
    onMouseOver?:TypeSignal_MouseEvent
    onMouseOut?:TypeSignal_MouseEvent
}
