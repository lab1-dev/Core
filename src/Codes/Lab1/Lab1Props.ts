import {RouterView} from "../../CoreExports";

export interface Lab1Props {
    /**Useful for debugging only. If true, displays all attributes received prior to create/update/remove Managed objects. Default: false*/
    dumpManagedAttributes?:boolean
    /**Useful for debuging only. If true, displays all operations executed during creation, update or removal of Managed objects. This happens after reading managed attributes from jsx or managed ts. Default: false*/
    dumpManagedUpdates?:boolean;
    vRouter:RouterView;
    /**Default: false*/
    captureLogs?:boolean
}
