import {ColumnLayout, LayoutProps, TypeAlign, TypeNumberOrUndefined, TypeWrap} from "../../CoreExports";

export interface ColumnLayoutProps extends LayoutProps {
    ref?: ColumnLayout
    spacing?: TypeNumberOrUndefined
    alignChildContent?: TypeAlign
    wrap?: TypeWrap
}
