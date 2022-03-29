import {LayoutType, LayoutProps, Component} from '../../CoreExports';

export abstract class Layout extends Component implements LayoutProps {
    abstract type: LayoutType

    protected constructor(props: LayoutProps) {
        super(props);
    }

    public render(firstRender: boolean = false): void {
        super.render(firstRender);
    }

    public updateChildContent(component: Component): void {
    }
}
