import {Div, Else, If, IComponent, Component, SectionItem, Lab1, Lab1Components, Logger, Property, ArrayHelper} from "../../CoreExports";
import {Signal} from "typed-signals";

interface LogLine{
    tabLevel:number
    operation:string
    color:string
    text:string
}


export class Lab1Manager extends Lab1Components {

    //region fields
    dumpManagedAttributes=false//set by Lab1.obj.bootstrap function
    dumpManagedUpdates = false//set by Lab1.obj.bootstrap function
    propsColor = '#d3b8ae';
    logs:LogLine[]=[];
    //endregion

    /**
     * Reads all tsx attributes of the Item.
     * In order to keep sanity, when passed a single component as childContent, it will be transformed into an array containing a single component. Ex: childContent:Lab1.Label -> childContent:[Lab1.Label]
     * If passing an array with a single element containing another array with n elements, we remove the array with single element. Ex: childContent:[[1,2]] -> childContent:[1,2]
     * This way, we always deal with a single dimensional array as childContent
     * @param tag
     * @param props
     */
    static readProperties(tag: any, props: any): IComponent {
        let className = tag.prototype.constructor.name
        //console.log(`(Lab1Components)readProperties: ${className}. ClassName from Tag: ${className}`)

        let tsx: IComponent = {
            className: className,
            tag: tag,
            attributes: {}
        }
        //console.log(`(Lab1Components)readProperties: ${className}. ClassName from Tag: ${className}. Keys:`, Object.keys(props))
        for (let key of Object.keys(props)) {
            let value = (props as any)[key];
            if (key === 'childContent') {
                if (!Array.isArray(value)) {
                    if(value!=undefined) tsx.attributes![key] = [value];//null and undefined childContent is discarded
                } else {//is array
                    if (value.length == 1 && Array.isArray(value[0])) {
                        //console.log('passing nested array as childContent. Nested array:',value[0])
                        tsx.attributes![key] = ArrayHelper.removeNullAndUndefinedItems(value[0]);
                    } else tsx.attributes![key] = ArrayHelper.removeNullAndUndefinedItems(value);
                }
            } else tsx.attributes![key] = value;
            //console.log('.Key:',key, '.Value:',(props as any)[key])
        }
        //console.log('(Lab1Components)readProperties. Props:', tsx.attributes)
        return tsx;
    }

    public buildTsxFragment(ownerItem: Component, parent: Component, tsxComponents: IComponent[], key: string = 'fullComponent'): void {
        // for(let tsxItem of tsxComponents){
        //     this.buildManagedItem(ownerItem,parent,tsxItem,key)
        // }
    }

    public buildManagedComponent(ownerItem: Component, parent: Component, tsxComponent: IComponent|IComponent[], key: string = 'fullComponent'): void {
        //this.log('(Manager)buildManagedItem. parent:', parent.id, '.Key:', key);
        let t0 = performance.now();
        if(this.dumpManagedUpdates)this.logs=[];

        if(this.dumpManagedAttributes&& !Array.isArray(tsxComponent)) this.dumpAttributes(tsxComponent, true)
        let keyItem = Lab1.findSectionItem(parent, key);//tive que colocar no Lab1 pq estava dando pau aqui nesta classe.
        if (keyItem == undefined) {
            //this.log(`(Manager)key ${key} not found as child of component: ${parent.id}. Adding child ${tsxComponent.className} inside SectionItem...`);
            let keyItem = new SectionItem({parent: parent, key: key, ownerComponent: ownerItem, internalID: 'SectionItem'});
            keyItem.setContent(tsxComponent);
        } else {
            this.log(`(Manager)key ${key} found as child of component: ${parent.id}`);
            keyItem.setContent(tsxComponent);
        }
        if(this.dumpManagedUpdates)this.dumpMyLogs();
        console.log('Elapsed '+ Math.round((performance.now() - t0)) + " milliseconds.");
    }

    //Property dump=============================================================================

