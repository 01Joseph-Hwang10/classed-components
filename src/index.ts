import React from "react";
import elements from "./html-elements";
import elementFactory, { ComponentFactory } from "./element-factory";
import { Classed } from "./types";
import { tw } from "./template-tag";

function classed<P = {}>(component: React.FC): ComponentFactory<P> {
  return elementFactory(component);
}

elements.forEach((element) => {
  Object.defineProperty(classed, element, { value: elementFactory(element) });
});

export { tw };
export default classed as Classed;
