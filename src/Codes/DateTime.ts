import {DateTime as LuxonDate} from "luxon";
import {TimeSpan} from "./TimeSpan";
import {DateObjectUnits, DateTimeJSOptions, DateTimeOptions, ToISOTimeOptions} from "luxon/src/datetime";
import {DayOfWeek} from "../Enums/DayOfWeek";
import {DurationLike} from "luxon/src/duration";
import {Zone} from "luxon/src/zone";


export class DateTime{

    public _luxonDate=LuxonDate.now();

    constructor() {}

    protected static fromLuxon(luxonDate:LuxonDate):DateTime{
        let dt=new DateTime();
        dt._luxonDate=luxonDate;
        return dt;
    }

    static local(year?: number, month?: number, day?: number, hour?: number, minute?: number, second?: number, millisecond?: number, opts?: DateTimeJSOptions): DateTime {
        switch(arguments.length){
            case 8:
                return DateTime.fromLuxon(LuxonDate.local(year!,month!,day!,hour!,minute!,second!, millisecond!, opts!));
            case 7:
                return DateTime.fromLuxon(LuxonDate.local(year!,month!,day!,hour!,minute!,second!, opts!));
            case 6:
                return DateTime.fromLuxon(LuxonDate.local(year!,month!,day!,hour!,minute!, opts!));
            case 5:
                return DateTime.fromLuxon(LuxonDate.local(year!,month!,day!,hour!,opts!));
            case 4:
                return DateTime.fromLuxon(LuxonDate.local(year!,month!,day!,opts!));
            case 3:
                return DateTime.fromLuxon(LuxonDate.local(year!,month!,opts!));
            case 2:
                return DateTime.fromLuxon(LuxonDate.local(year!,opts!));
            case 1:
                return DateTime.fromLuxon(LuxonDate.local(opts!));
            case 0:
                return DateTime.fromLuxon(LuxonDate.local());
            default:
                return DateTime.fromLuxon(LuxonDate.local());
        }
    }

    public static get now(): DateTime {
        return DateTime.fromLuxon(LuxonDate.now());
    }

    public static get utcNow():DateTime{
        return DateTime.fromLuxon(LuxonDate.utc());
    }

    public static get today(): DateTime {
        return DateTime.fromLuxon(LuxonDate.now().set({hour:0,minute:0,second:0}));
    }

    public static isLeapYear(year:number):boolean{
        return LuxonDate.local(year).isInLeapYear;
    }

    /**
     * Returns Mo, Tu, We, Th, Fr, Sa, Su in the right culture
     */
    public static get abbreviatedWeekDayNames():string[]{
        let result=[];
        let dt=LuxonDate.now().startOf('week');
        for(let d=0;d<7;d++){
            result.push(dt.weekdayShort);
            dt=dt.plus({day:1});
        }
        return result;
    }

    public static fromISO(text: string, opts?: DateTimeOptions):DateTime{
        return DateTime.fromLuxon(LuxonDate.fromISO(text,opts));
    }

    public static fromFormat(text: string, fmt: string, opts?: DateTimeOptions):DateTime{
        return DateTime.fromLuxon(LuxonDate.fromFormat(text,fmt,opts));
    }

    public static fromJSDate(date: Date, options?: { zone?: string | Zone }):DateTime{
        return DateTime.fromLuxon(LuxonDate.fromJSDate(date,options));
    }

    public static fromObject(obj: DateObjectUnits, opts?: DateTimeJSOptions):DateTime{
        return DateTime.fromLuxon(LuxonDate.fromObject(obj,opts));
    }

    public static daysInMonth(year:number,month:number):number{
        return LuxonDate.local(year,month).daysInMonth;
    }

    public get date():DateTime{
        return DateTime.fromLuxon(this._luxonDate.set({hour:0,minute:0,second:0}));
    }

    public get year(): number {
        return this._luxonDate.year;
    }

    public get month(): number {
        return this._luxonDate.month;
    }

