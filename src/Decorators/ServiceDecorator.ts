import {constructor} from "tsyringe/dist/typings/types";
import {container, injectable, singleton} from "tsyringe";

export function service<T>(): (target: constructor<T>) => void {
    return function(target: constructor<T>): void {
        singleton()(target);
        container.beforeResolution(target, () => {
                //console.log(target.name+ " service is about to be resolved!");
            }, {frequency: "Always"}
        );
    };
}
