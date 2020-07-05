import * as blessedLib from "neo-blessed";
import createFiberReconciler, { OpaqueHandle } from "react-reconciler";
import merge from "lodash/merge";
import {
  ChildSet,
  Container,
  HostContext,
  HydratableInstance,
  Instance,
  NoTimeout,
  Props,
  PublicInstance,
  TextInstance,
  TimeoutHandle,
  Type,
  UpdatePayload,
  InstanceMeta,
} from "./types";
import update from "./update";

const emptyObject = {};

const copy: <T>(o: T) => T = (o) => merge.apply(null, [{}, o]);

const metaByInstance = new WeakMap<Instance, InstanceMeta>();

export const toInstanceString = ({ type }: Instance) => `<${type} />`; // ${tid ? `tid=${tid}` : ""}

/**
 * createInstance as common entrypoint for handler.createInstance and
 * handler.createTextInstance
 */
const createInstance = (
  type: Type,
  props: Props,
  rootContainerInstance: Container,
  hostContext: HostContext,
  internalInstanceHandle: OpaqueHandle,
  blessed: typeof blessedLib,
  screen: blessedLib.Widgets.Screen,
  debug: any
): Instance => {
  const { children, ...appliedProps } = copy(props);
  const element = ((blessed as any)[type] as any)({
    ...appliedProps,
    screen,
  } as any) as blessedLib.Widgets.BlessedElement;
  const instance: Instance = element;
  const meta = {
    type,
    props,
    eventListener: (channel: any, evt: string) => {
      eventListener(debug)(instance, channel, evt);
    },
  };
  element.on("event" as any, meta.eventListener as any);
  metaByInstance.set(instance, meta);
  debug(`created - ${toInstanceString(instance)}`);
  return instance;
};

