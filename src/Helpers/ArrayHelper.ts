export class ArrayHelper {

    static createMultidimentionalArray(firstDimensionSize: number, secondDimensionSize: number) {
        return Array.from(Array(firstDimensionSize), () => new Array(secondDimensionSize))//nao funciona. ele marca em todas as linhas o valor
    }

    static createSingleDimensionNumberArray(size: number, defaultValue: number) {
        return Array.from(Array(size), () => defaultValue)
    }

    static createNumberRange(start: number, end: number): number[] {//3,6 returns  [3, 4, 5, 6]
        return Array.from(Array(end - start + 1).keys()).map(x => x + start);
    }

    static removeItem(array: any[], component: any): any[] {
        return array.filter(component => component !== component)
    }

    static isNullOrEmpty(array: any[] | null | undefined): boolean {
        if (array == undefined) return true;
        return array.length == 0;
    }

    /**
     * Creates a range from start up to end. Ex:
     *  range(1,5) = 1,2,3,4,5
     * @param start
     * @param end
     */
    static range(start:number, end:number):Array<number> {
        return Array.from({length: (end - start+1)}, (v, k) => k + start);
    }

    static insertAtIndex(array:any[],index:number, value:any):any[]{
        if((array.length-1)<index)return array;
        array.splice(index, 0, value);
        return array;
    }

    static removeLast(array:any[]):any[]{
        array.pop();
        return array;
    }

    static removeFirst(array:any[]):any[]{
        array.shift();
        return array;
    }

    static replaceByIndex(array:any[], index:number, newValue:any):any[]{
        if((array.length-1)<index)return array;
        array.splice(index, 1, newValue);
        return array;
    }

    static removeByIndex(array:any[],index:number):any[]{
        if((array.length-1)<index)return array;
        array.splice(index, 1);
        return array;
    }

    static removeNullAndUndefinedItems(array:any[]):any[]{
        return array.filter(n=>n);
    }
}
