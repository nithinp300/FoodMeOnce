import React from "react";

const getFormatNum = num => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function Show(props) {
  let data = props.children;
  let formattedData = data;
  if (props.format) {
    formattedData = getFormatNum(data);
  }
  if (props.search == null) {
    return <span>{formattedData}</span>;
  }

  for (let i = 0; i < props.search.length; ++i) {
    const search = props.search[i];
    data = data + "";
    if (data.toLowerCase().includes(search.toLowerCase())) {
      const index = data.toLowerCase().indexOf(search.toLowerCase());
      return (
        <span>
          {data.substring(0, index)}
          <span className="bg-warning">
            {/* {!props.format && data.substring(index, index + search.length)} */}
            {/* {props.format &&
              returnFormatted(formattedData, data, index, search)} */}
            {data.substring(index, index + search.length)}
          </span>
          {data.substring(index + search.length)}
        </span>
      );
    }
  }
  return <span>{data}</span>;
}

export default Show;
