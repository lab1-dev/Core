
export enum LogType{
    critical,
    error,
    warning,
    info,
    debug,
    verbose
}

export class LogItem{
    logType?:LogType=LogType.critical
    displayAs?:'text'|'table'='text'
    content:any
}

export interface ILogger{
    onStartLogging():void
    onStopLogging():void
    onGetLogs():LogItem[];
}
