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

class Parent {
  constructor(config) {
    console.log(config);
  }

  set class(v) { // property
    console.log("Parent::class", v);
  }

  setAttribute(name, value) { //attribute
    console.log(name, value);
  }

  appendChild(child) { //child
    console.log('Parent::appendChild', child);
  }
}

class Child {}

let component = 
	<Parent>
		<Child />
		<Child />
		<Child />
	</Parent>
;

console.log(component);