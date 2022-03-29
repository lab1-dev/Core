import {For, ComponentProps, TypeNumber} from "../../CoreExports";

export interface ForProps extends ComponentProps{
    ref?:For
    start?:TypeNumber
    end?:TypeNumber
    step?:TypeNumber
}
