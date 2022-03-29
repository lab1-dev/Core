import {ComponentProps, TypeString, TypeStringOrUndefined, TypeTextAlign} from "../../CoreExports";

export interface LabelProps extends ComponentProps{
    text?:TypeString
    textAlign?: TypeTextAlign
    font?:TypeString
    fontWeight?:TypeString
    color?:TypeStringOrUndefined
}
