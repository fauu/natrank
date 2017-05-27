import { debounce } from "lodash";
import { action } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import * as NumericInput from "react-numeric-input";

import { _b } from "common/BemHelper";
import { Icon } from "common/components/Icon";
import { scrollToBottom, scrollToTop } from "common/WindowUtils";
import { ResultsPagePicker } from "results/components/ResultsPagePicker";
import { ResultsYearFilter } from "results/components/ResultsYearFilter";
import { ResultsViewStore } from "results/ResultsViewStore";

type ResultListPosition = "top" | "bottom";

interface IResultListNavigationProps {
  readonly viewStore: ResultsViewStore;
  readonly position: ResultListPosition;
  readonly showPageNavigationLink: boolean;
}

const b = _b;

const yearFilterDebounceMs = 500;

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

  const pagePicker = viewStore.totalResultsPages > 1 && (
    <ResultsPagePicker
      onChange={debounce(handlePageChange(viewStore), 500)}
      className="results-page-picker"
      pageNo={viewStore.state.page - 1}
      totalPages={viewStore.totalResultsPages}
    />
  );

  const yearFilter = (position === "top" && !viewStore.state.team) && (
    <ResultsYearFilter
      viewStore={viewStore}
      onYearEntry={debounce(handleYearEntry(viewStore), yearFilterDebounceMs)}
    />
  );

  const pageNavigationLink = this.props.showPageNavigationLink && (
    <a className="page-navigation-link" onClick={onGoToClick}>
      Go to {goToLocationName}
      <Icon name={goToIconName} className={b("page-navigation-link")("icon")()} />
    </a>
  );

  return (
    <div className={containerClassName}>
      {yearFilter}

      <div /> {/* "temporary" hack */}

      {pagePicker}

      {pageNavigationLink}
    </div>
  );
}

const handleYearEntry = (viewStore: ResultsViewStore) => action((year: number) => {
  viewStore.state.page = 1;
  viewStore.state.team = undefined;
  viewStore.state.year = year;
});

const handlePageChange = (viewStore: ResultsViewStore) => action(({ selected }) => {
  viewStore.state.page = selected + 1;
});

const resultListNavigation = observer(ResultListNavigation);
export { resultListNavigation as ResultListNavigation };
