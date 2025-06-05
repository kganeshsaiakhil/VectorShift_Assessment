// APINode.js
// A node for making API calls

import { BaseNode } from '../BaseNode';

export const APINode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="API Call"
      width={250}
      height={100}
      inputs={[
        { id: "headers", position: "30%" },
        { id: "body", position: "70%" }
      ]}
      outputs={[
        { id: "response", position: "50%" }
      ]}
      stateFields={{
        endpoint: {
          label: "Endpoint",
          dataKey: "endpoint",
          defaultValue: "https://api.example.com",
          type: "text"
        },
        method: {
          label: "Method",
          dataKey: "method",
          defaultValue: "GET",
          type: "select",
          options: [
            { value: "GET", label: "GET" },
            { value: "POST", label: "POST" },
            { value: "PUT", label: "PUT" },
            { value: "DELETE", label: "DELETE" },
            { value: "PATCH", label: "PATCH" }
          ]
        }
      }}
    />
  );
};
