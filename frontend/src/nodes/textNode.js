// textNode.js

import { useMemo, useState } from 'react';
import { BaseNode } from './BaseNode';

//  Extract all unique variable names in {{variableName}} format
function extractVariables(text) {
  const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
  const vars = new Set();
  let match;
  while ((match = regex.exec(text))) {
    vars.add(match[1]);
  }
  return Array.from(vars);
}

export const TextNode = ({ id, data }) => {
  //  State for the text input (controlled component)
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  //  Parse variables from the text input
  const variables = useMemo(() => extractVariables(currText), [currText]);

  //  Create input handles for each variable
  const inputs = variables.map((v, i) => ({
    id: v,
    position: `${((i + 1) * 100) / (variables.length + 1)}%` // Evenly space handles
  }));

  //  Auto-resize node based on text content
  const lines = currText.split('\n').length;
  const maxLineLength = Math.max(...currText.split('\n').map(l => l.length), 20);
  const width = Math.min(600, Math.max(220, maxLineLength * 9)); // 9px per char approx
  const height = Math.max(60, Math.min(400, lines * 28 + 40)); // 28px per line + header

  //  Render the BaseNode with dynamic handles and size
  return (
    <BaseNode
      id={id}
      data={{ ...data, text: currText }}
      title="Text"
      inputs={inputs}
      outputs={[{ id: 'output', position: '50%' }]}
      width={width}
      height={height}
      stateFields={{
        currText: {
          label: 'Text',
          dataKey: 'text',
          defaultValue: '{{input}}',
          type: 'text',
          multiline: true,
          minRows: 2,
          onChange: (e) => setCurrText(e.target.value),
          value: currText
        }
      }}
      children={null}
    />
  );
};
