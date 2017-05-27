import * as classNames from "classnames";
import * as React from "react";

import { _b } from "common/BemHelper";
import { Icon } from "common/components/Icon";

export interface INavigationEntryProps {
  icon: string;
  text: string;
  onClick: () => void;
  isActive: boolean;
}

const b = _b("main-navigation");

export function NavigationEntry({ icon, text, onClick, isActive }: INavigationEntryProps) {
  return (
    <a onClick={!isActive && onClick} className={b("link", { active: isActive })}>
      <Icon name={icon} />
      {text}
    </a>
  );
}
