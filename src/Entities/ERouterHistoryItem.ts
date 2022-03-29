import {RouterView, RouterPage} from "../CoreExports";

export class ERouterHistoryItem{
    completePathWithoutQueryParams:string='';
    relativePath:string='';
    queryParams?:object;
    routerPage?:RouterPage;
    vRouter?:RouterView;
    isFirstRouteLoadedInVRouter?=false;
}

