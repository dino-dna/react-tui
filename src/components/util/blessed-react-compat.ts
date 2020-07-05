import { BlessedNodeHandlers } from "./eventHandlers";
import { ReactNode, Ref } from "react";

export type NoConflictProps<T> = Omit<
  T,
  | "children" // force users to use the React children provisions, no imperative blessed provisions
  | "content" // reconciler handles content internally, thus users should never use blessed imperative-style content via props
> & {
  tid?: string | number;
  children?: ReactNode;
};

export type RBProps<Props, BlessedElement> = NoConflictProps<Props> &
  Partial<BlessedNodeHandlers> & {
    // @todo - do typings better here
    ref?: Ref<BlessedElement>; //React.MutableRefObject<BlessedElement> | any;
  };
