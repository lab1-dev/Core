import {Builder, BuilderState, ElementHelper, Component, PlaceHolder} from "../CoreExports";

export class ChildContentHelper {

    public static addChildComponent(parentComponent:Component, childComponent:Component):void{
        childComponent.parent=parentComponent;
        //console.log(`(Item${this.id})addChildItem. Adding child:`+component.name);
        parentComponent.children.push(childComponent);
        if (parentComponent.element && childComponent.element) {
            parentComponent.element?.appendChild(childComponent.element);
        }//else console.log('(ItemOld)addChild. Parent element or this.element not found for: ',this.id);
    }

    public static insertAfter(parentComponent:Component, components:Component[]):void{
        //console.log(this.id, 'append', items.length)
        let lastElement=parentComponent.element!;
        for(let component of components){
            lastElement.insertAdjacentElement('afterend',component.element!);
            parentComponent.parent?.addChild(component);
            lastElement=component.element!;
        }
    }

    public static appendChildren(parentComponent:Component, components:Component[]):void{
        for(let component of components){
            parentComponent.addChild(component);//TODO talvez fazer element?.appendChild dentro do addChild
            parentComponent.element?.appendChild(component.element!)
        }
    }

    public static addChild(parentComponent:Component, component: Component): void {//todo talvez remover essa funcao e deixar só addChildItem. Deixei ela pq em addChildren e insertAfter que usam ela.
        component._parent=parentComponent;
        parentComponent.children.push(component);
        // if(this.isLayout){
        //   if(this.constructor.name!="VGridLayout")//todo ver pq esta estragando o gridlayout no pagegridlayout
        //   this.render();
        // }
    }

    public static removeChildItem(parentComponent:Component, component:Component, del:boolean=true):void{
        //let's remove from children first
        let index=parentComponent.children.findIndex(x=>x.uniqueID==component.uniqueID);
        if(index>=0){
            parentComponent.children.splice(index, 1);
        }
        if(del){
            if(!component.element)return;
            component.element.remove();
            for(let child of component.children){
                (child as Component).delete();
            }
        }
    }

    public static removeChildComponents(parentComponent:Component):void{
        if(parentComponent.element){
            parentComponent.element.innerHTML='';
            parentComponent.element.textContent='';
        }
        parentComponent.children=[];
    }

    public static destroyChildrenWithIDStartingWith(parentComponent:Component, idFilter:string):void{
        let childrenIDs=parentComponent.children.map(child => child.id);
        for(let childID of childrenIDs){
            if(childID.startsWith(idFilter))parentComponent.removeChildComponent(parentComponent.children.find(x=>x.id==childID),true);
        }
    }

    public static setChildContent(parentComponent:Component, child:any):void{
        if(child==undefined)return;
        //console.log('(ChildItemsHelper)setChildContent',child);
        if(Array.isArray(child)){
            //console.log('content is array');
            let array=child;
            for(let component of array){
                ChildContentHelper.addSingleContentChildIfnotPresent(parentComponent,component);
            }
        }else ChildContentHelper.addSingleContentChildIfnotPresent(parentComponent,child);
    }

    public static addSingleContentChildIfnotPresent(parentComponent:Component, child:any):void{
        //console.log('addSingleContentChildIfnotPresent. ParentItem:',parentComponent, '.Child:',child);
        //todo ver se já existe no
        if(child.element!=undefined){
            //it's an ItemOld
            if(parentComponent.element!.contains(child.element))return;
            parentComponent.element!.appendChild(child.element)
        }else{
            //standard html markup
            if(parentComponent.element!.innerHTML==child)return;
            parentComponent.element!.innerHTML=child;
            //console.log('child:',child);
            // if(child.trimStart().startsWith('<')){//It's a node, not a text
            //     if(parentComponent.element!.contains(child))return;
            //     parentComponent.element!.appendChild(child);
            // }
            // else parentComponent.element!.textContent=child;
        }
    }

    public static buildChild(parentComponent:Component, builder:Builder):void{
        //console.log('building ',placeHolderName, '.Condition:',condition);
        let placeHolder:PlaceHolder|undefined=parentComponent.placeHolderList.find((placeHolder)=>placeHolder.name==builder.holder);
        if(!placeHolder){
            let placeHolderNode=document.createComment(builder.holder);
            let node=parentComponent.element?.appendChild(placeHolderNode);
            placeHolder={name:builder.holder,placeHolderNode:placeHolderNode};
            parentComponent.placeHolderList.push(placeHolder);
        }
        if(builder.condition){
            if(!builder.builderFunction)return console.error('No builder function set');
            if(!placeHolder.component){
                placeHolder.component=builder.builderFunction(true);
                //console.log('(ItemOld)buildChild. Inserting ',placeHolder.component?.name);
                ElementHelper.insertAfter(parentComponent.element!,placeHolder.component!.element!,placeHolder.placeHolderNode);
            } else builder.builderFunction(false)
        }else {
            if(placeHolder.component) {
                console.log('(ItemOld)buildChild. Removing '+builder.holder)
                placeHolder.component= placeHolder.component?.delete();
                // @ts-ignore
                if(builder.propertyNameToDelete && parentComponent[builder.propertyNameToDelete])parentComponent[builder.propertyNameToDelete]=undefined;
                else {
                    // @ts-ignore
                    if(parentComponent[builder.holder])parentComponent[builder.holder]=undefined;
                }
            }
        }
    }

    public static buildChildFragment(parentComponent:Component, builder:Builder):void{
        //console.log('building ',placeHolderName, '.Condition:',condition);
        let placeHolder:PlaceHolder|undefined=parentComponent.placeHolderList.find((placeHolder)=>placeHolder.name==builder.holder);
        if(!placeHolder){
            let placeHolderNode=document.createComment(builder.holder);
            let node=parentComponent.element?.appendChild(placeHolderNode);
            placeHolder={name:builder.holder,placeHolderNode:placeHolderNode};
            parentComponent.placeHolderList.push(placeHolder);
        }
        if(builder.condition){
            if(!builder.builderFragmentFunction)return console.error('No builder fragment function set');
            if(!placeHolder.fragment){
                placeHolder.fragment=builder.builderFragmentFunction(BuilderState.FirstRender);
                if(placeHolder.fragment) ElementHelper.insertFragmentAfter(parentComponent.element!,placeHolder.fragment,placeHolder.placeHolderNode);
            } else builder.builderFragmentFunction(BuilderState.Render)
        }else {
            if(placeHolder.fragment) {
                if(!builder.builderFragmentFunction)return console.error('No builder fragment function set');
                console.log('(ItemOld)buildChild. Removing fragment: '+builder.holder);
                builder.builderFragmentFunction(BuilderState.Destroy)
                //todo isso trava no timepicker parentComponent.element?.removeChild(placeHolder.fragment);
            }
        }
    }
}
