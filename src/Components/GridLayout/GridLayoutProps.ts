import {GridLayout, LayoutProps, TypeAlign, TypeNumber, TypeNumberOrString} from "../../CoreExports";

export interface GridLayoutProps extends LayoutProps {
    ref?: GridLayout
    rows?: TypeNumberOrString
    columns?: TypeNumberOrString
    rowSpacing?: TypeNumber
    columnSpacing?: TypeNumber
    alignChildContent?: TypeAlign
}
