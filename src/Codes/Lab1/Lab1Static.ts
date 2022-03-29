import {Component, SectionItem, Lab1Manager} from "../../CoreExports";

export class Lab1Static extends Lab1Manager{

    // static newID() {
    //     let d = new Date().getTime();
    //     let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;
    //     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    //         let r = Math.random() * 16;
    //         if(d > 0){
    //             r = (d + r)%16 | 0;
    //             d = Math.floor(d/16);
    //         } else {
    //             r = (d2 + r)%16 | 0;
    //             d2 = Math.floor(d2/16);
    //         }
    //         return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    //     });
    // }

    static newID():string{
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters after the decimal
        return  Math.random().toString(36).substring(2, 9);
    }

    static findSectionItem(parentComponent:Component, key:string):SectionItem | undefined{
        //console.log(`(Lab1)findSectionItem as child of component ${parentComponent.id} with Key:`,key);
        for(let child of parentComponent.children){
            //console.log('child:',child);
            if(!(child instanceof SectionItem))continue;
            if(child.key.value==key)return child;
        }
        return;
    }
}
