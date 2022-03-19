export type TemplateArgs<P = {}> = string | ((props: P) => string);

interface IProcessTemplateString<P = {}> {
  template: TemplateStringsArray;
  args: TemplateArgs[];
  props: P;
}

export const processTemplateString = ({
  template,
  args,
  props,
}: IProcessTemplateString) =>
  args
    .map((arg) => (typeof arg === "function" ? arg(props) : arg))
    .reduce((acc, cur, i) => acc + cur + template[i + 1], template[0]);
