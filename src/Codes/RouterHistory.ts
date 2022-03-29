import {ERouterHistoryItem} from "../Entities/ERouterHistoryItem";
import {Component} from "../Components/Item/Component";
import {RouterView} from "../Components/Router/RouterView";

export class RouterHistory {

    historyItems=Array<ERouterHistoryItem>();

    addToHistory(historyItem:ERouterHistoryItem){
        if(!this.historyItems.find(x=>x.vRouter?.id==historyItem.vRouter?.id))historyItem.isFirstRouteLoadedInVRouter=true;
        else historyItem.isFirstRouteLoadedInVRouter=false;
        //console.log('adding to history',historyItem.routerPage.id, historyItem.vRouter.id);
        this.historyItems.push(historyItem);
        /*console.log('=====Current History stack:=====')
        for(let historyItem of this.historyItems){
            console.log(historyItem.routerPage.id, historyItem.vRouter.id);
        }
        console.log('=========================')*/
    }

    getPrevious(){
        if(this.historyItems.length>1){
            let previous=this.historyItems[this.historyItems.length-2];
            //console.log('(RouterHistory)getPreviousHistoryItem.',previous.relativePath);
            return previous;
        }
        else return null;
    }

    getVRouterPrevious(vRouter:RouterView):ERouterHistoryItem | null{
        //console.log('(RouterHistory)getVRouterPrevious. checking previous from vRouter '+vRouter.id);
        let reversedList= this.historyItems.slice().reverse();//slice is needed to create a new array first
        let currentFound=false;
        for(let historyItem of reversedList){
            //console.log('pesquisando:',historyItem.routerPage.id, historyItem.vRouter.id);
            if(historyItem.vRouter?.id!=vRouter.id)continue;
            if(!currentFound){
                currentFound=true;
                continue;
            }
            return historyItem;
        }
        return null;
    }

    getCurrent(){
        if(this.historyItems.length<1)return null;
        else return this.historyItems[this.historyItems.length-1];
    }

    removeCurrent(){
        let current=this.getCurrent();
        current?.routerPage?.onDestroy();
        this.historyItems.pop();
    }


}


