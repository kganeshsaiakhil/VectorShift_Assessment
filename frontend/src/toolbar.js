// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginBottom: '10px' }}>
                <h3 style={{ marginBottom: '5px' }}>Basic Nodes</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    <DraggableNode type='customInput' label='Input' />
                    <DraggableNode type='llm' label='LLM' />
                    <DraggableNode type='customOutput' label='Output' />
                    <DraggableNode type='text' label='Text' />
                </div>
            </div>
            
            <div style={{ marginTop: '20px' }}>
                <h3 style={{ marginBottom: '5px' }}>Advanced Nodes</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    <DraggableNode type='filter' label='Filter' />
                    <DraggableNode type='dbQuery' label='DB Query' />
                    <DraggableNode type='imageProcessing' label='Image Processing' />
                    <DraggableNode type='dataTransform' label='Data Transform' />
                    <DraggableNode type='api' label='API Call' />
                </div>
            </div>
        </div>
    );
};