    /**
     * Prints in the console all attributes received in the tsx node.
     * Each tsx node has a list of children. Each child can be another tsx node, or it can be an array of tx nodes.
     * Ex: When using the code below in your tsx
     *
     * {this.cars.map((car, i) =>
     *   <CheckBox label={'CheckBox with car name='+car.name} color={Color.Info}/>
     *  )}
     *
     * will produce an array of CheckBoxes that will ocupy only one child of `tsxComponent.children`.
     * @param tsxItem
     * @param dumpChildrenAttributes
     * @param tabLevel
     * @protected
     */
    protected dumpAttributes(tsxItem: any, dumpChildrenAttributes: boolean, tabLevel: number = 0): void {
        //if(tsxItem==null)return;//passed null as childContent or part of the childContent is null
        if(typeof tsxItem!=='object'){//not an Item. It might be a pure text
            this.logWithColor(this.propsColor, this.getTabs(tabLevel) + 'childContent: '+tsxItem);
            return;
        }
        if(tsxItem instanceof Component/*childContent received an instance, not tsx*/)this.logWithColor(this.propsColor, this.getTabs(tabLevel) + tsxItem.constructor.name + '(unmanaged)------------------------------------------------------');
        else this.logWithColor(this.propsColor, this.getTabs(tabLevel) + tsxItem.className + '-------------------------------------------------------------');
        tabLevel++;
        let children = tsxItem.children;
        for (let key in tsxItem.attributes) {
            //managed ts has no children. we get it from childContent
            if (key == 'childContent') {
                children = tsxItem.attributes[key];
                continue;
            } else if (key == 'parent') {
                this.dumpparentAttribute(tsxItem.attributes[key], tabLevel)
                continue;
            } else if (typeof tsxItem.attributes[key] === 'function') {
                this.logWithColor(this.propsColor, `${this.getTabs(tabLevel)}${key}: signal`);
                continue;
            }
            this.logWithColor(this.propsColor, `${this.getTabs(tabLevel)}${key}: ${tsxItem.attributes[key]}`);
        }
        if (dumpChildrenAttributes && children && children.length > 0) {
            this.dumpChildren(children, tabLevel);
        }
    }

    protected dumpChildren(children: IComponent[], tabLevel: number): void {
        for (let tsxChild of children) {
            let childIsArray = Array.isArray(tsxChild);
            if (childIsArray) {
                let childArray = (tsxChild as any) as IComponent[]
                for (let ch of childArray) {
                    this.dumpAttributes(ch, true, tabLevel);
                }
            } else {
                //console.log('(Manager)dumpChildren. contentChild=Single ')//todo Passa aqui no caso do MudText pq tem um childcontent contendo um array com um child só
                this.dumpAttributes(tsxChild, true, tabLevel);
            }
        }
    }

    protected dumpparentAttribute(parent: Component | undefined, tabLevel: number) {
        if (parent != undefined) this.logWithColor(this.propsColor, `${this.getTabs(tabLevel)}parent: ${parent.constructor.name}-${parent.partialID}`);
        else this.logWithColor(this.propsColor, `${this.getTabs(tabLevel)}parent: undefined`);
    }

    protected getTabs(tabLevel: number): string {
        let result = '';
        for (let i = 0; i < tabLevel; i++) result += '\t';
        return result;
    }

    //SectionItem management=========================================================================

    /**
     * Creates or Updates or Replace an array of tsxComponents.
     * This function is called when User used map function inside tsx, like the example below:
     * {this.cars.map((car, i) =>
     *   <CheckBox label={'CheckBox with car name='+car.name} color={Color.Info}/>
     *  )}
     * The code above will produce an array of CheckBoxes that will ocupy only one child of `tsxComponent.children`.
     * @return Returns the index of the last Component
     * @param keyItem
     * @param parent
     * @param startIndex
     * @param tsxArray
     * @param iterateNestedChildren
     * @param tabLevel
     * @protected
     */
    public createOrUpdateOrReplaceArrayOfItems(keyItem: SectionItem, parent: Component, startIndex: number, tsxArray: IComponent[], iterateNestedChildren: boolean, tabLevel: number): number {
        this.log(`(Manager)createOrUpdateOrReplaceArrayOfItems. parent: ${parent.completeID}. Array length: ${tsxArray.length}. StartIndex: ${startIndex}`);
        let index = 0;
        for (let i = 0; i < tsxArray.length; i++) {
            index = startIndex + i;
            let tsxComponent = tsxArray[i];
            //this.log(`Tsx component from Array: ${tsxComponent.className}. Index: ${index}`);
            let returnedIndex = this.createOrUpdateOrReplaceItem(keyItem, parent, index, tsxComponent, true, tabLevel);
            if (index != returnedIndex) {
                console.warn('Different index');
            }
        }
        return index;//index of the last component in the array
    }

