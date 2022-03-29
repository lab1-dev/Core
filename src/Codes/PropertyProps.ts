import {BindMode} from "../Enums/BindMode";

export interface PropertyProps<T> {
    bindMode?: BindMode
    renderOnChange?: boolean
    customSetter?: (value: T) => void
    customGetter?: () => T
}
