import {
    IComponent, Component, ButtonProps, ColumnLayoutProps, DivProps, GridLayoutProps, ImageProps, LabelProps, LiProps, PProps, RectangleProps, RowLayoutProps,
    SpacerProps, SpanProps, Div, GridLayout, Button, ColumnLayout, Image, Label, Li, P, Rectangle, RowLayout, Spacer, Span, AnchorLayoutProps, AnchorsLayout, Lab1, Input, InputProps
} from "../../CoreExports";

interface Dict {
    [key: string]: any;
}

export class Lab1Components {

    static AnchorsLayout(props: AnchorLayoutProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(AnchorsLayout, props);}
    static Button(props: ButtonProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Button, props);}
    static ColumnLayout(props: ColumnLayoutProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(ColumnLayout, props);}
    static Div(props: DivProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Div, props);}
    static GridLayout(props: GridLayoutProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(GridLayout, props);}
    static Image(props: ImageProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Image, props);}
    static Input<T>(props: InputProps<T>, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Input, props);}
    static Label(props: LabelProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Label, props);}
    static Li(props: LiProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Li, props);}
    static P(props: PProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(P, props);}
    static Rectangle(props: RectangleProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Rectangle, props);}
    static RowLayout(props: RowLayoutProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(RowLayout, props);}
    static Spacer(props: SpacerProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Spacer, props);}
    static Span(props: SpanProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Span, props);}


    static render<T extends Component, PropType>(props: PropType, key = 'defaultKey',): any {

    }

    static renderIf<T extends Component, PropType>(condition: boolean, props: PropType, key = 'defaultKey'): any {

    }
}