export const createReconciler = ({
  blessed,
  screen,
  renderScreen,
  debug,
}: {
  blessed: typeof blessedLib;
  screen: blessedLib.Widgets.Screen;
  renderScreen: () => void;
  debug: (...args: any[]) => void;
}) =>
  createFiberReconciler<
    Type,
    Props,
    Container,
    Instance,
    TextInstance,
    HydratableInstance,
    PublicInstance,
    HostContext,
    UpdatePayload,
    ChildSet,
    TimeoutHandle,
    NoTimeout
  >({
    supportsHydration: false,
    isPrimaryRenderer: true,
    cancelDeferredCallback: () => {},
    supportsMutation: true,
    supportsPersistence: false,
    getRootHostContext: (_rootContainerInstance) => {
      debug("getRootHostContext");
      return emptyObject;
    },
    getChildHostContext(
      parentHostContext: HostContext,
      type: string
    ): HostContext {
      debug("getChildHostContext");
      return emptyObject;
    },
    getPublicInstance(instance) {
      debug("getPublicInstance");
      return instance;
    },

    createInstance(
      type,
      props,
      rootContainerInstance,
      hostContext,
      internalInstanceHandle
    ) {
      debug(`createInstance - ${type}`);
      return createInstance(
        type,
        props,
        rootContainerInstance,
        hostContext,
        internalInstanceHandle,
        blessed,
        screen,
        debug
      );
    },

    appendInitialChild(parentInstance, child): void {
      debug(
        `appendInitialChild ${toInstanceString(
          parentInstance
        )} => ${toInstanceString(child)}`
      );
      parentInstance.append(child);
    },

    finalizeInitialChildren(
      instance: Instance,
      type: string,
      props: Props,
      rootContainerInstance: Container
    ): boolean {
      const { children, ...appliedProps } = copy(props);
      update(instance, appliedProps);
      metaByInstance.get(instance)!.props = props;
      debug(`finalizeInitialChildren ${toInstanceString(instance)}`);
      return false;
    },

    prepareUpdate(
      instance,
      type,
      oldProps,
      newProps,
      rootContainerInstance,
      hostContext
    ) {
      debug(`prepareUpdate ${toInstanceString(instance)}`);
      return copy(newProps);
    },

    shouldSetTextContent(props) {
      return false;
    },

    shouldDeprioritizeSubtree(type, props) {
      return !!props.hidden;
    },

    now: Date.now,

    createTextInstance(
      text,
      rootContainerInstance,
      hostContext,
      internalInstanceHandle
    ) {
      const instance = createInstance(
        "text",
        { tags: true },
        rootContainerInstance,
        hostContext,
        internalInstanceHandle,
        blessed,
        screen,
        debug
      );
      instance.setContent(text);
      return instance;
    },

    scheduleDeferredCallback(a) {
      throw new Error("Unimplemented");
    },

    prepareForCommit() {
      debug("prepareForCommit");
      // noop
    },

    resetAfterCommit() {
      debug("resetAfterCommit");
      renderScreen();
    },

    commitMount(
      instance: Instance,
      type: string,
      newProps: Props,
      internalInstanceHandle: Object
    ) {
      throw new Error(
        "commitMount not implemented. Please post a reproducible use case that calls this method at https://github.com/dino-dna/react-tui/issues/new"
      );
    },

    commitUpdate(
      instance,
      updatePayload,
      type,
      oldProps,
      newProps,
      internalInstanceHandle
    ) {
      update(instance, updatePayload);
      // update event handler pointers
      metaByInstance.get(instance)!.props = newProps;
      debug(`commitUpdate ${toInstanceString(instance)}`);
      renderScreen();
    },

    commitTextUpdate(
      instance: TextInstance,
      oldText: string,
      newText: string
    ): void {
      instance.setContent(newText);
      debug(`commitTextUpdate ${toInstanceString(instance)}`);
      renderScreen();
    },

    appendChild(parentInstance, child): void {
      debug(
        `appendChild ${toInstanceString(parentInstance)} => ${toInstanceString(
          child
        )}`
      );
      parentInstance.append(child);
    },

    appendChildToContainer(parentInstance, child): void {
      debug(
        `appendChildToContainer ${toInstanceString(
          parentInstance
        )} => ${toInstanceString(child)}`
      );
      parentInstance.append(child);
      // @todo uhhh this was a guess, the last impl just did ^
      // parentInstance.element.append(child as any);
      // screen.append(child);
    },

    insertBefore(parentInstance, child: Instance, beforeChild) {
      debug(
        `insertBefore ${toInstanceString(parentInstance)} => ${toInstanceString(
          child
        )}`
      );
      // pretty sure everything is absolutely positioned so insertBefore ~= append
      parentInstance.append(child);
    },

    insertInContainerBefore(
      parentInstance,
      child: Instance,
      beforeChild
    ): void {
      // pretty sure everything is absolutely positioned so insertBefore ~= append
      // parentInstance.append(child as any);
      debug(
        `insertInContainerBefore parentInstance => ${toInstanceString(child)}`
      );
      parentInstance.append(child);
    },

    removeChild(parentInstance: Instance, child: Instance): void {
      parentInstance.remove(child);
      const { eventListener } = metaByInstance.get(child)!;
      child.off("event", eventListener);
      child.forDescendants(function (el) {
        el.off("event", eventListener);
      }, null);
      debug(
        `removeChild ${toInstanceString(parentInstance)} => ${toInstanceString(
          child
        )}`
      );
      child.destroy();
    },

    removeChildFromContainer(parentInstance, child) {
      parentInstance.remove(child);
      const eventListener = metaByInstance.get(child)?.eventListener!;
      child.off("event", eventListener);
      child.forDescendants(function (el) {
        el.off("event", eventListener);
      }, null);
      debug(
        `removeChildFromContainer ${toInstanceString(
          parentInstance
        )} => ${toInstanceString(child)}`
      );
      child.destroy();
    },

    resetTextContent(instance: Instance): void {
      debug(`resetTextContent ${toInstanceString(instance)}`);
      instance.setContent("");
    },

    // schedulePassiveEffects(effect) {
    //   effect();
    //   runningEffects.push(effect);
    // },

    // cancelPassiveEffects() {
    //   runningEffects.forEach((effect) => effect.cancel());
    //   runningEffects = [];
    // },
    setTimeout,
    clearTimeout,
    noTimeout: null,
  });

/**
 * Pipe handlers, a la `<box onclick={...} />`
 * from the event emitters into user declared props callbacks
 */
export const eventListener = (debug: any) => (
  node: Instance,
  event: string,
  ...args: any[]
) => {
  // debug(`event [${event}] - ${toInstanceString(node)}`);
  const { props } = metaByInstance.get(node)!;
  const handler = props[`on${event}`];
  if (typeof handler === "function") {
    // focus & blur are generally screen events, which is obscure.
    // give the blurred/focussed element
    if (event === "focus" || event === "blur") {
      args[0] = node;
    }
    handler(node, event, ...args);
  }
};