    /**
     * Returns the index of the component
     * @param sectionItem
     * @param parent
     * @param correctIndexPosition
     * @param tsxItem
     * @param iterateTsxChildren
     * @param tabLevel
     * @protected
     */
    public createOrUpdateOrReplaceItem(sectionItem: SectionItem, parent: Component, correctIndexPosition: number, tsxItem: any, iterateTsxChildren: boolean, tabLevel: number): number {
        // if(tsxItem==null){//passed null as childContent or part of the childContent is null
        //     return -1;//todo remover o component, caso tenha sido alterado
        // }
        //let index=-1;
        let component!: Component
        //when not using tsx,we have to copy the childContent property to become a child
        if (tsxItem.attributes != undefined) {
            if (tsxItem.attributes['childContent'] != undefined) {
                tsxItem.children = tsxItem.attributes['childContent'];
                delete tsxItem.attributes['childContent']//we remove the childContent attribute
            }
            //let's warn if parent is set
            if (tsxItem.attributes['parent'] != undefined) {
                console.warn(`parent property is ignored in Managed Mode. Item using it: ${tsxItem.className}`);
                delete tsxItem.attributes['parent']//we remove the parent attribute
            }
        }
        if(tsxItem instanceof Component){//not managed. This happens when the childContent is not managed. Ex (Badge): childContent:new Icon({
            if(tsxItem.parent==undefined){
                //console.log('parent not set yet');
                parent.addChildComponent(tsxItem);
            }
            return correctIndexPosition;
        }
        //this.log(`createOrUpdateOrReplaceItem. ClassName: ${tsxItem}. parent: ${parent.completeID} . Index: ${correctIndexPosition}. `)
        switch (tsxItem.className) {
            case 'If':
                if (!this.canRenderIfContent(sectionItem, parent, correctIndexPosition, tsxItem)) return -1;
                break;
            case 'Else':
                if (!this.canRenderElseContent(sectionItem, parent, correctIndexPosition, tsxItem)) return -1;
                break;
        }
        if(typeof tsxItem!=='object'){//It's not an Item. Ex: it can be a pure text passed as childContent. In this case, parent must have a childContent Property to handle it
            //console.log(`${parent.completeID}.childContent is not Item. ChildContent: ${tsxItem}`);
            if(!(parent as object).hasOwnProperty('childContent')){
                console.error(`${parent.constructor.name} has no childContent Property`);
                return -1;
            }
            (parent as any)['childContent'].value=tsxItem;
            return correctIndexPosition;
        }
        if (parent.children[correctIndexPosition] != undefined) {
            //when replacing...
            if (this.isReplacingItem(sectionItem, parent, correctIndexPosition, tsxItem, tabLevel)) {
                component = this.replaceItem(sectionItem, parent, correctIndexPosition, tsxItem, tabLevel);
            }
            //when updating
            else if (parent.children[correctIndexPosition].constructor.name == tsxItem.className) {
                component = parent.children[correctIndexPosition];
                component.index = correctIndexPosition;
                this.updateItem(sectionItem, component, tsxItem, tabLevel);
            }
        } else {//when adding
            component = this.createItem(sectionItem, parent, correctIndexPosition, tsxItem, tabLevel);
        }
        if (iterateTsxChildren) {
            if(component==undefined){
                console.warn(tsxItem.className +' not found');
                return -1;
            }
            if (tsxItem.children == undefined || tsxItem.children.length == 0) {
                this.removeChildren(sectionItem, component, tabLevel + 1);//let's remove the children, if any
                return component.index;//no children
            }
            let endArrayIndex = 0;
            for (let childIndex = 0; childIndex < tsxItem.children.length; childIndex++) {
                //In case we have arrays in the midle of the children list, the index for each tsxComponent will be childIndex+endArrayIndex
                if (Array.isArray(tsxItem.children[childIndex])) {
                    endArrayIndex += this.createOrUpdateOrReplaceArrayOfItems(sectionItem, component, childIndex + endArrayIndex, tsxItem.children[childIndex] as any, true, tabLevel + 1);
                } else {
                    this.createOrUpdateOrReplaceItem(sectionItem, component, childIndex + endArrayIndex, tsxItem.children[childIndex], true, tabLevel + 1);
                }
            }
            //let's remove the remaining items if current list is shorter
            //console.log( `Item: ${component.completeID}. TsxChildren length:`,tsxItem.children.length, '.Item children length:',component.children.length);
            if (tsxItem.children.length < component.children.length) {
                for (let removalIndex = component.children.length - 1; removalIndex > (tsxItem.children.length - 1); removalIndex--) {
                    //console.log('removing index:',removalIndex);
                    this.removeItem(sectionItem, component, removalIndex, tabLevel + 1);
                }
            }
        }
        return component.index;
    }

