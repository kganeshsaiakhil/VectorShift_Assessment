from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: list
    edges: list

def is_dag(nodes, edges):
    from collections import defaultdict, deque
    graph = defaultdict(list)
    indegree = defaultdict(int)
    for edge in edges:
        src = edge.get('source')
        tgt = edge.get('target')
        if src and tgt:
            graph[src].append(tgt)
            indegree[tgt] += 1
            if src not in indegree:
                indegree[src] = 0
    # Kahn's algorithm
    q = deque([n['id'] for n in nodes if indegree[n['id']] == 0])
    visited = 0
    while q:
        node = q.popleft()
        visited += 1
        for neighbor in graph[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                q.append(neighbor)
    return visited == len(nodes)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    nodes = pipeline.nodes
    edges = pipeline.edges
    num_nodes = len(nodes)
    num_edges = len(edges)
    is_dag_result = is_dag(nodes, edges)
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag_result
    }
