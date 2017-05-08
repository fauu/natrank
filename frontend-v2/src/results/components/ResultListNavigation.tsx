import * as classNames from "classnames";
import { Icon } from "common/components/Icon";
import { scrollToBottom, scrollToTop } from "common/WindowUtils";
import { debounce } from "lodash";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { ResultsPagePicker } from "results/components/ResultsPagePicker";
import { ResultsStore } from "results/ResultsStore";

interface IResultListNavigationProps {
  resultsStore?: ResultsStore;
  onPageChange;
  position: string;
}

@inject("resultsStore")
@observer
export class ResultListNavigation extends React.Component<IResultListNavigationProps, {}> {

  public render() {
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
          onChange={debounce(this.props.onPageChange, 500)}
          className="results-page-picker"
          pageNo={this.props.resultsStore.matchPage.no}
          totalPages={this.props.resultsStore.matchPage.totalPages}
        />
        <a className="page-navigation-link" onClick={onGoToClick}>
          Go to {goToLocationName}
          <Icon name={goToIconName} className="page-navigation-link__icon" />
        </a>
      </div>
    );
  }

}