    protected isReplacingItem(sectionItem: SectionItem, parent: Component, index: number, tsxItem: IComponent, tabLevel: number): boolean {
        if ((parent.children.length - 1) < index) return false;
        let component = parent.children[index];
        if(!component.isManaged)return false;
        if (component.constructor.name != tsxItem.className) {
            console.log(this.getTabs(tabLevel), `(Manager)isReplacingItem. Classname difffer. parent:${parent.completeID}. Index: ${index} . CurrentItem class name:`, component.constructor.name, '. Tsx class name:', tsxItem.className, '.Item id: ', component.id)
            return true;//className differs
        }
        if (component.key.value != undefined && (tsxItem as any).attributes != undefined) {
            if ((tsxItem as any).attributes['key'] == component.key.value) return false;//Same key, not replacing
            //console.log('key changed')
            return true;
        }
        return false;
    }

    /**
     * Returns true if can render If's content
     * @param keyItem
     * @param parent
     * @param index
     * @param tsxComponent
     * @protected
     */
    protected canRenderIfContent(keyItem: SectionItem, parent: Component, index: number, tsxComponent: IComponent): boolean {
        //this.log('If analysis');
        let canRenderIf = (tsxComponent as any).attributes['condition'];
        this.log(`canRenderIfContent: ${canRenderIf}`)
        if (!canRenderIf) {
            //let's delete all if's children in case they were rendered before
            if (parent.children[index] != undefined && parent.children[index].constructor.name == 'If') {
                let ifComponent = parent.children[index] as If;
                ifComponent.condition.value = canRenderIf;
                ifComponent.removeChildComponents();
            }
            return false;
        }
        return true;
    }

    /**
     * Returns true if can render Else's content
     * Optionally, Else also has a condition. By default, it's true when not set.
     * @param keyItem
     * @param parent
     * @param index
     * @param tsxComponent
     * @protected
     */
    protected canRenderElseContent(keyItem: SectionItem, parent: Component, index: number, tsxComponent: IComponent): boolean {
        //the last child must be If or Else
        if (parent.children[index - 1] != undefined && parent.children[index - 1].constructor.name != 'If' && parent.children[index - 1].constructor.name != 'Else') {
            console.warn('Else can only be used after If or other Else');
            return false;
        }
        let canRenderElse = false;
        let ifComponent = parent.children[index - 1] as If;
        let elseCondition = (tsxComponent as any).attributes == undefined ? true : (tsxComponent as any).attributes['condition'];
        if (elseCondition == undefined) canRenderElse = !ifComponent.condition;
        else canRenderElse = !ifComponent.condition && elseCondition == true
        this.log(`canRenderElseContent: ${canRenderElse}`)
        if (!canRenderElse) {
            //let's delete all Else's children in case they were rendered before
            if (parent.children[index] != undefined && parent.children[index].constructor.name == 'Else') {
                let elseComponent = parent.children[index] as Else;
                elseComponent.removeChildComponents();
            }
            return false;
        }
        return canRenderElse;
    }

