import { debounce } from "lodash";
import { action } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import * as NumericInput from "react-numeric-input";

import { _b } from "common/BemHelper";
import { Icon } from "common/components/Icon";
import { scrollToBottom, scrollToTop } from "common/WindowUtils";
import { ResultsPagePicker } from "results/components/ResultsPagePicker";
import { ResultsViewStore } from "results/ResultsViewStore";

type ResultListPosition = "top" | "bottom";

interface IResultListNavigationProps {
  viewStore: ResultsViewStore;
  position: ResultListPosition;
}

const b = _b;

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

  const containerClassName = b("result-list-navigation")({
    [`${classModifier}`]: true,
  });

  const yearFilter = position === "top" && (
    <label className="results-year-filter">
      Year:
      <NumericInput
        maxLength={4}
        onChange={debounce(handleYearChange(viewStore), yearInputDebounceMs)}
        size={4}
        style={false}
        value={viewStore.state.year}
      />
    </label>
  );

  const pagePicker = viewStore.totalResultsPages > 1 && (
    <ResultsPagePicker
      onChange={debounce(handlePageChange(viewStore), 500)}
      className="results-page-picker"
      pageNo={viewStore.state.page - 1}
      totalPages={viewStore.totalResultsPages}
    />
  );

  return (
    <div className={containerClassName}>
      {yearFilter}

      {pagePicker}

      <a className="page-navigation-link" onClick={onGoToClick}>
        Go to {goToLocationName}
        <Icon name={goToIconName} className={b("page-navigation-link")("icon")()} />
      </a>
    </div>
  );
}

const handlePageChange = (viewStore: ResultsViewStore) => action(({ selected }) => {
  viewStore.state.page = selected + 1;
});

const handleYearChange = (viewStore: ResultsViewStore) => action((newValue: number) => {
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
