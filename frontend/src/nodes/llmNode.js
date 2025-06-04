// llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      inputs={[
        { id: "system", position: "33.3%" },
        { id: "prompt", position: "66.6%" }
      ]}
      outputs={[
        { id: "response", position: "50%" }
      ]}
    >
      <div>
        <span>This is a LLM.</span>
      </div>
    </BaseNode>
  );
}
