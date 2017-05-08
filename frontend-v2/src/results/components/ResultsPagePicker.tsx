import { Icon } from "common/components/Icon";
import * as React from "react";
import ReactPaginate = require("react-paginate");

interface IResultsPagePickerProps {
  className: string;
  pageNo: number;
  totalPages: number;
  onChange;
}

export const ResultsPagePicker = (props: IResultsPagePickerProps) => (
  <ReactPaginate
    pageCount={props.totalPages}
    forcePage={props.pageNo}
    pageRangeDisplayed={5}
    marginPagesDisplayed={1}
    previousLabel={<Icon name="chevron-left" />}
    nextLabel={<Icon name="chevron-right" />}
    breakLabel={"…"}
    breakClassName={"results-page-picker__break"}
    onPageChange={props.onChange}
    disableInitialCallback={true}
    containerClassName={props.className}
    activeClassName={"active"}
  />
);
