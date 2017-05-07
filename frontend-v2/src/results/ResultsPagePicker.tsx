import * as React from "react";
import ReactPaginate = require("react-paginate");
import { Icon } from "../common/Icon";

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
    breakClassName={"break-me"}
    onPageChange={props.onChange}
    disableInitialCallback={true}
    containerClassName={props.className}
    activeClassName={"active"}
  />
);
