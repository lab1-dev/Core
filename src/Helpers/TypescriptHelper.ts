import {Component} from "../Components/Item/Component";
import {ILogger} from "../Interfaces/ILogger";

export class TypescriptHelper {
    static classOf<T>(o: T): any {
        // @ts-ignore
        return o.constructor;
    }

    static implementsILogger(obj: any): boolean {//todo not detecting arrow functions
        if (typeof obj['onStopLogging'] === "function") return true;
        if ('onStopLogging' in obj) return true;
        return false;
    }

    static create<T>(ctor: { new(): T }) {
        return new ctor();
    }
    //var c = create(MyClass); // c: MyClass

    static isReallyInstanceOf<T>(ctor: { new(...args: any[]): T }, obj: T) {
        return obj instanceof ctor;
    }

    static delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    //todo ver se serve pra alguma coisa
    static nameof<T>(name: keyof T) {
        return name;
    }

    static getFunctionArguments(func: any): any[] {
        if(typeof func!=='function'){
            console.warn('not a function');
            return [];
        }
        let stripCommentsRegex = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        let argumentNamesRegex = /([^\s,]+)/g;
        let fnStr = func.toString().replace(stripCommentsRegex, '');
        let args = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(argumentNamesRegex);
        if (args === null) args = [];
        return args;
    }
}
