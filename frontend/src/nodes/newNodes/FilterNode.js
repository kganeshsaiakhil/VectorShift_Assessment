// FilterNode.js
// A node for filtering data based on criteria

import { BaseNode } from '../BaseNode';

export const FilterNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      inputs={[
        { id: "input", position: "50%" }
      ]}
      outputs={[
        { id: "matched", position: "30%" },
        { id: "unmatched", position: "70%" }
      ]}
      stateFields={{
        filterType: {
          label: "Filter Type",
          dataKey: "filterType",
          defaultValue: "Regex",
          type: "select",
          options: [
            { value: "Regex", label: "Regex" },
            { value: "Contains", label: "Contains" },
            { value: "StartsWith", label: "Starts With" },
            { value: "EndsWith", label: "Ends With" }
          ]
        },
        filterValue: {
          label: "Value",
          dataKey: "filterValue",
          defaultValue: "",
          type: "text"
        }
      }}
    />
  );
};
