import * as CSS from "csstype";

export class BaseTheme{

    private defaultTypography:CSS.Properties={
        fontFamily:"Roboto,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;",
        fontSize:"14px",
        fontWeight:400,
        lineHeight:"20px"
    }

    readonly typography:any={
        default:this.defaultTypography
    }
}
