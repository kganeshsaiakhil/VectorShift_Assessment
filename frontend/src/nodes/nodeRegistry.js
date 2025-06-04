// nodeRegistry.js
// This file registers all node types for the application

import { InputNode } from './inputNode';
import { OutputNode } from './outputNode';
import { LLMNode } from './llmNode';
import { TextNode } from './textNode';

// Import the new nodes
import { FilterNode } from './newNodes/FilterNode';
import { DBQueryNode } from './newNodes/DBQueryNode';
import { ImageProcessingNode } from './newNodes/ImageProcessingNode';
import { DataTransformNode } from './newNodes/DataTransformNode';
import { APINode } from './newNodes/APINode';

// Register all node types here
export const nodeTypes = {
  // Original nodes
  customInput: InputNode,
  customOutput: OutputNode,
  llm: LLMNode,
  text: TextNode,
  
  // New nodes
  filter: FilterNode,
  dbQuery: DBQueryNode,
  imageProcessing: ImageProcessingNode,
  dataTransform: DataTransformNode,
  api: APINode
};

// Function to get node initial data based on type
export const getInitNodeData = (nodeID, type) => {
  // Basic data all nodes should have
  const baseData = { id: nodeID, nodeType: type };
  
  // Add type-specific initial data
  switch (type) {
    case 'customInput':
      return { 
        ...baseData, 
        inputName: nodeID.replace('customInput-', 'input_'),
        inputType: 'Text'
      };
    case 'customOutput':
      return { 
        ...baseData, 
        outputName: nodeID.replace('customOutput-', 'output_'),
        outputType: 'Text'
      };
    case 'text':
      return { 
        ...baseData, 
        text: '{{input}}'
      };
    case 'filter':
      return {
        ...baseData,
        filterType: 'Regex',
        filterValue: ''
      };
    case 'dbQuery':
      return {
        ...baseData,
        dbType: 'SQL',
        query: 'SELECT * FROM table'
      };
    case 'imageProcessing':
      return {
        ...baseData,
        operation: 'Resize',
        parameters: '{"width": 800, "height": 600}'
      };
    case 'dataTransform':
      return {
        ...baseData,
        transformType: 'JSON to CSV',
        config: '{}'
      };
    case 'api':
      return {
        ...baseData,
        endpoint: 'https://api.example.com',
        method: 'GET'
      };
    default:
      return baseData;
  }
};
