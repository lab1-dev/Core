import {service} from "../Decorators/ServiceDecorator";

@service()
export class ActiveRoute {
    queryParams = new Map<string, string>();
    internalParams = new Map<string, any>();

    constructor() {
    }

}
