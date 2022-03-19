/* global JSX HTMLElement */
import clsx from "clsx";
import React, { PropsWithChildren } from "react";
import { processTemplateString, TemplateArgs } from "./template-string";

export type TWClassName<P> =
  | string
  | TemplateStringsArray
  | TWClassNameCallback<P>;
type TWClassNameCallback<P> = (props: PropsWithChildren<P>) => string;

export function elementFactory<
  T extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
>(
  element: keyof JSX.IntrinsicElements
): <P = {}>(
  twClassName: TWClassName<P>,
  ...args: TemplateArgs[]
) => React.FC<T & P>;

// Type T is for matching overloading implemetaions of elementFactory
export function elementFactory<T extends {} = {}>(
  element: React.FunctionComponent
): <P = {}>(
  twClassName: TWClassName<P>,
  ...args: TemplateArgs[]
) => React.FC<T & P>;

export default function elementFactory(element: any) {
  return function (twClassName: any, ...args: any) {
    if (typeof twClassName === "object") {
      return ({ children, className, ...props }: any) =>
        React.createElement(
          element,
          {
            className: clsx([
              className,
              processTemplateString({
                template: twClassName,
                args,
                props: { children, className, ...props },
              }),
            ]),
            ...props,
          },
          children
        );
    }
    if (typeof twClassName === "string") {
      return ({ children, className, ...props }: any) =>
        React.createElement(
          element,
          { className: clsx([twClassName, className]), ...props },
          children
        );
    }
    if (typeof twClassName === "function") {
      return ({ children, className, ...props }: any) => {
        //@ts-ignore
        const classNameFromProps = twClassName({ children, ...props });
        return React.createElement(
          element,
          {
            className: clsx([classNameFromProps, className]),
            ...props,
          },
          children
        );
      };
    }
    throw new TypeError(`Invalid type of twClassName : ${typeof twClassName}`);
  };
}

export type ComponentFactory<P = {}> = (
  twClassName: TWClassName<P>,
  ...args: TemplateArgs[]
) => React.FC<P>;

export type ElementFactory<
  T extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
> = (
  element: keyof JSX.IntrinsicElements
) => <P = {}>(
  twClassName: TWClassName<P>,
  ...args: TemplateArgs[]
) => React.FC<T & P>;
