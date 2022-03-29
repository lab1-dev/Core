import {ComponentProps, Div, TypeBoolean,  TypeSignal_MouseEvent, TypeStringOrUndefined} from "../../CoreExports";

export interface DivProps extends ComponentProps {
    ref?:Div
    position?: string
    disabled?: TypeBoolean
    role?:TypeStringOrUndefined

    //events
    onClick?: TypeSignal_MouseEvent
    onMouseUp?:TypeSignal_MouseEvent
    onMouseDown?:TypeSignal_MouseEvent
    onMouseOver?:TypeSignal_MouseEvent
    onMouseEnter?:TypeSignal_MouseEvent
    onMouseLeave?:TypeSignal_MouseEvent
    onFocusOut?:TypeSignal_MouseEvent
}
