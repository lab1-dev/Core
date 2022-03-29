import {Component, Property} from "../CoreExports";
import {Signal} from "typed-signals";

export class PropertyHelper {

    /**
     * Reads all prop fields passed to the constructor of the component and write them into the Property associated.
     * Props are read once in the constructor and never used again. Since then, the associated Property object is used to read/write.
     * @param component The component that contains the props to be read
     * @param props Properties or simple fields (not using Property) that are passed to the constructor of the component.
     */
    public static readProperties(component: Component, props: any): void {
        let propNames = Object.keys(props);
        //prop callbacks -> signal bindings
        for (let propName of propNames) {
            if (typeof props[propName] !== 'function') continue;//not a callback
            if ((component as any)[propName] == undefined) {
                console.warn(`Signal ${propName} not implemented in class ${component.constructor.name}`);
                continue;
            }
            if (!((component as any)[propName] instanceof Signal)) continue;
            let signal = (component as any)[propName] as Signal<any>
            let callback = props[propName];
            //console.log(`callback received for signal ${component.completeID}.${propName}:`, callback);
            (signal as any).connect((...args: any) => (callback as any)(...args));
        }

        //let's copy all props received in the constructor to their Property objects
        for (let propName of propNames) {
            if (typeof props[propName] === 'function') continue;//it's a callback, not a property
            //let's ignore properties handled by Component class
            if (this.isHandledByComponentClass(propName)) continue;
            if ((component as any)[propName] == undefined) {
                if (propName !== 'ref' && propName !== 'ownerComponent') console.warn(`Property ${propName} not implemented in class ${component.constructor.name}`);
                continue;
            }
            if (!((component as any)[propName] instanceof Property)) {//component.propName is not a Property. It's a regular class field
                //console.log(component.completeID + '.' + propName + ' is not a property');
                (component as any)[propName]=props[propName];//(component as any).propName does not work.
                continue;
            }
            let itemProperty = (component as any)[propName];
            if (props[propName] instanceof Property) {//props.propName is also a Property. Let's bind one Property to another Property
                itemProperty.bindTo(props[propName]);
            } else itemProperty.value = props[propName];//props.propName is not Property, but component.propName is. We set the value
        }
    }

    /**
     * Returns true if the prop is read by Component class
     * @param propName The name of the prop
     * @protected
     */
    protected static isHandledByComponentClass(propName: string): boolean {
        switch (propName) {
            case 'element':
            case 'parent':
            case 'background':
            case 'indexToReplace':
            case 'isManaged':
            case 'anchors':
            case 'layout':
            case 'id':
            case 'internalID':
                return true;
        }
        return false;
    }

    public static readPropertyWithoutSetter(component: Component, props: any, propName: string): void {
        let propNames = Object.keys(component);
        if (props[propName] == undefined) return;
        if (props[propName] instanceof Property) return;//todo
        // @ts-ignore
        let prop: Property<any> = component[propName];
        //console.log('lendo propName:',propName);
        prop._value = props[propName];//we assign to _value to not trigger the property setter
    }
}
