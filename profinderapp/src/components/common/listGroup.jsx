import React from "react";

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect
}) => {
  if (items.length === 0)
    return (
      <ul className="list-group mt-3">
        <li className="list-group-item clickable">
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </li>
        <li className="list-group-item clickable">
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </li>
        <li className="list-group-item clickable">
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </li>
        <li className="list-group-item clickable">
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </li>
      </ul>
    );

  return (
    <ul className="list-group mt-3">
      {items.map(item => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={
            item === selectedItem
              ? "list-group-item active clickable"
              : "list-group-item clickable"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "id"
};

export default ListGroup;