    /**
     * Creates a new instance of the component indicated by tscComponent and add it as child of parent.
     * Attributes are passed through the constructor.
     * @param sectionItem
     * @param parent
     * @param expectedIndex
     * @param tsxComponent
     * @param tabLevel
     * @param indexToReplace
     * @protected
     */
    protected createItem(sectionItem: SectionItem, parent: Component, expectedIndex: number, tsxComponent: IComponent, tabLevel: number, indexToReplace?: number): Component {
        //this.log(`createItem. Item: ${tsxComponent.className}. parent: ${this.getItemUniqueName(parent)}. Index: ${index}`);
        //when not using tsx, we use childContent property, but it has to be handled here, not by setContent property
        let attributes = tsxComponent.attributes ?? {};
        attributes['parent'] = parent;//we have to set the parent manually. Then, Item constructor calls parent.addChildItem
        attributes['isManaged'] = true;
        if (indexToReplace != undefined) attributes['indexToReplace'] = indexToReplace;//special case when replacing an component
        if (attributes['childContent'] != undefined) delete attributes['childContent']
        //console.log('attributes without childContent:',attributesWithoutChildContent);

        let component = new tsxComponent.tag.prototype.constructor(attributes);
        component.name = tsxComponent.className;//todo mudar
        //parent.addChildItem(component);
        if (tsxComponent.attributes != undefined && tsxComponent.attributes['ref'] != undefined) {
            let ref = tsxComponent.attributes['ref'];
            //console.log(`setting ref: ${ref}------------------------------------. Owner Component: ${this.ownerComponent?.constructor.name}`);
            (sectionItem.ownerComponent! as any)[ref.propertyName] = component;//ref.propertyName is set by RefPropertyDecorator
            //let assignedRef=(this.ownerComponent! as any)[ref.propertyName];
            //console.log('ref is now ', assignedRef.constructor.name)
        }//else console.log('not using ref');
        if (indexToReplace == undefined) {
            if(this.dumpManagedUpdates) this.logs.push({operation:'create',tabLevel:tabLevel,color: '#69f0ae', text:`${this.getTabs(tabLevel)}${component.completeID}(create)`});
            component.index = parent.children.length - 1;
            if (expectedIndex != component.index) console.warn(`createItem ${tsxComponent.className}. Different index. Index:${component.index}. Expected: ${expectedIndex} `);
        } else component.index = indexToReplace;
        return component;
    }

    /**
     *
     * @param sectionItem
     * @param component
     * @param tsxItem
     * @param tabLevel
     */
    public updateItem(sectionItem: SectionItem, component: Component, tsxItem: IComponent, tabLevel: number): void {
        if(this.dumpManagedUpdates) this.logs.push({operation:'update',tabLevel:tabLevel, color:'#40c4ff',text:`${this.getTabs(tabLevel)}${component.completeID}(update)`})
        if (tsxItem.attributes == undefined) {
            this.log('no attributes');
            return;
        }
        for (let key in tsxItem.attributes) {
            this.setItemAttribute(sectionItem, component, key, tsxItem.attributes[key], tabLevel + 1);
        }
        //let's check if others attributes where removed
        //console.log('attributes length:', Object.keys(tsx.attributes).length);
    }

    /**
     *
     * @param sectionItem
     * @param parent
     * @param index
     * @param tsx
     * @param tabLevel
     */
    public replaceItem(sectionItem: SectionItem, parent: Component, index: number, tsx: IComponent, tabLevel: number): Component {
        let component = this.createItem(sectionItem, parent, index, tsx, tabLevel, index);
        if(this.dumpManagedUpdates)this.logs.push({operation:'replaceItem:',tabLevel:tabLevel,color: '#69f0ae', text:`${this.getTabs(tabLevel)}${component.completeID}(replace)`});
        return component;
    }

