import {LayoutProps, RowLayout, TypeAlign, TypeNumberOrUndefined, TypeWrap} from "../../CoreExports";

export interface RowLayoutProps extends LayoutProps {
    ref?: RowLayout
    spacing?: TypeNumberOrUndefined
    alignChildContent?: TypeAlign
    wrap?: TypeWrap
}
