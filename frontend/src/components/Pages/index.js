import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class Pages extends Component {
  render() {
    const url = this.props.url;
    const current = parseInt(this.props.current);
    const lastPage = parseInt(this.props.lastPage);
    const pageListsBefore = [];
    const pageListsAfter = [];
    for (let i = current - 2; i < current && i >= 1; ++i) {
      pageListsBefore.push(i);
    }
    for (let i = current + 1; i <= lastPage && i <= current + 2; ++i) {
      pageListsAfter.push(i);
    }
    const pageBeforeRender = pageListsBefore.map(page => (
      <a href={`${url}?page=${page}`}>
        <Button variant="light">{page}</Button>
      </a>
    ));
    const pageAfterRender = pageListsAfter.map(page => (
      <a href={`${url}?page=${page}`}>
        <Button variant="light">{page}</Button>
      </a>
    ));
    return (
      <div className="d-flex justify-content-center">
        {current > 1 && (
          <a href={`${url}?page=1`}>
            <Button variant="light">First</Button>
          </a>
        )}
        {current > 1 && (
          <a href={`${url}?page=${current - 1}`}>
            <Button variant="light">Prev</Button>
          </a>
        )}
        {pageBeforeRender}
        <Button variant="outline-info">{current}</Button>
        {pageAfterRender}
        {current < lastPage && (
          <a href={`${url}?page=${current + 1}`}>
            <Button variant="light">Next</Button>
          </a>
        )}
        <a href={`${url}?page=100`}>
          <Button variant="light">Last</Button>
        </a>
      </div>
    );
  }
}

export default Pages;