    /**
     * Removes all children from the parent, if any
     * @param sectionItem
     * @param parent
     * @param tabLevel
     */
    public removeChildren(sectionItem: SectionItem, parent: Component, tabLevel: number): void {
        //console.log('removeChildren. parent:',parent)
        for (let index = parent.children.length - 1; index >= 0; index--) {
            this.removeItem(sectionItem, parent, index, tabLevel);
        }
    }

    public removeItem(sectionItem: SectionItem, parent: Component, index: number, tabLevel: number): void {
        if ((parent.children.length - 1) < index) {
            console.warn('unable to remove component. Invalid index');
            return;
        }
        let component = parent.children[index] as Component;
        if (!component.isManaged) {//component was created internally by a managed component
            return;
        }
        if(this.dumpManagedUpdates) this.logs.push({operation:'removeItem',tabLevel:tabLevel, color: '#ff5252', text:`${this.getTabs(tabLevel)}${component.completeID}(removed)`});
        component.delete();
    }

    /**
     *
     * @param keyItem
     * @param comp
     * @param attributeName The name of the attribute to update. It can be a Property, a variable or an Event/Signal
     * @param value
     * @param tabLevel
     */
    protected setItemAttribute(keyItem: SectionItem, comp: Component, attributeName: string, value: any, tabLevel: number) {
        //console.log(`(SectionItem)checking ${completePropName}...`)
        let component = comp as any;
        let itemProperty = component[attributeName]
        if (itemProperty != undefined) {
            if (itemProperty instanceof Property) return this.setItemProperty(keyItem, component, attributeName, value, tabLevel);
            if (itemProperty instanceof Signal) return this.setChildSignal(keyItem, component, attributeName, value);
        } else {
            if (attributeName != 'childContent') {//Items don't need to create  a childContent property. Todo check if needed when using manual ts
                if(this.dumpManagedUpdates)this.logs.push({operation:'setItemAttribute', tabLevel:tabLevel, color: 'red',text:`${this.getTabs(tabLevel)}property ${component.completeID}.${attributeName} was undefined`})
                //this.log(`property ${completePropName} was undefined`)
            }
        }
        if (attributeName == 'childContent') return this.setItemChildContent(keyItem, component, value);
        return this.setItemField(keyItem, component, attributeName, value, tabLevel);

        // if(childProperty!=undefined){
        //     //console.log(currentProperty instanceof NewProperty)
        //     if(childProperty instanceof NewProperty){
        //         //console.log('valor antigo:',currentProperty.value)
        //         if(childProperty.value===value){
        //             //console.log('mesmo valor');
        //             return;
        //         }
        //         console.log(`(SectionItem)property ${completePropName} modified to: ${value}`)
        //         childProperty.value=value;
        //     }
        // }else {
        //     console.log(`property ${completePropName} was undefined`)
        // }
    }

    /**
     *  Sets the component's property value to propertyValue.
     *  This function is only called when the component has a Property named propertyName
     *  The value passed to it can be a variable or a Property.
     * @param sectionItem
     * @param component
     * @param propertyName
     * @param propertyValue
     * @param tabLevel
     * @protected
     */
    protected setItemProperty(sectionItem: SectionItem, component: Component, propertyName: string, propertyValue: any, tabLevel: number): void {
        let itemProperty = (component as any)[propertyName] as Property<any>;
        //In case of property to property assignment, there's nothing to do. It's automatic handled by Property object
        if (propertyValue instanceof Property) {
            if(this.dumpManagedUpdates)this.logs.push({operation:'setItemProperty',tabLevel:tabLevel, color:'#ffd180',text:`${this.getTabs(tabLevel)}${propertyName}: ${propertyValue.value}`})
            //this.log(`setItemProperty. ${completePropName}: ${propertyValue.value}. Properties were already bound`);
            return;
        }
        //In case of a value being set (not a Property), we assign it if not already set.
        if (itemProperty.value == propertyValue) return;
        else {
            if(this.dumpManagedUpdates)this.logs.push({operation:'setItemProperty', tabLevel:tabLevel, color:'#ffd180', text:`${this.getTabs(tabLevel)}${propertyName}: ${propertyValue}`})
            itemProperty.value = propertyValue;
        }
    }

