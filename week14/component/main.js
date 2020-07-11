function createElement(Cls, attributes, ...children) {
  let element = new Cls();
  
  for (const name in attributes) {
    // element[name] = attributes[name];
    element.setAttribute(name, attributes[name]);
  }

  for (const child of children) {
    element.appendChild(child);
  }

  return element;
}

class Div {
  constructor(config) {
    this.children = [];
    this.root = document.createElement('div');
  }

  set class(v) { // property
    console.log("Parent::class", v);
  }

  setAttribute(name, value) { //attribute
    this.root.setAttribute(name, value);
  }

  appendChild(child) { //child
    this.children.push(child);
  }

  mountTo(parent) {
    parent.appendChild(this.root);

    for (const child of this.children) {
      child.mountTo(this.root);
    }
  }
}

let component = (
	<Div id ='a' class='b' style='height:100px;width:100px;background:blue'>
		<Div />
		<Div />
		<Div />
	</Div>
);
;

component.mountTo(document.body);