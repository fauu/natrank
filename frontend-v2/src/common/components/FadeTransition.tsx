import * as React from "react";
import Transition from "react-motion-ui-pack";
import { spring } from "react-motion";

export const FadeTransition = (props: { children }) => (
  <Transition
    component="div"
    enter={{ opacity: 1 }}
    leave={{ opacity: 0 }}
  >
    {props.children || <span key="empty" />}
  </Transition>
);
