// outputNode.js

import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      inputs={[
        { id: "value", position: "50%" }
      ]}
      stateFields={{
        currName: {
          label: "Name",
          dataKey: "outputName",
          defaultValue: id.replace('customOutput-', 'output_'),
          type: "text"
        },
        outputType: {
          label: "Type",
          dataKey: "outputType",
          defaultValue: "Text",
          type: "select",
          options: [
            { value: "Text", label: "Text" },
            { value: "File", label: "Image" }
          ]
        }
      }}
    />
  );
}
