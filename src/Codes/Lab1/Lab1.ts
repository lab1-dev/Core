import {BaseTheme, Router, RouterView, ILogger, LogType, TypescriptHelper, SectionItem, Component, Lab1Props, Lab1Manager, Lab1Static} from "../../CoreExports";
import {container} from "tsyringe";

export class Lab1 extends Lab1Static {

    //#region obj
    private static _obj: Lab1;
    public static get obj() {
        return this._obj || (this._obj = new this());
    }
    //#endregion

    //#region fields
    baseTheme: BaseTheme = new BaseTheme();
    isCapturingLogs: boolean = false;
    router: Router;
    currentRouterView?: Component | undefined
    //#endregion

    //#region bypass functions
    addRouter = (vRouter: RouterView) => this.router.addRouter(vRouter);
    //#endregion

    private constructor() {
        super();
        this.router = container.resolve(Router);
    }

    public bootstrap(props: Lab1Props): void {

        //let's read all props
        if (props.dumpManagedAttributes != undefined) this.dumpManagedAttributes = props.dumpManagedAttributes;
        if (props.dumpManagedUpdates != undefined) this.dumpManagedUpdates = props.dumpManagedUpdates;
        if (props.captureLogs != undefined) this.isCapturingLogs = props.captureLogs;

        if (!props.vRouter) {
            console.error('please set the router to boostrap a Lab1 app');
            return;
        }
        if (props.vRouter.routes.length < 1) {
            console.error('please set router routes before calling Lab1.boostrap');
            return;
        }
        //console.log('(Lab1)boostrap. Path:', document.location.pathname)
        if (document.location.pathname != '/') {
            let queryParams = props.vRouter.routes[0].queryParams;
            console.log('(Lab1)bootstrap. App loaded outside / or page reload detected. QueryParams:', queryParams);
            Lab1.obj.router.navigate(document.location.pathname, queryParams)
        }
    }

    public dumpLogs(logType?: LogType) {
        for (let historyItem of this.router.history.historyItems) {
            let routerPage = historyItem.routerPage;
            //let objectTree=this.getObjectTreeIds(routerPage)
            //console.log(JSON.stringify(objectTree,))
            let rootObject = this.getObjectTree(routerPage!);
            this.dumpObjectTree(rootObject, logType)
        }
    }

    private getObjectTreeIds(component: Component): object {
        let result = {
            id: component.id,
            className: component.constructor.name,
            children: [] as object[]
        }
        if (component.constructor.name == 'VRouter') return result;//we do not return it's children here
        for (let childItem of component.children) {
            let childTree = this.getObjectTreeIds(childItem);
            result.children.push(childTree)
        }
        return result;
    }

    private getObjectTree(component: Component): object {
        let result = {
            id: component.id,
            obj: component,
            children: [] as object[]
        }
        if (component.constructor.name == 'VRouter') return result;//we do not return it's children here
        for (let childItem of component.children) {
            let childTree = this.getObjectTree(childItem);
            result.children.push(childTree)
        }
        return result;
    }

    private dumpObjectTree(objectTree: any, logType?: LogType) {
        this.dumpComponentLogs(objectTree.obj, logType);
        for (let child of objectTree.children) {
            this.dumpObjectTree(child, logType);
        }
    }

    private dumpComponentLogs(component: Component, logType?: LogType) {
        if (!TypescriptHelper.implementsILogger(component)) return;
        //console.log(component.id, 'dumping')
        let loggedItems = (component as unknown as ILogger).onGetLogs();
        if (loggedItems.length < 1) return;
        console.group(component.id);
        for (let logItem of loggedItems) {
            switch (logItem.logType) {
                case LogType.error:
                    console.error(logItem.content)
                    break;
                default:
                    console.log(logItem.content)
                    break;
            }
        }
        console.groupEnd();
    }

    public isMobileDevice(): boolean {
        let isMobile = Math.min(window.screen.width, window.screen.height) < 768 || navigator.userAgent.indexOf("Mobi") > -1;
        return isMobile;
    }
}
