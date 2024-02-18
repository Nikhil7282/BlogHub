import React from "react";
import { Pagination } from "react-bootstrap";

function PaginationComp({ page, setPage, length }) {
  length = Math.ceil(length);

  const selectPageHandler = (selectedPage) => {
    setPage(selectedPage);
  };

  const selectFirst = () => {
    setPage(1);
  };

  const selectLast = () => {
    setPage(length);
  };

  const selectPrev = () => {
    setPage(page - 1);
  };
  const selectNext = () => {
    setPage(page + 1);
  };

  return (
    <Pagination>
      <Pagination.First onClick={() => selectFirst()} disabled={page === 1} />
      <Pagination.Prev onClick={() => selectPrev()} disabled={page === 1} />

      {[...Array(length)].map((_, i) => {
        return (
          <Pagination.Item
            style={{ color: "#343a40" }}
            key={i}
            active={i + 1 === page}
            onClick={() => {
              selectPageHandler(i + 1);
            }}
          >
            {i + 1}
          </Pagination.Item>
        );
      })}
      <Pagination.Next
        onClick={() => selectNext()}
        disabled={page === length}
      />
      <Pagination.Last
        onClick={() => selectLast()}
        disabled={page === length}
      />
    </Pagination>
  );
}

export default PaginationComp;
