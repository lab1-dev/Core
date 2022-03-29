import {ComponentProps, TypeBoolean, TypeSignal_MouseEvent, TypeString, TypeStringOrUndefined} from "../../CoreExports";

export interface ButtonProps extends ComponentProps{
    /**If true, the button will be disabled.*/
    disabled?: TypeBoolean
    type?:TypeString
    onClick?: TypeSignal_MouseEvent
    ariaLabel?:TypeStringOrUndefined
}
