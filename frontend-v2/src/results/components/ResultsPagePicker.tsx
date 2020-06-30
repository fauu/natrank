import * as React from "react";
import * as ReactPaginate from "react-paginate";

import { Icon } from "common/components/Icon";

interface IResultsPagePickerProps {
  className: string;
  pageNo: number;
  totalPages: number;
  onChange;
}

export function ResultsPagePicker({ className, pageNo, totalPages, onChange }: IResultsPagePickerProps): JSX.Element {
  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={pageNo}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      previousLabel={<Icon name="chevron-left" />}
      nextLabel={<Icon name="chevron-right" />}
      breakLabel={"…"}
      breakClassName={"results-page-picker__break"}
      onPageChange={onChange}
      disableInitialCallback={true}
      containerClassName={className}
      activeClassName={"active"}
    />
  );
}
