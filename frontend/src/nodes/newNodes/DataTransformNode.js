// DataTransformNode.js
// A node for transforming data between formats

import { BaseNode } from '../BaseNode';

export const DataTransformNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Data Transform"
      width={250}
      height={100}
      inputs={[
        { id: "input", position: "50%" }
      ]}
      outputs={[
        { id: "output", position: "50%" }
      ]}
      stateFields={{
        transformType: {
          label: "Transform Type",
          dataKey: "transformType",
          defaultValue: "JSON to CSV",
          type: "select",
          options: [
            { value: "JSON to CSV", label: "JSON to CSV" },
            { value: "CSV to JSON", label: "CSV to JSON" },
            { value: "XML to JSON", label: "XML to JSON" },
            { value: "JSON to XML", label: "JSON to XML" }
          ]
        },
        config: {
          label: "Config",
          dataKey: "config",
          defaultValue: "{}",
          type: "text"
        }
      }}
    />
  );
};
