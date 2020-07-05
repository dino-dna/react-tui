import * as React from "react";
import { Widgets } from "neo-blessed";
import { RBProps } from "./util/blessed-react-compat";
import { NodeEventHandler } from "./util/eventHandlers";
import composeRefs from "@seznam/compose-react-refs";

// @todo attempt https://github.com/embarklabs/neo-blessed#special-elements

export const Box: React.FC<RBProps<Widgets.BoxOptions, Widgets.BoxElement>> = React.forwardRef((props, ref) => {
  return <box {...{ ...props, ref }} />;
});

export const Bigtext: React.FC<RBProps<Widgets.BigTextOptions, Widgets.BigTextElement>> = React.forwardRef((props, ref) => {
  return <bigtext {...{ ...props, ref }} />;
});

export const Button: React.FC<RBProps<Widgets.ButtonOptions, Widgets.ButtonElement> & { onpress?: NodeEventHandler }> = React.forwardRef(({ children, ...rest }, ref) => {
  // @ts-ignore
  return <button content={children} {...rest} />;
});

export const Checkbox: React.FC<RBProps<Widgets.CheckboxOptions, Widgets.CheckboxElement>> = React.forwardRef((props, ref) => {
  return <checkbox {...{ ...props, ref }} />;
});

export const Element: React.FC<RBProps<Widgets.ElementOptions, Widgets.BlessedElement>> = React.forwardRef((props, ref) => {
  return <element {...{ ...props, ref }} />;
});

export const FileManager: React.FC<RBProps<Widgets.FileManagerOptions, Widgets.FileManagerElement>> = React.forwardRef((props, ref) => {
  return <filemanager {...{ ...props, ref }} />;
});

export const Form: React.FC<RBProps<Widgets.FormOptions, Widgets.FormElement<{}>> & { onsubmit?: <T = {}>(data: T) => void }> = React.forwardRef((props, ref) => {
  // @ts-ignore
  return <form {...{ ...props, ref }} />;
});

export const Input: React.FC<RBProps<Widgets.InputOptions, Widgets.InputElement>> = React.forwardRef((props, ref) => {
  // @ts-ignore
  return <input {...{ ...props, ref }} />;
});

export const Image: React.FC<RBProps<Widgets.ImageOptions, Widgets.ImageElement>> = React.forwardRef((props, ref) => {
  // @ts-ignore
  return <image {...{ ...props, ref }} />;
});

export const Line: React.FC<RBProps<Widgets.LineOptions, Widgets.LineElement>> = React.forwardRef((props, ref) => {
  // @ts-ignore
  return <line {...{ ...props, ref }} />;
});

export const List: React.FC<RBProps<Widgets.ListOptions<any>, Widgets.ListElement>> = React.forwardRef((props, ref) => {
  return <list {...{ ...props, ref }} />;
});

export const ListBar: React.FC<RBProps<Widgets.ListbarOptions, Widgets.ListbarElement>> = React.forwardRef((props, ref) => {
  return <listbar {...{ ...props, ref }} />;
});

export const ListTable: React.FC<Omit<RBProps<Widgets.ListTableOptions, Widgets.ListTableElement>, "items">> = React.forwardRef((props, ref) => {
  return <listtable {...{ ...props, ref }} />;
});

export const Log: React.FC<RBProps<Widgets.LogOptions, Widgets.Log>> = React.forwardRef((props, ref) => {
  return <log {...{ ...props, ref }} />;
});

export const Loading: React.FC<RBProps<Widgets.LoadingOptions & { message: string; isLoading?: boolean }, Widgets.LoadingElement>> = React.forwardRef((props, userRef) => {
  const { isLoading, message, ...rest } = props;
  const ref = React.useRef<Widgets.LoadingElement>();
  React.useEffect(() => {
    if (isLoading) {
      ref.current?.load(message);
    } else {
      ref.current?.stop();
    }
  }, [isLoading]);
  return <loading {...{ ...rest, ref: composeRefs(ref, userRef) }} />;
});

export const Message: React.FC<RBProps<Widgets.MessageOptions, Widgets.MessageElement>> = React.forwardRef((props, ref) => {
  return <message {...{ ...props, ref }} />;
});

export const ProgressBar: React.FC<RBProps<Widgets.ProgressBarOptions, Widgets.ProgressBarElement>> = React.forwardRef((props, ref) => {
  return <progressbar {...{ ...props, ref }} />;
});

export const Prompt: React.FC<
  RBProps<Widgets.PromptOptions, Widgets.PromptElement> & {
    text: string;
    defaultValue?: string;
    onResponse: (responseText: string) => void;
  }
> = React.forwardRef((props, userRef) => {
  const { text, defaultValue = "", onResponse, ...rest } = props;
  const ref = React.useRef<Widgets.PromptElement>();
  React.useEffect(() => {
    ref.current?.input(text, defaultValue, (_err, value) => onResponse(value));
  }, [text, defaultValue, onResponse]);
  return <prompt {...{ ...rest, ref: composeRefs(ref, userRef) }} />;
});

export const Question: React.FC<
  RBProps<Widgets.QuestionOptions, Widgets.QuestionElement> & {
    text: string;
    onResponse: (response: boolean) => void;
  }
> = React.forwardRef((props, userRef) => {
  const { text, onResponse, ...rest } = props;
  const ref = React.useRef<Widgets.QuestionElement>();
  React.useEffect(() => {
    ref.current?.ask(text, (_err, value) => onResponse(!!value));
  }, [text, onResponse]);
  return <question {...{ ...rest, ref: composeRefs(ref, userRef) }} />;
});

export const RadioButton: React.FC<RBProps<Widgets.RadioButtonOptions, Widgets.RadioButtonElement>> = React.forwardRef((props, ref) => {
  return <radiobutton {...{ ...props, ref }} />;
});

export const RadioSet: React.FC<RBProps<Widgets.RadioSetOptions, Widgets.RadioSetElement>> = React.forwardRef((props, ref) => {
  return <radioset {...{ ...props, ref }} />;
});

// @deprecated
export const ScrollableBox: React.FC<RBProps<Widgets.ScrollableBoxOptions, Widgets.BoxElement>> = React.forwardRef((props, ref) => {
  return <scrollablebox {...{ ...props, ref }} />;
});

// @deprecated
export const ScrollableText: React.FC<RBProps<Widgets.BoxOptions, Widgets.BoxElement>> = React.forwardRef((props, ref) => {
  return <scrollabletext {...{ ...props, ref }} />;
});

export const Table: React.FC<RBProps<Widgets.TableOptions, Widgets.TableElement>> = React.forwardRef((props, ref) => {
  // @ts-ignore
  return <table {...{ ...props, ref }} />;
});

export const Text: React.FC<RBProps<Widgets.TextOptions, Widgets.TextElement>> = React.forwardRef((props, ref) => {
  // @ts-ignore
  return <text {...{ ...props, ref }} />;
});

export const Textarea: React.FC<RBProps<Widgets.TextareaOptions, Widgets.TextareaElement> & { onsubmit?: (res: any) => void }> = React.forwardRef((props, ref) => {
  // @ts-ignore
  return <textarea {...{ ...props, ref }} />;
});

export const Textbox: React.FC<RBProps<Widgets.TextboxOptions & Widgets.TextareaOptions, Widgets.TextElement> & { onsubmit?: (res: any) => void }> = React.forwardRef((props, ref) => {
  return <textbox {...{ ...props, ref }} />;
});

export const Terminal: React.FC<RBProps<Widgets.TerminalOptions, Widgets.TerminalElement>> = React.forwardRef((props, ref) => {
  return <terminal {...{ ...props, ref }} />;
});
