import * as React from "react";
import ReactPaginate = require("react-paginate");

import { Icon } from "common/components/Icon";

interface IResultsPagePickerProps {
  className: string;
  pageNo: number;
  totalPages: number;
  onChange;
}

export const ResultsPagePicker = ({ className, pageNo, totalPages, onChange }: IResultsPagePickerProps) => (
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