    public get day(): number {
        return this._luxonDate.day;
    }

    public get hour(): number {
        return this._luxonDate.hour;
    }

    public get minute(): number {
        return this._luxonDate.minute;
    }

    public get second(): number {
        return this._luxonDate.second;
    }

    public get millisecond(): number {
        return this._luxonDate.millisecond;
    }

    public get daysInYear():number{
        return this._luxonDate.daysInYear;
    }

    public get daysInMonth():number{
        return this._luxonDate.daysInMonth;
    }

    public get dayOfWeek():DayOfWeek{
        switch(this._luxonDate.weekday){
            case 1: return DayOfWeek.Monday;
            case 2: return DayOfWeek.Tuesday;
            case 3: return DayOfWeek.Wednesday;
            case 4: return DayOfWeek.Thursday;
            case 5: return DayOfWeek.Friday;
            case 6: return DayOfWeek.Saturday;
            case 7: return DayOfWeek.Sunday;
        }
    }

    public get dayOfYear():number{
        let dt=this._luxonDate.startOf('year');
        return Math.ceil(this._luxonDate.diff(dt,'days').days);
    }

    public get remainingDaysInYear():number{
        return this.daysInYear- this.dayOfYear;
    }

    public get remainingDaysInMonth():number{
        return this.daysInMonth- this.day;
    }

    public get remainingDaysInWeek():number{
        return 7- this.dayOfWeek;
    }

    public get timeOfDay():TimeSpan{
        return new TimeSpan(0,this._luxonDate.hour,this._luxonDate.minute,this._luxonDate.second,this._luxonDate.millisecond);
    }

    public get monthNameLong():string{
        return this._luxonDate.monthLong;
    }

    public get monthNameShort():string{
        return this._luxonDate.monthShort;
    }

    public get weekDayLong():string{
        return this._luxonDate.weekdayLong;
    }

    public get weekDayShort():string{
        this._luxonDate.toISO()
        return this._luxonDate.weekdayShort;
    }

    /**
     * Returns the week of year for the specified DateTime. The returned value is an integer between 1 and 53.
     */
    public get weekOfYear():number{
        return this._luxonDate.weekNumber;
    }

    public get isLeapYear():boolean{
        return this._luxonDate.isInLeapYear;
    }

    public subtract(dt:DateTime| TimeSpan):DateTime{
        // if(dt instanceof DateTime){
        //     return new DateTime(this.dtX.diff(dt.dtX))
        // }
        //todo
        return DateTime.now
    }

    public equals(dt:DateTime):boolean{
        return this._luxonDate.toMillis()==dt._luxonDate.toMillis();//toMillis = epoch time
    }

    /**
     * Adding hours, minutes, seconds, or milliseconds increases the timestamp by the right number of milliseconds. Adding days, months, or years shifts the calendar, accounting for DSTs and leap years along the way. Thus, dt.plus({ hours: 24 }) may result in a different time than dt.plus({ days: 1 }) if there's a DST shift in between.
     * Example:
     *  DateTime.now().plus(123) //~> in 123 milliseconds
     * Example:
     *  DateTime.now().plus({ minutes: 15 }) //~> in 15 minutes
     * Example:
     *  DateTime.now().plus({ days: 1 }) //~> this time tomorrow
     * Example:
     *  DateTime.now().plus({ days: -1 }) //~> this time yesterday
     * Example:
     *  DateTime.now().plus({ hours: 3, minutes: 13 }) //~> in 3 hr, 13 min
     * Example:
     *  DateTime.now().plus(Duration.fromObject({ hours: 3, minutes: 13 })) //~> in 3 hr, 13 min
     */
    public add(duration:DurationLike):DateTime{//todo remover DurationLike. Usar TimeSpan
        this._luxonDate= this._luxonDate.plus(duration);
        return this;
    }

    public addTime(time:TimeSpan):DateTime{
        this._luxonDate= this._luxonDate.plus(time.toDuration());
        return this;
    }

