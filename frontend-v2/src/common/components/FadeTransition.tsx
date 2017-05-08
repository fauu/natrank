import { transitionsEnabled } from "app/Config";
import * as React from "react";
import { spring } from "react-motion";
import Transition from "react-motion-ui-pack";

export const FadeTransition = (props: { children }) => {
  if (transitionsEnabled) {
    return (
      <Transition
        component="div"
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
      >
        {props.children || <span key="empty" />}
      </Transition>
    );
  } else {
    return <div>{props.children}</div>;
  }
};
