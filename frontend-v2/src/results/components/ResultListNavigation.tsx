import { debounce } from "lodash";
import { action } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";

import { AppStore } from "app/AppStore";
import { ViewStore } from "app/ViewStore";
import * as classNames from "classnames";
import { Icon } from "common/components/Icon";
import { scrollToBottom, scrollToTop } from "common/WindowUtils";
import { ResultsPagePicker } from "results/components/ResultsPagePicker";

interface IResultListNavigationProps {
  appStore: AppStore;
  position: string;
}

function ResultListNavigation({ appStore, position }: IResultListNavigationProps) {
  let classModifier;
  let goToLocationName;
  let goToIconName;
  let onGoToClick;
  switch (this.props.position) {
    case "top":
      classModifier = "top";
      goToLocationName = "bottom";
      goToIconName = "chevron-down";
      onGoToClick = scrollToBottom;
      break;
    case "bottom":
      classModifier = "bottom";
      goToLocationName = "top";
      goToIconName = "chevron-up";
      onGoToClick = scrollToTop;
      break;
  }

  const containerClassName = classNames(
    "result-list-navigation",
    `result-list-navigation--${classModifier}`,
  );

  return (
    <div className={containerClassName}>
      <ResultsPagePicker
        onChange={debounce(handlePageChange(appStore.viewStore), 500)}
        className="results-page-picker"
        pageNo={appStore.viewStore.selectedResultsPage - 1}
        totalPages={appStore.viewStore.totalResultsPages}
      />

      <a className="page-navigation-link" onClick={onGoToClick}>
        Go to {goToLocationName}
        <Icon name={goToIconName} className="page-navigation-link__icon" />
      </a>
    </div>
  );
}

const handlePageChange = (viewStore: ViewStore) => action(({ selected }) => {
  viewStore.selectedResultsPage = selected + 1;
});

const resultListNavigation = observer(ResultListNavigation);
export { resultListNavigation as ResultListNavigation };
