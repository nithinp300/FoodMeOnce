import React from "react";

function Show(props) {
  let data = props.children;
  if (props.search == null) {
    return <span>{data}</span>;
  }
  console.log("searches", props.search);
  for (let i = 0; i < props.search.length; ++i) {
    const search = props.search[i];
    data = data + "";
    if (data.toLowerCase().includes(search.toLowerCase())) {
      const index = data.toLowerCase().indexOf(search.toLowerCase());
      return (
        <span>
          {data.substring(0, index)}
          <span className="bg-warning">
            {data.substring(index, search.length)}
          </span>
          {data.substring(index + search.length)}
        </span>
      );
    }
  }
  return <span>{data}</span>;
}

export default Show;