    public addYears(years:number):DateTime{
        this._luxonDate= this._luxonDate.plus({year:years});
        return this;
    }

    public addMonths(months:number):DateTime{
        this._luxonDate= this._luxonDate.plus({month:months});
        return this;
    }

    public addDays(days:number):DateTime{
        this._luxonDate= this._luxonDate.plus({day:days});
        return this;
    }

    public addHours(hours:number):DateTime{
        this._luxonDate= this._luxonDate.plus({hours:hours});
        return this;
    }

    public addMinutes(minutes:number):DateTime{
        this._luxonDate= this._luxonDate.plus({minute:minutes});
        return this;
    }

    public addSeconds(seconds:number):DateTime{
        this._luxonDate= this._luxonDate.plus({second:seconds});
        return this;
    }

    public addMilliseconds(milliseconds:number):DateTime{
        this._luxonDate= this._luxonDate.plus({millisecond:milliseconds});
        return this;
    }

    public get startOfYear():DateTime{
        this._luxonDate= this._luxonDate.startOf('year');
        return this;
    }

    public get startOfMonth():DateTime{
        this._luxonDate=  this._luxonDate.startOf('month');
        return this;
    }

    public get startOfWeek():DateTime{
        this._luxonDate= this._luxonDate.startOf('week');
        return this;
    }

    public get startOfDay():DateTime{
        this._luxonDate= this._luxonDate.startOf('day');
        return this;
    }

    public startOfHour():DateTime{
        this._luxonDate= this._luxonDate.startOf('hour');
        return this;
    }

    public get endOfYear():DateTime{
        this._luxonDate= this._luxonDate.endOf('year');
        return this;
    }

    public get endOfMonth():DateTime{
        this._luxonDate= this._luxonDate.endOf('month');
        return this;
        //return new DateTime(this.dtX.set({day:this.dtX.daysInMonth}));
    }

    public get endOfWeek():DateTime{
        this._luxonDate= this._luxonDate.endOf('week');
        return this;
    }

    public get endOfDay():DateTime{
        this._luxonDate= this._luxonDate.endOf('day');
        return this;
    }

    public endOfHour():DateTime{
        this._luxonDate= this._luxonDate.endOf('hour');
        return this;
    }

    public toFormat(format:string):string{
        return this._luxonDate.toFormat(format);
    }

    public toLongDateTimeString():string{
        return this._luxonDate.toLocaleString(LuxonDate.DATETIME_FULL);
    }

    public toShortDateTimeString():string{
        return this._luxonDate.toLocaleString(LuxonDate.DATETIME_SHORT);
    }

    public toLongDateString():string{
        return this._luxonDate.toLocaleString(LuxonDate.DATE_FULL);
    }

    public toShortDateString():string{
        return this._luxonDate.toLocaleString(LuxonDate.DATE_SHORT);
    }

    public toLongTimeString():string{
        return this._luxonDate.toLocaleString(LuxonDate.TIME_WITH_SECONDS);
    }

    public toShortTimeString():string{
        return this._luxonDate.toLocaleString(LuxonDate.TIME_SIMPLE);
    }

    public toISO(opts?: ToISOTimeOptions): string{
        return this._luxonDate.toISO(opts);
    }

    /**
     * Returns an ISO 8601-compliant string representation of this DateTime's date component
     * Example:
     *  DateTime.utc(1982, 5, 25).toISODate() //=> '1982-05-25'
     * Example:
     *  DateTime.utc(1982, 5, 25).toISODate({ format: 'basic' }) //=> '19820525'
     * Params:
     * opts – options
     * Config options:
     * format – choose between the basic and extended format. Defaults to 'extended'.
     */
    public toISODate(opts?: ToISOTimeOptions): string{
        return this._luxonDate.toISODate(opts);
    }

    public toUTC():DateTime{
        this._luxonDate= this._luxonDate.setZone('utc');
        return this;
    }

}
