import {IComponent} from "../Interfaces/IComponent";

declare namespace JSX {
    // The return type of our JSX Factory
    type Element = IComponent;
    type Tag = keyof JSX.IntrinsicElements;

    interface IntrinsicElements extends IComponent {
    }


    // The following are custom types, not part of TS's known JSX namespace:
    type IntrinsicElementMap = {
        [K in keyof HTMLElementTagNameMap]: {
            [k: string]: any
        }
    }

    interface Component {
        (properties?: { [key: string]: any }, children?: Node[]): Node
    }
}

export function tsx<T extends JSX.Tag = JSX.Tag>(tag: T, attributes: { [key: string]: any } | null, ...children: IComponent[]): JSX.Element
export function tsx(tag: JSX.Component, attributes: Parameters<typeof tag> | null, ...children: IComponent[]): IComponent
export function tsx(tag: JSX.Tag | JSX.Component, attributes: { [key: string]: any } | null, ...children: IComponent[]) {
    let tsxComponent:IComponent={children:children,tag:tag};
    if (typeof tag === 'function') {
        let className=tag.prototype.constructor.name;
        tsxComponent.className=className;
        if(!attributes){
            return tsxComponent;
        }
        tsxComponent.attributes=attributes;
    }else{
        //console.log('(jsx)not function')
    }
    return tsxComponent;
}
