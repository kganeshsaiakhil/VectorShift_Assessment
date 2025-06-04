// ImageProcessingNode.js
// A node for image processing operations

import { BaseNode } from '../BaseNode';

export const ImageProcessingNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Image Processing"
      width={250}
      height={100}
      inputs={[
        { id: "image", position: "50%" }
      ]}
      outputs={[
        { id: "processedImage", position: "50%" }
      ]}
      stateFields={{
        operation: {
          label: "Operation",
          dataKey: "operation",
          defaultValue: "Resize",
          type: "select",
          options: [
            { value: "Resize", label: "Resize" },
            { value: "Crop", label: "Crop" },
            { value: "Rotate", label: "Rotate" },
            { value: "Filter", label: "Apply Filter" }
          ]
        },
        parameters: {
          label: "Parameters",
          dataKey: "parameters",
          defaultValue: '{"width": 800, "height": 600}',
          type: "text"
        }
      }}
    />
  );
};
