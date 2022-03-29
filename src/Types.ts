import {Component, HorizontalAlign, DateTime, DayOfWeek, TimeSpan, TextAlign, Property, Align, RowLayoutAlignSelf, ColumnLayoutAlignSelf, GridLayoutAlignSelf} from "./CoreExports";
import {Signal} from "typed-signals";
import {Anchor} from "./Enums/Anchor";
import {Wrap} from "./Enums/Wrap";

//components props types
export type {ComponentProps} from "./Components/Item/ComponentProps"
export type {AnchorLayoutProps} from "./Components/AnchorLayout/AnchorLayoutProps"
export type {EBorderProps} from "./Entities/EBorderProps"
export type {ButtonProps} from "./Components/Button/ButtonProps"
export type {ColumnLayoutProps} from "./Components/ColumnLayout/ColumnLayoutProps"
export type {DivProps} from "./Components/Div/DivProps"
export type {ElseProps} from "./Components/Else/ElseProps"
export type {ForProps} from "./Components/For/ForProps"
export type {GridLayoutProps} from "./Components/GridLayout/GridLayoutProps"
export type {IfProps} from "./Components/If/IfProps"
export type {ImageProps} from "./Components/Image/ImageProps"
export type {InputProps} from "./Components/Input/InputProps"
export type {LabelProps} from "./Components/Label/LabelProps"
export type {LayoutProps} from "./Components/Layout/LayoutProps"
export type {LiProps} from "./Components/Li/LiProps"
export type {PProps} from "./Components/P/PProps"
export type {RectangleProps} from "./Components/Rectangle/RectangleProps"
export type {RouterProps} from "./Components/Router/RouterProps";
export type {RouterPageProps} from "./Components/RouterPage/RouterPageProps"
export type {RowLayoutProps} from "./Components/RowLayout/RowLayoutProps"
export type {SpacerProps} from "./Components/Spacer/SpacerProps"
export type {SpanProps} from "./Components/Span/SpanProps"
export type {WindowProps} from "./Components/Window/WindowProps"
export type {SectionItemProps} from "./Components/SectionItemProps"

//codes types
export type {Lab1Props} from "./Codes/Lab1/Lab1Props"

//codes component props types
export type TypeAlign = Property<Align> | Align
export type TypeRowLayoutAlignSelf = Property<RowLayoutAlignSelf> | RowLayoutAlignSelf
export type TypeColumnLayoutAlignSelf = Property<ColumnLayoutAlignSelf> | ColumnLayoutAlignSelf
export type TypeGridLayoutAlignSelf = Property<GridLayoutAlignSelf> | GridLayoutAlignSelf
export type TypeWrap = Property<Wrap> | Wrap
export type TypeAlignOrUndefined = Property<Align> | Property<Align | undefined> | Align
export type TypeAnchor = Property<Anchor> | Anchor
export type TypeAny = Property<any> | any
export type TypeAnyList = Property<any[]> | any[]
export type TypeBoolean = Property<boolean> | boolean
export type TypeBooleanOrUndefined = Property<boolean | undefined> | Property<boolean> | boolean
export type TypeComponentBaseOrUndefined = Property<Component | undefined> | Property<Component> | Component
export type TypeDateTimeOrUndefined = Property<DateTime | undefined> | Property<DateTime> | DateTime
export type TypeDayOfWeekOrUndefined = Property<DayOfWeek | undefined> | Property<DayOfWeek> | DayOfWeek
export type TypeDocumentFragment = Property<DocumentFragment | undefined> | DocumentFragment
export type TypeHorizontalAlignOrUndefined = Property<HorizontalAlign | undefined> | HorizontalAlign
export type TypeItemList = Property<Component[]> | Component[]
export type TypeItemOrUndefined = Property<Component | undefined> | Property<Component> | Component
export type TypeNumber = Property<number> | number
export type TypeNumberList = Property<number[]> | number[]
export type TypeNumberOrString = Property<number | string> | Property<number> | Property<string> | number | string
export type TypeNumberOrUndefined = Property<number> | Property<number | undefined> | number
export type TypeNumberStringOrUndefined = Property<number> | Property<number | undefined> | Property<string | undefined> | Property<number | string | undefined> | number | string
export type TypeReadOnlyArrayOrUndefined<T> = Property<ReadonlyArray<T> | undefined> | Property<ReadonlyArray<T>> | ReadonlyArray<T>
export type TypeSetT<T> = Property<Set<T>> | Set<T>
export type TypeString = Property<string> | string
export type TypeStringOrUndefined = Property<string | undefined> | Property<string> | string
export type TypeTextAlign = Property<TextAlign> | TextAlign
export type TypeTOrUndefined<T> = Property<T | undefined> | Property<T> | T
export type TypeTList<T> = Property<T[]> | T[]
export type TypeTimeSpanOrUndefined = Property<TimeSpan | undefined> | Property<TimeSpan> | TimeSpan

//signals types
export type TypeSignal_MouseEvent = (Signal<(ev: MouseEvent) => void>) | ((ev: MouseEvent) => void)
export type TypeSignal_T<T> = (Signal<(value: T) => void>) | ((value: T) => void)
export type TypeSignal_Boolean = (Signal<(value: boolean) => void>) | ((value: boolean) => void)
export type TypeSignal_Number = (Signal<(value: number) => void>) | ((value: number) => void)
export type TypeSignal_String = (Signal<(txt: string) => void>) | ((txt: string) => void)
export type TypeSignal_NumberOrUndefined = (Signal<(value: number | undefined) => void>) | ((value: number | undefined) => void)
export type TypeSignal_Any = (Signal<(value: any) => void>) | ((value: any) => void)

//entities types

//interface types
export type {IComponent} from "./Interfaces/IComponent"
export type {Builder} from "./Interfaces/Builder"
export type {PlaceHolder} from "./Interfaces/PlaceHolder"
