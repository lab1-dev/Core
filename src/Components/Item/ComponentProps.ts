import {Component, TypeAnchor, TypeAny, TypeBoolean, TypeColumnLayoutAlignSelf, TypeGridLayoutAlignSelf, TypeHorizontalAlignOrUndefined, TypeNumber, TypeNumberOrUndefined, TypeNumberStringOrUndefined, TypeRowLayoutAlignSelf, TypeString, TypeStringOrUndefined} from "../../CoreExports";

export interface ComponentProps {
    /**HTML id attribute for the component.*/
    id?: string
    /*Optional field. Useful when you do not want to expose the id to the DOM. By default, is undefined.**/
    internalID?: string
    key?: TypeStringOrUndefined
    /*Reference of this component. The reference is used in Managed TS and Managed TSX. Use it with @ref decorator.**/
    ref?: any
    /*Anchors is an attached property used when placing components inside AnchorsLayout.**/
    anchors?: TypeAnchor
    /**User class names, separated by space.*/
    className?: TypeStringOrUndefined
    /**User styles, applied on top of the component's own classes and styles.*/
    style?: TypeStringOrUndefined
    tabIndex?: TypeNumberOrUndefined
    /**Use Tag to attach any user data object to the component for your convenience.*/
    tag?: Object
    /**Width of this component. It's a shorcut for element.style.width. Numbers or strings are allowed. Ex: width:144, width:'144px', width:'22%' */
    width?: TypeNumberStringOrUndefined
    /**Minimum Width of this component. It's a shorcut for element.style.minWidth. Numbers or strings are allowed. Ex: minWidth:144, minWidth:'144px', minWidth:'22%' */
    minWidth?: TypeNumberStringOrUndefined
    /**Maximum Width of this component. It's a shorcut for element.style.maxWidth. Numbers or strings are allowed. Ex: maxWidth:144, maxWidth:'144px', maxWidth:'22%' */
    maxWidth?: TypeNumberStringOrUndefined
    /**Height of this component. It's a shorcut for element.style.height. Numbers or strings are allowed. Ex: height:144, height:'144px', height:'22%' */
    height?: TypeNumberStringOrUndefined
    /**Minimum Height of this component. It's a shorcut for element.style.minHeight. Numbers or strings are allowed. Ex: minHeight:144, minHeight:'144px', minHeight:'22%' */
    minHeight?: TypeNumberStringOrUndefined
    /**Maximum Height of this component. It's a shorcut for element.style.maxHeight. Numbers or strings are allowed. Ex: maxHeight:144, maxHeight:'144px', maxHeight:'22%' */
    maxHeight?: TypeNumberStringOrUndefined
    /*Horizontal alignment of this component. This property cannot be used inside a ColumnLayout, RowLayout or GridLayout.**/
    horizontalAlign?: TypeHorizontalAlignOrUndefined
    /*
    * By default, each Property call render function whenever a property changes. Setting this property to true is useful when changing several properties at once,
    * so this prevents the component from caling render on each property change. After all properties are changed, you call render() manually to reflect all changes at once.
    **/
    holdRender?: boolean
    /**Background color of this component. It's a shortcut for element.style.backgroundColor*/
    backgroundColor?: TypeStringOrUndefined
    /**Background image of this component. It's a shortcut for element.style.backgroundImage*/
    backgroundImage?: TypeStringOrUndefined
    visible?: TypeBoolean
    display?: TypeString
    children?: any[]
    /**Child content of component.*/
    childContent?: TypeAny
    element?: HTMLElement
    parent?: Component
    indexToReplace?: number
    isManaged?: boolean

    x?: number
    y?: number
    z?: number
    opacity?: number

    /**
     * UserAttributes carries all attributes you add to the component that don't match any of its parameters.
     * They will be splatted onto the underlying HTML tag.
     */
    userAttributes?: NamedNodeMap//todo remover

    //Margin - overrides the value defined in style
    margin?: TypeNumberStringOrUndefined
    marginTop?: TypeNumberStringOrUndefined
    marginBottom?: TypeNumberStringOrUndefined
    marginLeft?: TypeNumberStringOrUndefined
    marginRight?: TypeNumberStringOrUndefined

    //Padding - overrides the value defined in style
    padding?: TypeNumberStringOrUndefined
    paddingTop?: TypeNumberStringOrUndefined
    paddingBottom?: TypeNumberStringOrUndefined
    paddingLeft?: TypeNumberStringOrUndefined
    paddingRight?: TypeNumberStringOrUndefined

    //RowLayout attached properties
    rowLayoutAlignSelf?: TypeRowLayoutAlignSelf
    rowLayoutGrow?: TypeNumberOrUndefined

    //ColumnLayout attached properties
    columnLayoutAlignSelf?: TypeColumnLayoutAlignSelf
    columnLayoutGrow?: TypeNumberOrUndefined

    //GridLayout attached properties
    gridLayoutRowSpan?: TypeNumber
    gridLayoutColumnSpan?: TypeNumber
    gridLayoutAlignSelf?: TypeGridLayoutAlignSelf
}
