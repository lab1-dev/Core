import {Component} from "../Components/Item/Component";
import {EBorderProps} from "./EBorderProps";

export class EBorder implements EBorderProps {

    //#region border
    private _border?: string;
    get border(): string | undefined {
        return this._border;
    }
    set border(value: string | undefined) {
        if (!this.component.element || this._border == value) return;
        this._border = value;
        if (!value) this.component.element.style.border = 'none';
        else this.component.element.style.border = value;
    }
    //#endregion
    //#region borderWidth
    private _width: number = 0
    get width(): number {
        return this._width;
    }
    set width(value: number) {
        if (!this.component.element || this._width == value) return;
        this._width = value;
        this.component.element.style.borderWidth = value + 'px';
    }
    //#endregion
    //#region borderColor
    private _color?: string;
    get color(): string | undefined {
        return this.component.element!.style.borderColor;
    }
    set color(value: string | undefined) {
        if (!this.component.element || this._color == value) return;
        this._color = value;
        if (!value) this.component.element.style.borderColor = 'transparent'
        else this.component.element.style.borderColor = value;
    }
    //#endregion
    //#region borderRadius
    private _radius?: string;
    get radius(): string | undefined {
        return this._radius;
    }
    set radius(value: string | undefined) {
        if (!this.component.element || this._radius == value) return;
        this._radius = value;
        if (!value) this.component.element.style.borderRadius = '0'
        else this.component.element.style.borderRadius = value;
    }
    //#endregion

    constructor(private component: Component) {
    }

    setValues(props: EBorderProps) {
        if (props.width != undefined) this.width = props.width;
        if (props.color != undefined) this.color = props.color
        if (props.radius != undefined) this.radius = props.radius;
    }
}
