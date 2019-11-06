import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class Pages extends Component {
  render() {
    let querystring = this.props.querystring;
    if (querystring.length > 0) {
      querystring = querystring.substring(1);
    }
    const parsedQuerystring = querystring.split("&");
    querystring = "";
    parsedQuerystring.forEach(query => {
      if (!query.includes("page")) {
        querystring += "&" + query;
      }
    });
    const url = this.props.url;
    const current = parseInt(this.props.current);
    const lastPage = parseInt(this.props.lastPage);
    const pageListsBefore = [];
    const pageListsAfter = [];
    if (current === 2) pageListsBefore.push(1);
    for (let i = current - 2; i < current && i >= 1; ++i) {
      pageListsBefore.push(i);
    }
    for (
      let i = current + 1;
      lastPage > 1 && i <= lastPage && i <= current + 2;
      ++i
    ) {
      pageListsAfter.push(i);
    }
    const pageBeforeRender = pageListsBefore.map((page, i) => (
      <a key={"before" + i} href={`${url}?page=${page}${querystring}`}>
        <Button variant="light">{page}</Button>
      </a>
    ));
    const pageAfterRender = pageListsAfter.map((page, i) => (
      <a key={"after" + i} href={`${url}?page=${page}${querystring}`}>
        <Button variant="light">{page}</Button>
      </a>
    ));
    return (
      <div className="d-flex justify-content-center">
        {current > 1 && lastPage > 1 && (
          <a href={`${url}?page=1${querystring}`}>
            <Button variant="light">First</Button>
          </a>
        )}
        {current > 1 && lastPage > 1 && (
          <a href={`${url}?page=${current - 1}${querystring}`}>
            <Button variant="light">Prev</Button>
          </a>
        )}
        {pageBeforeRender}
        <Button variant="outline-info">{current}</Button>
        {pageAfterRender}
        {current < lastPage && (
          <a href={`${url}?page=${current + 1}${querystring}`}>
            <Button variant="light">Next</Button>
          </a>
        )}
        {lastPage > 1 && (
          <a href={`${url}?page=${lastPage}${querystring}`}>
            <Button variant="light">Last</Button>
          </a>
        )}
      </div>
    );
  }
}

export default Pages;
