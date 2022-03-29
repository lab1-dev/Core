import {constructor} from "tsyringe/dist/typings/types";
import {container, injectable} from "tsyringe";
import {component} from "../CoreExports";

export function routerPage<T>(): (target: constructor<T>) => void {

    return function(target: constructor<T>): void {
        injectable()(target);
        container.beforeResolution(target, () => {
                //console.log(target.name+ " page is about to be resolved!");
            }, {frequency: "Always"}
        );
    };
}
