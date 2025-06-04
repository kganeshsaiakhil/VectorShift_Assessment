// inputNode.js

import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      outputs={[
        { id: "value", position: "50%" }
      ]}
      stateFields={{
        currName: {
          label: "Name",
          dataKey: "inputName",
          defaultValue: id.replace('customInput-', 'input_'),
          type: "text"
        },
        inputType: {
          label: "Type",
          dataKey: "inputType",
          defaultValue: "Text",
          type: "select",
          options: [
            { value: "Text", label: "Text" },
            { value: "File", label: "File" }
          ]
        }
      }}
    />
  );
}
