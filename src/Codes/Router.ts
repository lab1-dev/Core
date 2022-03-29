import {RouterView} from "../Components/Router/RouterView";
import * as path from "path";
import {html, render} from "lit-html";
import {RouterHistory, Route} from "../CoreExports";
import {singleton} from "tsyringe";
import {ElementHelper} from "../Helpers/ElementHelper";

const nothing = () => html``;
@singleton()
export class Router{

    //#region fields
    private _vRouters:RouterView[]=[]
    public history=new RouterHistory();
    //#endregion

    //#region constructor
    constructor() {
        document.addEventListener("DOMContentLoaded", (ev) => this.onDomContentLoaded(ev));
        //todo window.addEventListener("_pushstate", (e: any) => this.loadPath(e.detail));
        window.onpopstate = (ev: PopStateEvent) => this.onWindowPoped(ev);
    }
    //#endregion

    //#region arrow functions
    public addRouter(router:RouterView){
        //console.log('adding router to list: ',router.id);
        this._vRouters.push(router);
    }
    //#endregion

    //#region onDomContentLoaded - the browser fully loaded HTML, and the DOM tree is built, but external resources like pictures and stylesheets may not yet have loaded.
    private onDomContentLoaded(ev: any): void {
        //console.log('(Router)onDomContentLoaded');
        // for(let historyItem of this.history.historyItems){
        //     let page=historyItem.routerPage as VRouterPage;
        //     for(let component of page.children){
        //         component.onLoaded();
        //     }
        // }
        let routerLinks = Array.from(document.querySelectorAll("[route]"));//todo - maybe remove this
        for (let i = 0; i < routerLinks.length; i++) {
            let routerLink = routerLinks[i] as HTMLElement
            routerLink.onclick = (ev: any) => this.onRouterLinkClicked(ev);
        }
    }
    //#endregion

    //#region onRouterLinkClicked - When user clicks on a <button route="/someRoute">Text</button>
    private onRouterLinkClicked(ev: any): void {
        ev.preventDefault();
        let route = ev.target.getAttribute("route")
        console.log('(Router)onRouterLinkClicked. Navigating to:', route);
        //this.loadPath(route);
    }
    //#endregion

    //#region onWindowPoped - fired on: window.onpopstate
    private onWindowPoped(ev: PopStateEvent): void {
        //console.log('(Router)onWindowPoped. Current location: ', document.location.pathname + ", state: " + JSON.stringify(ev));
        let previous=this.history.getPrevious();
        if(!previous){
            console.log('no more previous');
            history.go(-1);//loads another website
            return;
        }
        let current=this.history.getCurrent();
        if(current?.isFirstRouteLoadedInVRouter)current?.vRouter?.clearRenderNode();
        if(current?.vRouter!=previous.vRouter){
            //console.log('previous is in other router. Current:',current.vRouter.id);
            let previousItemInCurrentVRouter=this.history.getVRouterPrevious(current?.vRouter!);
            //console.log('previous is ',previousItemInCurrentVRouter.routerPage.id)
            current?.vRouter?.reloadPrevious(previousItemInCurrentVRouter!);
            // current.vRouter.reloadPrevious(previous);
            this.history.removeCurrent();
        }else {
            this.history.removeCurrent();
            previous?.vRouter?.reloadPrevious(previous);
        }
    }
    //#endregion

    //#region match - called from navigateToRoute to find the correct Route element
    private match(route: Route, requestPath: string): RegExpMatchArray {
        let paramNames: string[] = [];
        let regexPath = route.relativePath.replace(/([:*])(\w+)/g, (full, colon, name) => {
            paramNames.push(name);
            return "([^/]+)";
        }) + "(?:/|$)";
        let parameters: any = {};
        //match the requested path with regex
        let routeMatch = requestPath.match(new RegExp(regexPath));
        if (routeMatch !== null) {
            parameters = routeMatch.slice(1).reduce((params, value, index) => {
                if (params === null) parameters = {};
                parameters[paramNames[index]] = value;
                return parameters;
            }, null);
        }
        //todo recolocar route.setParameters(parameters);//set the props of the route
        return routeMatch!;
    }
    //#endregion

    //#region navigate
    public navigate(completeRoutePath:string, queryParams?:object, internalParams?:object):void{
        if(completeRoutePath.length>1&&completeRoutePath.endsWith('/'))completeRoutePath=completeRoutePath.slice(0, -1);//to remove the last '/' if any
        //let prefixes=this.getAllPrefixesinUrl(completeRoutePath);
        let segments= completeRoutePath.split('/');
        let loadedPath='';
        for(let segment of segments){
            loadedPath='/'+segment;
            let responsibleVRouter=this._vRouters.find(x=>x.prefix=='/'+segment);
            if(responsibleVRouter){
                //console.log(`VRouter responsible for /${segment}: ${responsibleVRouter.id}`);
            } else {
                for(let vRouter of this._vRouters){
                    if(this.loadPathIfActivatedInVRouter(vRouter,loadedPath,queryParams,internalParams)){
                        //console.log(`${loadedPath} found`);
                        return;
                    }
                }
            }
        }
        //console.log('(Router)navigate.Search:',document.location.search,'.CompleteRoutePath:', completeRoutePath);
        for(let vRouter of this._vRouters){
             if(this.loadPathIfActivatedInVRouter(vRouter,completeRoutePath,queryParams,internalParams))return;
        }
        let appDiv=document.getElementById('app');
        ElementHelper.clearChildren(appDiv!);
        appDiv!.innerText=`404. Route ${completeRoutePath} not found`;
    }
    //#endregion

    //#region getVRouterPathActivatedByRoute
    private loadPathIfActivatedInVRouter(vRouter:RouterView, completeRoutePath:string, queryParams?:object, internalParams?:object):boolean{
        //console.log(`checking completeroute ${completeRoutePath} in vrouter ${vRouter.id}` );
        for(let route of vRouter.routes){
            if(!completeRoutePath.includes(vRouter.prefix!))continue;
            let completeVRouterPath='';
            if(vRouter.prefix!='/')completeVRouterPath=vRouter.prefix!;
            if(route.relativePath!='/')completeVRouterPath+=route.relativePath;
            if(!completeRoutePath.includes(completeVRouterPath))continue;
            if(completeRoutePath!=completeVRouterPath)continue//todo remover. É que /menu/material estava sendo ativado em /menu/material2
            route.queryParams=queryParams;
            route.internalParams=internalParams;
            vRouter.loadRelativePath(completeRoutePath, route)
            return true;
        }
        return false;
    }
    //#endregion
}

/*
Router Example:
mainRouter
    prefix: '/'
    routes:
        {name:"", path:"/", view:PageLogin},
        {name:"", path:"/menu", view:PageMenu},
        {name:"", path:"/about", view:PageAbout},

subRouter
    prefix:'/menu'
    routes:
        {name:"anchors", path:"/anchors", view:PageAnchors},
        {name:"material", path:"/material", view:PageMaterial},
        {name:"bootstrap", path:"/bootstrap", view:PageBootstrap},
        {name:"row-layout", path:"/row-layout", view:PageRowLayout},

Actions:
    when route=/about
        - mainRouter loads PageAbout
        - subRoute is not activated.
    when route=/menu
        - mainRouter loads PageMenu
        - subRouter is not activated
    when route=/menu/material
        - mainRouter loads PageMenu (if not loaded)
        - subRouter loads PageMaterial
 */
