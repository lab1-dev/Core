import {ComponentProps, TypeSignal_MouseEvent, TypeString, TypeStringOrUndefined, TypeTextAlign} from "../../CoreExports";

export interface LabelProps extends ComponentProps{
    text?:TypeString
    textAlign?: TypeTextAlign
    font?:TypeString
    fontWeight?:TypeString
    color?:TypeStringOrUndefined

    //Signals
    onClick?: TypeSignal_MouseEvent
}