    /**
     * Sets the Child's field value to fieldValue.
     * We consider a field a non Property and non Signal/Event
     * @param sectionItem
     * @param component
     * @param fieldName
     * @param fieldValue
     * @param tabLevel
     * @protected
     */
    protected setItemField(sectionItem: SectionItem, component: Component, fieldName: string, fieldValue: any, tabLevel: number): void {
        if ((component as any)[fieldName] == fieldValue) return;
        //todo remover background
        if(this.dumpManagedUpdates){
            if(fieldName!='background' && fieldName!='ref'){//todo ver remover checagem com background e ref
                let oldValue=(component as any)[fieldName];
                if(oldValue!=fieldValue) this.logs.push({operation:'setItemField', tabLevel:tabLevel, color:'#b388ff',text:`${this.getTabs(tabLevel)}${fieldName}: ${fieldValue}`});
            }
        }
        (component as any)[fieldName] = fieldValue
    }

    /**
     * Sets the callback to be called when the signal signalName fires.
     * @param keyItem
     * @param childComponent
     * @param signalName
     * @param callback
     * @protected
     */
    protected setChildSignal(keyItem: SectionItem, childComponent: Component, signalName: string, callback: any): void {
        let childSignal = (childComponent as any)[signalName] as Signal<any>;
        let completeSignalName = `${childComponent.constructor.name}.${signalName}`;
        //this.log(`setChildSignal. ${completeSignalName}: ${callback}`);
        //does not work when the callback updates a property that causes reender childSignal.disconnect(callback);
        childSignal.disconnectAll();
        //colocar tudo dentro de uma nova classe do Signal e ele verificar se tem callback associado ou nao.
        childSignal.connect(callback)
    }

    /**
     * We do not use this since we copy the childContent into children on createOrUpdateOrReplaceItem
     * Sets the component's childContent
     * @param keyItem
     * @param childComponent
     * @param childContent
     * @protected
     */
    protected setItemChildContent(keyItem: SectionItem, childComponent: Component, childContent: any): void {
        // let completeChildContentName=`${childComponent.constructor.name}.childContent`;
        // this.log(`setItemChildContent. Item: ${this.getItemUniqueName(childComponent)}. ChildContent: ${childContent}`);
    }

    public log(message?: any, ...optionalParams: any[]) {
        if (!this.dumpManagedUpdates) return;
        if (optionalParams && optionalParams.length > 0) console.log(message, optionalParams);
        else console.log(message);
    }

    protected dumpMyLogs(){
        for(let index=0;index<this.logs.length;index++){
            let log=this.logs[index];
            if(log.operation!='update'){
                this.logWithColor(log.color,log.text);
                continue;
            }
            if(index+1==this.logs.length)break;
            //if operation is an Item update, we only display the log line if there are properties or fields updated.
            if(this.containsNestedUpdate(index+1,log.tabLevel))
                this.logWithColor(log.color,log.text);
        }
    }

    containsNestedUpdate(nextIndex:number, currentTabLevel:number):boolean{
        //let's iterate through all log lines after index that has  bigger tabLevels. if one line has an operation !=update, we return true;
        for(let index=nextIndex;index<this.logs.length;index++){
            let log=this.logs[index];
            if(log.tabLevel<currentTabLevel)return false;
            if(log.tabLevel==currentTabLevel)return false//another component within the same level.
            if(log.tabLevel>=currentTabLevel){
                if(log.operation!=='update')return true;
            }
        }
        return false;
    }

    protected dumpSubLogs(){

    }

    protected logWithColor(color: string, msg: string, ...optionalParams: string[]): void {
        if (!this.dumpManagedUpdates) return;
        Logger.logWithColor(color, msg, ...optionalParams);
    }
}
