
export interface IComponent {
    className?:string
    tag: any
    attributes?: { [key: string]: any }
    children?:IComponent[]
}
