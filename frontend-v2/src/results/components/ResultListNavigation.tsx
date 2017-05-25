import { debounce } from "lodash";
import { action } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import * as NumericInput from "react-numeric-input";

import { ViewStore } from "app/ViewStore";
import * as classNames from "classnames";
import { Icon } from "common/components/Icon";
import { scrollToBottom, scrollToTop } from "common/WindowUtils";
import { ResultsPagePicker } from "results/components/ResultsPagePicker";

type ResultListPosition = "top" | "bottom";

interface IResultListNavigationProps {
  viewStore: ViewStore;
  position: ResultListPosition;
}

const yearInputDebounceMs = 500;

function ResultListNavigation({ viewStore, position }: IResultListNavigationProps): JSX.Element {
  let classModifier;
  let goToLocationName;
  let goToIconName;
  let onGoToClick;
  switch (position) {
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

  const yearInputProps = {
  };

  const yearFilter = position === "top" && (
    <label className="results-year-filter">
      Year:
      <NumericInput
        maxLength={4}
        onChange={debounce(handleYearChange(viewStore), yearInputDebounceMs)}
        size={4}
        style={false}
        value={viewStore.resultsParams.year}
      />
    </label>
  );

  return (
    <div className={containerClassName}>
      {yearFilter}

      <ResultsPagePicker
        onChange={debounce(handlePageChange(viewStore), 500)}
        className="results-page-picker"
        pageNo={viewStore.resultsParams.page - 1}
        totalPages={viewStore.totalResultsPages}
      />

      <a className="page-navigation-link" onClick={onGoToClick}>
        Go to {goToLocationName}
        <Icon name={goToIconName} className="page-navigation-link__icon" />
      </a>
    </div>
  );
}

const handlePageChange = (viewStore: ViewStore) => action(({ selected }) => {
  viewStore.resultsParams.page = selected + 1;
});

const handleYearChange = (viewStore: ViewStore) => action((newValue: number) => {
  // if (newValue > 1000) {
  //   viewStore.resultsParams.page = 1;
  //   viewStore.resultsParams.year = newValue;
  // } else if (newValue === null) {
  //   viewStore.resultsParams.page = 1;
  //   viewStore.resultsParams.year = undefined;
  // }
});

const resultListNavigation = observer(ResultListNavigation);
export { resultListNavigation as ResultListNavigation };
