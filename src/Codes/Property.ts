import {Signal, SignalConnection} from "typed-signals";
import {BindMode} from "../CoreExports";
import {PropertyProps} from "./PropertyProps";

export class Property<T> implements PropertyProps<T> {

    //region properties
    public name!: string//value set automatically by component decorator
    public bindMode = BindMode.TwoWay
    renderOnChange = true;
    customSetter?: (value: T) => void
    customGetter?: () => T
    //endregion

    //#region oldValue
    protected _oldValue: T
    get oldValue(): T {
        return this._oldValue;
    }
    //#endregion
    //#region value
    public _value: T
    get value(): T {
        if (this.referenced) {
            return this.referenced.value;
        } else {
            if (this.customGetter != undefined) {
                return this.customGetter();
            } else return this._value;
        }
    }
    set value(value: T) {
        if (this._value == value) return;
        if (this.referenced) {//we keep the reference! Do not destroy it
        }
        this._oldValue = this._value;
        if (this.customSetter != undefined) {
            this.customSetter(value);//when using customSetter, render is not called by default. Remember to check holdHender in your customSetter implementation
            this.onChange.emit(this._value);
            return;
        }
        this._value = value;
        this.onChange.emit(this._value);
        if (this.renderOnChange && !this.component.holdRender) this.component.render();
    }
    //#endregion

    //region Signals and others
    readonly onChange = new Signal<(value: T) => void>();
    protected signalEmitter?: SignalConnection
    protected referenced?: Property<T>
    public ownerItem?: any//value set by class decorator
    toString() {return (this.value as any);}
    //endregion

    constructor(public component: any, initialValue: T, props: PropertyProps<T> | undefined = undefined) {
        this._oldValue = initialValue;
        this._value = initialValue
        if (props) {
            if (props.bindMode != undefined) this.bindMode = props.bindMode;
            if (props.customSetter != undefined) this.customSetter = props.customSetter;
            if (props.customGetter != undefined) this.customGetter = props.customGetter;
        }
    }

    public bindTo(refValue: Property<T>): void {
        if (this.referenced == refValue) return;
        this.referenced = refValue
        this.signalEmitter = refValue.onChange.connect((newValue) => this.onRefValueChanged(refValue.oldValue, newValue));
        this.onChange.emit(this._value)
    }

    public setValueOrProperty(value: T | Property<T>): void {
        let isProperty = value instanceof Property;
        if (this.referenced /*&& this.bindMode==BindMode.OneWay */ && !isProperty) {
            console.debug(`unable to set value ${value}for property, since it's using OneWay bindMode`);
            return;
        }
        if (!isProperty) this.value = value as T;
        else this.bindTo(value as Property<T>);
    }

    private onRefValueChanged(oldValue: T, value: T): void {
        this._oldValue = this._value
        this.value = value
        this.onChange.emit(this.value)

        //the code below was not calling the customsetter
        // if(this.renderOnChange && !this.component.holdRender){
        //     //console.log(this.component.id,'.new value:',value);
        //     this.component.render();
        // }
    }
}
