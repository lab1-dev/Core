export class NumberHelper {

    public static toPixel(value: string | number | undefined): string {
        if (value != undefined && typeof value === 'string' && value.indexOf('px') > -1) return value;//already pixel
        if (value != undefined) return value.toString() + 'px';
        else return '';
    }
}
