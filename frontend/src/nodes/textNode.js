// textNode.js

import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      outputs={[
        { id: "output", position: "50%" }
      ]}
      stateFields={{
        currText: {
          label: "Text",
          dataKey: "text",
          defaultValue: "{{input}}",
          type: "text"
        }
      }}
    />
  );
}
