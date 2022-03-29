import type {AnchorLayoutProps} from "../../CoreExports";
import {Component, Anchor, component} from "../../CoreExports";

enum Position {
    NotSet = 0,
    TopLeft,
    TopRight,
    BottomLeft,
    BottomRight,
    TopCenter,
    BottomCenter,
    LeftCenter,
    RightCenter,
    Center
}

//@component
export class AnchorsLayout extends Component implements AnchorLayoutProps {

    constructor(props: AnchorLayoutProps) {
        super({...{element: document.createElement('div')}, ...props});
        this.readProperties(props, true);
        this.render(true);
        this.element!.style.position = 'relative';
    }

    public render(firstRender: boolean = false): void {
        super.render(firstRender);
    }

    public addChildComponent(component: Component): void {
        let notSet = (component.anchors.value & Anchor.NotSet) === Anchor.NotSet;
        let left = (component.anchors.value & Anchor.Left) === Anchor.Left;
        let right = (component.anchors.value & Anchor.Right) === Anchor.Right;
        let top = (component.anchors.value & Anchor.Top) === Anchor.Top;
        let bottom = (component.anchors.value & Anchor.Bottom) === Anchor.Bottom;
        let horizontalCenter = (component.anchors.value & Anchor.HorizontalCenter) === Anchor.HorizontalCenter;
        let verticalCenter = (component.anchors.value & Anchor.VerticalCenter) === Anchor.VerticalCenter;

        let position = Position.NotSet;
        if (notSet) position = Position.NotSet;

        //TopLeft and TopRight
        if (left && (!bottom) && (!horizontalCenter) && (!verticalCenter)) position = Position.TopLeft;
        if (right && (!bottom) && (!horizontalCenter) && (!verticalCenter)) position = Position.TopRight;
        //BottomLeft and BottomRight
        if (left && bottom && (!horizontalCenter) && (!verticalCenter)) position = Position.BottomLeft;
        if (right && bottom && (!horizontalCenter) && (!verticalCenter)) position = Position.BottomRight;
        //TopCenter, BottomCenter, Absolute Center
        if (horizontalCenter && (!verticalCenter) && (!bottom)) position = Position.TopCenter;
        if (horizontalCenter && (!verticalCenter) && bottom) position = Position.BottomCenter;
        if (horizontalCenter && verticalCenter) position = Position.Center;
        //LeftCenter, RightCenter
        if (left && verticalCenter) position = Position.LeftCenter;
        if (right && verticalCenter) position = Position.RightCenter;

        //console.log(`(AnchorLayout)addChildItem. Item: ${component.completeID}. Position: ${Position[position]}`);
        //console.log('component:',component.id,horizontalCenter, '.position:',position);

        switch (position) {
            case Position.TopLeft:
                component.element!.style.position = 'absolute';
                component.element!.style.left = '0px';
                break;
            case Position.BottomLeft:
                component.element!.style.position = 'absolute';
                component.element!.style.bottom = '0px';
                break;
            case Position.BottomRight:
                component.element!.style.position='absolute';
                component.element!.style.bottom='0px';
                component.element!.style.right='0px';
                break;
            case Position.TopRight:
                component.element!.style.position = 'absolute';
                component.element!.style.top = '0px';
                component.element!.style.right = '0px';
                break;
            case Position.TopCenter:
                component.element!.style.position = 'absolute';
                component.element!.style.top = '0px';
                component.element!.style.marginLeft = 'auto';
                component.element!.style.marginRight = 'auto';
                component.element!.style.left = '0px';
                component.element!.style.right = '0px';
                component.element!.style.textAlign = 'center';//para caso de ser texto
                //Todo talvez substituir pelo codigo abaixo pq ele centraliza mesmo qdo nao tem width especificado
                // this.element!.style.position='absolute';
                // this.element!.style.top='0px';
                // this.element!.style.left='50%';
                // this.element!.style.transform='translateX(-50%)'
                break;
            case Position.BottomCenter:
                component.element!.style.position = 'absolute';
                component.element!.style.bottom = '0px';
                component.element!.style.marginLeft = 'auto';
                component.element!.style.marginRight = 'auto';
                component.element!.style.left = '0px';
                component.element!.style.right = '0px';
                component.element!.style.textAlign = 'center';//para caso de ser texto
                break;
            case Position.LeftCenter:
                component.element!.style.position = 'absolute';
                component.element!.style.marginTop = 'auto';
                component.element!.style.marginBottom = 'auto';
                component.element!.style.top = '0px';
                component.element!.style.bottom = '0px';
                break;
            case Position.RightCenter:
                component.element!.style.position = 'absolute';
                component.element!.style.marginTop = 'auto';
                component.element!.style.marginBottom = 'auto';
                component.element!.style.top = '0px';
                component.element!.style.bottom = '0px';
                component.element!.style.right = '0px';
                break;
            case Position.Center:
                component.element!.style.position = 'absolute';
                component.element!.style.marginTop = 'auto';
                component.element!.style.marginBottom = 'auto';
                component.element!.style.marginLeft = 'auto';
                component.element!.style.marginRight = 'auto';
                component.element!.style.top = '0px';
                component.element!.style.bottom = '0px';
                component.element!.style.left = '0px';
                component.element!.style.right = '0px';
                break;
        }
        super.addChildComponent(component);
    }
}
