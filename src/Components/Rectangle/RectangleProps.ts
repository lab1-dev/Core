import {ComponentProps} from "../Item/ComponentProps";
import {EBorderProps, TypeNumberOrUndefined, TypeNumberStringOrUndefined, TypeSignal_MouseEvent, TypeStringOrUndefined} from "../../CoreExports";

export interface RectangleProps extends ComponentProps {
    border?:TypeNumberStringOrUndefined
    borderStyle?:TypeStringOrUndefined
    borderColor?:TypeStringOrUndefined
    borderRadius?:TypeNumberStringOrUndefined
    borderWidth?:TypeNumberStringOrUndefined
    elevation?: TypeNumberOrUndefined

    //Signals
    onClick?:TypeSignal_MouseEvent
}
