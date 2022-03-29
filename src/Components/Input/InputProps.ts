import {ComponentProps} from "../Item/ComponentProps";
import {TypeBoolean, TypeBooleanOrUndefined, TypeNumberOrUndefined, TypeString, TypeStringOrUndefined, TypeTOrUndefined} from "../../Types";

export interface InputProps<T> extends ComponentProps{
    type?:TypeString
    tabIndex?:TypeNumberOrUndefined
    value?:TypeTOrUndefined<T>
    name?:TypeStringOrUndefined
    disabled?:TypeBoolean
    checked?:TypeBoolean
}
