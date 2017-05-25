import * as classNames from "classnames";
import * as React from "react";

import { Icon } from "common/components/Icon";

export interface INavigationEntryProps {
  icon: string;
  text: string;
  onClick: () => void;
  isActive: boolean;
}

export function NavigationEntry({ icon, text, onClick, isActive }: INavigationEntryProps) {
  const className = classNames({
    "main-navigation__link": true,
    "main-navigation__link--active": isActive,
  });

  return (
    <a onClick={!isActive && onClick} className={className}>
      <Icon name={icon} />
      {text}
    </a>
  );
}
