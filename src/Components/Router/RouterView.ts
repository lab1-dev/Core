import { Route, Lab1, Router, ERouterHistoryItem, ActiveRoute, RouterPage, RouterProps, Component} from "../../CoreExports";
import {html, render} from "lit-html";
import {container} from "tsyringe";

const nothing = () => html``;
export class RouterView extends Component implements RouterProps{

    //#region fields
    private renderNode?: HTMLElement |null;
    instantiationRoute?:string//the completeRoute where this VRouter object was instantiated
    prefix?:string;
    router?:Router;
    //#endregion

    //#region routes
    private _routes:  Route[] = [];
    get routes():  Route[] {
        return this._routes;
    }
    set routes(values:Route[]){
        this.renderNode = document.getElementById(this.id);
        for(let route of values){
            if(route.relativePath.endsWith('/'))route.relativePath= route.relativePath.slice(0, -1);//to remove the last '/', if set
            if(!route.relativePath.startsWith('/'))route.relativePath='/'+route.relativePath//to add the first '/'
        }
        if(!this.prefix){
            console.error(`prefix not set for router ${this.id}. unable to navigate!`);
            return;
        }
        this._routes = values;
        this.router=Lab1.obj.router;
        let locationPath=location.pathname + location.hash;
        this.instantiationRoute=locationPath;
        let rootRoute=this._routes.find(x=>x.relativePath=='/');
        if(rootRoute && (locationPath.trim().length==0|| locationPath.includes(this.prefix))){
            //console.log(`(VRouter:${this.id})routes set.`);
            if(location.search && location.search.length>1){
                let queryParams= JSON.parse('{"' + decodeURI(location.search.substr(1).replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}')
                //console.log('queryParams:',queryParams);
                rootRoute.queryParams=queryParams;
            }
            this.loadRelativePath(locationPath,rootRoute);
        }
    }
    //#endregion

    //#region arrow functions
    clearRenderNode=()=>render(nothing(), this.renderNode!);
    //#endregion

    //#region constructor
    constructor(props:RouterProps) {
        super(props);
        this.element = document.createElement('div') as HTMLDivElement;//todo nao alterar a tag para vrouter pq o height 100% deixa de funcionar
        if(props.id!=undefined) this.element.id=props.id;
        //todo estava assim nao sei pq. Comentei depois de remover os anchors this.element.style.position = 'absolute'
        this.element.style.width='100%';
        //this.element.style.minHeight='100% !important';
        this.element.style.height='100%';
        //this.element.style.backgroundColor='lightblue'
        if(props.parent)props.parent.element?.appendChild(this.element)
        Lab1.obj.addRouter(this);
    }
    //#endregion

    //#region loadRelativePath
    public loadRelativePath(completePath:string, route: Route): void {
        if(this._routes.length<1){
            console.log(`(VRouter:${this.id}) set routes before navigating`);
            return;
        }
        if(this.router?.history.getCurrent() && this.router?.history.getCurrent()?.relativePath==route.relativePath)return;//already loaded
        // window.location.href=path.search('/#')===-1 ? '#'+path:path;
        // this.renderNode.innerHTML=route.renderView();
        history.pushState({}, ""/*ignored by all browsers*/, completePath+this.createQueryParamsString(route.queryParams));
        let page=this.renderRoute(route);
        if(!page)return;
        this.router?.history.addToHistory({relativePath:route.relativePath,completePathWithoutQueryParams:completePath,routerPage:page,vRouter:this});
        //console.log(`(VRouter:${this.id})loadRelativePath: ${route.relativePath}. Rendering component id: ${page.id}`);
        render(page.element, this.renderNode!); // avoided innerHTML
    }
    //#endregion

    //#region renderRoute
    private renderRoute(route:Route) :Component | null{
        //console.log('(Route)renderView', this.view)
        if(route.constructor.name == 'AsyncFunction'){
            route.routerPage().then((viewClass:any) => new viewClass(route.queryParams))
        }else {
            //console.log('(VRouter)renderRoute. instantiating component...')
            render(nothing(),this.renderNode!);
            let activeRoute=new ActiveRoute();
            if(route.queryParams) activeRoute.queryParams=new Map(Object.entries(route.queryParams));
            if(route.internalParams) activeRoute.internalParams=new Map(Object.entries(route.internalParams));
            Lab1.obj.currentRouterView=this;
            container.registerInstance(ActiveRoute,activeRoute)
            const component=container.resolve<RouterPage>(route.routerPage)
            //container.clearInstances();//isso limpa os singletons também.
            Lab1.obj.currentRouterView=undefined;
            component.onAfterRender(true);
            return component;
        }
        console.error(`unable to render route ${route.relativePath}`);
        return null;
    }
    //#endregion

    //#region createQueryParamsString
    private createQueryParamsString(queryParams?:object):string{
        if(!queryParams)return '';
        let result='';
        let isFirstParam=true;
        for (const [key, value] of Object.entries(queryParams)) {
            if(isFirstParam){
                result='?';
                isFirstParam=false;
            } else result+='&';
            result+=key+'=';
            result+=value;
        }
        let encodedString=encodeURI(result);
        return encodedString;
    }
    //#endregion

    //#region reloadPrevious
    reloadPrevious(previous:ERouterHistoryItem){
        //console.log(`(VRouter:${this.id})reloadPrevious. Relative path: ${previous.relativePath}. ComponentBase id: ${previous.routerPage.id}`);
        render(previous.routerPage?.element, this.renderNode!);
    }
    //#endregion
}



