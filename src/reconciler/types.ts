import * as blessed from "neo-blessed";
import { Widgets } from "neo-blessed";
declare global {
  namespace JSX {
    interface IntrinsicElements {
      bigtext: any;
      box: any;
      // @ts-ignore
      button: any;
      checkbox: any;
      element: any;
      filemanager: any;
      // @ts-ignore
      form: any;
      // @ts-ignore
      input: any;
      // @ts-ignore
      line: any;
      list: any;
      listbar: any;
      listtable: any;
      loading: any;
      log: any;
      message: any;
      progressbar: any;
      prompt: any;
      question: any;
      radiobutton: any;
      radioset: any;
      scrollablebox: any;
      scrollabletext: any;
      // @ts-ignore
      table: any;
      // @ts-ignore
      text: any;
      // @ts-ignore
      textarea: any;
      textbox: any;
      terminal: any;
    }
  }
}

export type Instance<
  T extends Widgets.BlessedElement = Widgets.BlessedElement
> = T;

export type TextInstance = Instance;

export type InstanceMeta = {
  type: Type;
  eventListener: (channel: any, event: any) => void;
  props: Record<string, any>;
};

export type Type =
  | "element"
  | "box"
  | "text"
  | "line"
  | "scrollablebox"
  | "scrollabletext"
  | "bigtext"
  | "list"
  | "filemanager"
  | "listtable"
  | "listbar"
  | "form"
  | "input"
  | "textarea"
  | "textbox"
  | "button"
  | "checkbox"
  | "radioset"
  | "radiobutton"
  | "table"
  | "prompt"
  | "question"
  | "message"
  | "loading"
  | "progressbar";
export type Props = Record<string, any>;
export type Container = blessed.Widgets.BlessedElement;
export type HydratableInstance = Instance;
export type PublicInstance = Instance;
export type HostContext = {};
export type UpdatePayload = unknown;
export type ChildSet = unknown;
export type TimeoutHandle = unknown;
export type NoTimeout = null;
