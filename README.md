# Lab1 Core

Lab1 is a typescript framework intended to remove complexities, integrate concepts and bring intuition, simplicity and beauty back into the code to provide the foundation that allows the creation of pro-life applications in accordance with the <a style="color: ${Shared.blueTextColor}" href="https://lab1.dev/law-of-one">Law of One</a> principles. Thus, this project relies on an open source license that allows its use in projects that are in favor of life and Unity Consciousness.

After working more than 20 years with software development and several languages, I noticed that languages and tools were becoming more and more complex, generating mental fragmentation in many developers, obstructing creativity and the construction of the final product. Many applications are unhealthy while others are intentionally created to accumulate large amounts of capital and power, without the slightest concern for others and the damage caused to other people's lives.

Thus, this project is intended to provide intuitive tools that allow creativity to flow unobstructed to create products that are truly pro-life and pro-human. The project is still in an early stage and all contributions are welcome. If you or the company you work for aligns with the principles of this project, please consider helping to develop or support it financially. 

[Lab1 website](https://lab1.dev) contains the documentation and sample codes illustrating the usage with core components and material design components. 

<b>This project is not ready for production and your contribution makes a difference!</b>

# Architecture

The current architecture of the project is simple and flexible. You can create components in Typescript, Managed Typescript or Managed TSX. See more information about the 3 ways in the sections on this page. The project is split into two packages: 

* @lab1/core containing the basic classes and components for creating any application.        
* @lab1/material containing Material design components.         

To facilitate the creation of layouts, conventional <a style="color: ${Shared.blueTextColor}" href="https://getbootstrap.com/docs/4.0/layout/grid/">Bootstrap-like grids</a> can be used through the <a style="color: ${Shared.blueTextColor}" href="/grid">Grid</a> material component or through the <a style="color: ${Shared.blueTextColor}" href="/anchors">AnchorsLayout</a>, <a style="color: ${Shared.blueTextColor}" href="https://lab1.dev/row-layout">RowLayout</a>, <a style="color: ${Shared.blueTextColor}" href="https://lab1.dev/column-layout">ColumnLayout</a> and <a style="color: ${Shared.blueTextColor}" href="https://lab1.dev/grid-layout">GridLayout</a> components. Date and time management, on the other hand, can be easily done through the <a style="color: ${Shared.blueTextColor}" href="https://lab1.dev/date-time">DateTime</a> and <a style="color: ${Shared.blueTextColor}" href="https://lab1.dev/time-span">TimeSpan</a> classes.

# Signals

Components created in <b>@lab1/core</b> and <b>@lab1/material</b> use <a style="color: ${Shared.blueTextColor}" href="https://github.com/Lusito/typed-signals">Typed Signals</a> for sending events from one component to another, but other ways can be used when creating your own components. Follow a simple Button to illustrate on how to emit signals:

```typescript
@component
export class Button implements ButtonProps{
	readonly onClick = new Signal<(ev:MouseEvent) => void>();
    readonly text = new Property<string>(this,'');

	constructor(props: ButtonProps) {
    	super({...{element: document.createElement('button')}, ...props});
	    this.element!.onclick=(ev)=>this.onClick.emit(ev);
	}
}
```

The <b>onClick</b> signal created above can be associated in the construction of the Button or any time later. Ex: 

```typescript
let button=new Button({
    text:'Click me',
    onClick:()=>console.log('Hi there')
});
//or
button.onClick.connect(()=>console.log('hi there!'));
```

# Property System

The property system allows you to associate values while constructing the component, and also to change them after the component has been rendered. Thus, component properties are mutable, giving the developer flexibility in building pages. Here is an example of the <b>text</b> property of a Button below:

```typescript
export interface ButtonProps{
     text?: TypeString //TypeString is: export type TypeString = Property<string> | string
}   

@component
export class Button implements ButtonProps{
    readonly text = new Property<string>(this,'');

    constructor(props: ButtonProps) {
        super({...{element: document.createElement('button')}, ...props});
    }

    public render(firstRender: boolean = false): void {
        this.element!.innerText = this.text.value;
    }
}
```

The text property above can be passed to the Button's constructor and changed later. Ex:

```typescript
let button=new Button({
    text:'Click me'
});
//or
button.text.value='Click me';
```

By default, the Property class will attempt to invoke the method <b>render</b> of the component, if available. This way, you can apply all the property changes to the DOM inside the render function of your component. This is the easiest approach, but if your project requires more atomic modifications, create a <b>custom getter</b> or <b>custom setter</b> for the property. This way, you can apply changes to the DOM directly without render function. Ex:

```typescript
@component
export class Button implements ButtonProps{
    readonly text = new Property<string>(this,'',{
        customSetter:(value)=>{
            this.element!.innerText=value;
        }
    });

    constructor(props: ButtonProps) {
        super({...{element: document.createElement('button')}, ...props});
    }       
}        
```

# Lifecycle

Creating a Lab1 application resembles creating a desktop application using an object-oriented language. All construction of a component can be done from the component's own constructor or through methods called by the constructor and, optionally, you can override the methods below:

* <b>render(firstRender: boolean = false)</b><br>
  Executed when rendering the component. It is optional and only required when the component or page contains Properties. 
  
  
  
* <b>onAfterRender(firstRender: boolean = false)</b><br>
  This function is automatically called in 2 situations:<br>
  
  1. by RouterView after the router page is rendered.<br>
  
  2. by Component after subsequent render calls (not firstRender). In this case, it waits 500ms and then call onAfterRender(false)<br>
     You can override this function as async in your component or router page to perform any post render processing. (Ex: retrieve data from a server side).
  
     
  
* <b>onDestroy()</b><br>
     This function can only be used in <b>router pages</b> and it's called automatically by the router whenever the history pops to the previous page.             

# Service Injection

Lab1 uses the package <a style="color: ${Shared.blueTextColor}" href="https://github.com/microsoft/tsyringe">TSyringe</a> for injecting services into <b>router pages</b>. So in addition to the router instance, you can create other services and get their instance in the page constructor. Follow a sample on how to create a service below: 

```typescript
import { service } from "@lab1/core";

@service()
export class SampleService{
    value=369

    //constructor called once only. 
    //All subsequent Page loads use the same service instance. 
    constructor() {            
    }

    doSomething(){
        console.log('doing something...')
    }
}
```

Then, you can inject the service above into any router page as below:

```typescript
import {Lab1, Router, routerPage} from "@lab1/core";
import {SampleService} from "../Services/SampleService";

@routerPage()
export class MyPage {

    constructor(router: Router, sampleService:SampleService) {
        super({parent: Lab1.obj.currentRouterView});

        console.log('sampleService value:',sampleService.value);
        sampleService.doSomething();
        sampleService.value=45;
    }
}
```

# Typescript

Most of the components available in <b>@lab1/core</b> and also in <b>@lab1/material</b> use components created entirely in Typescript. There are advantages and disadvantages to using it and it depends on the personal preference of each developer. Creating components in pure typescript is similar to a car with a manual gearbox: you have more control over what is happening, but you also have more work. When components are simple and there are not many elements in the DOM created by the component, it is trivial to use it, but when there are many elements and you need to add/remove elements dynamically, it can make the component complex. Anyway, using pure typescript in <b>router pages</b> is recommended and there are two ways to use components in it:

 <b>Using parent and without using childContent:</b>        
 The sample below has the main advantage of providing the instance of the two components for modifying properties after rendering.

```typescript
let columnLayout = new ColumnLayout({
    parent: this,
});

let button=new Button({
    parent: columnLayout,
    text: 'Click me'
});    
```

<b>Using childContent:</b><br>
By using childContent, the components are nested, but do not provide access to the instance of the child components. In this way, the button component instance is not accessible for changing properties after rendering.

```typescript
let columnLayout = new ColumnLayout({
    parent: this,
    childContent: new Button({
        text: 'Click me'
    })
});
```

So, it depends on the use case and also on the personal preference of each developer.

# Managed Typescript

Instance creation and removal is done automatically by Lab1 when using managed code and makes it easy to create components with lots of dynamic nesting in the DOM.
This way, you never use <b>new</b> operator. Lab1 identifies if a new instance is needed.<br>The internal operation is very similar to TSX, but without JSX tags.  <br>To use managed code in your project, you need to add the following fields in <b>compilerOptions</b> of your <b>tsconfig.json</b> file:

```json
"compilerOptions": {
    "jsx": "react",
    "jsxFactory": "tsx",
},    
```

Then, you can use any Lab1 component as below:

```typescript
let managedContent=[
    Material.Button({
        ref:this.button1,
        text:'Click me',
        variant:Variant.Filled,
        color:Color.Tertiary
    }),
];
this.buildManaged(this.layout1,managedContent);
this.button1?.onClick.connect(()=>console.log('hi there!'));
```

The reference to the instance of each component can be obtained by using <b>ref property</b> and declaring the field in your class with <b>ref decorator</b>. Ex: @ref button1?:Button

# Managed TSX

Internally, Managed TSX code is very similar to Managed Typescript and offers the possibility to develop with jsx syntax and <b>.tsx</b> files. It is an interesting alternative for those who like the React framework, but although the syntax is the same, the components are not compatible, but can be ported more easily.

```tsx
let managedContent=[
    <Button ref={this.button1} text='Click me' variant={Variant.Filled} color={Color.Tertiary}/>,
];
this.buildManaged(this.layout1,managedContent);
this.button1?.onClick.connect(()=>console.log('hi there!'));
this.button1!.text.value='Thank you';
```

