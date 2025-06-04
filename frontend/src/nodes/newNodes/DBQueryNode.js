// DBQueryNode.js
// A node for database queries

import { BaseNode } from '../BaseNode';

export const DBQueryNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Database Query"
      width={250}
      height={100}
      inputs={[
        { id: "parameters", position: "30%" },
        { id: "connection", position: "70%" }
      ]}
      outputs={[
        { id: "results", position: "50%" }
      ]}
      stateFields={{
        dbType: {
          label: "Database Type",
          dataKey: "dbType",
          defaultValue: "SQL",
          type: "select",
          options: [
            { value: "SQL", label: "SQL" },
            { value: "NoSQL", label: "NoSQL" },
            { value: "GraphDB", label: "Graph DB" }
          ]
        },
        query: {
          label: "Query",
          dataKey: "query",
          defaultValue: "SELECT * FROM table",
          type: "text"
        }
      }}
    />
  );
};
