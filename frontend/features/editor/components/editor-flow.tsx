import { nodeTypes } from "@/features/editor/components/editor-nodes";
import { throttle } from "@/lib/utils";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  BackgroundVariant,
  ConnectionLineType,
  useEdgesState,
  addEdge,
  Connection,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import React, { useCallback } from "react";
import { toast } from "sonner";

const initialNodes: Node[] = [
  {
    id: "bucket",
    type: "bucket",
    deletable: false,
    position: {
      x: 400,
      y: 300,
    },
    data: {},
  },
];

export function EditorFlow() {
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "bezier",
            animated: true,
          },
          eds,
        ),
      );
    },
    [setEdges],
  );

  const showToastWarning = throttle(() => {
    toast.warning("Invalid connection", {
      description: "Please connect bucket ⇢ measurement ⇢ field",
    });
  }, 1000);

  const throttleToastWarning = useCallback(showToastWarning, [
    showToastWarning,
  ]);

  const isValidConnection = useCallback(
    (connection: Edge | Connection) => {
      const sourceNode = nodes.find((node) => node.id === connection.source);
      const targetNode = nodes.find((node) => node.id === connection.target);

      if (!sourceNode || !targetNode) return false;

      const validPair1 = ["bucket", "measurement"];
      const validPair2 = ["field", "measurement"];
      const validPair3 = ["filter", "field"];
      const validPair4 = ["filter", "filter"];

      if (
        validPair1.includes(sourceNode.type as string) &&
        validPair1.includes(targetNode.type as string)
      )
        return true;
      if (
        validPair2.includes(sourceNode.type as string) &&
        validPair2.includes(targetNode.type as string)
      )
        return true;

      if (
        validPair3.includes(sourceNode.type as string) &&
        validPair3.includes(targetNode.type as string)
      )
        return true;

      if (
        validPair4.includes(sourceNode.type as string) &&
        validPair4.includes(targetNode.type as string)
      )
        return true;

      throttleToastWarning();
      return false;
    },
    [nodes, throttleToastWarning],
  );

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.Bezier}
        isValidConnection={isValidConnection}
        maxZoom={1}
        proOptions={{ hideAttribution: true }}
      >
        <Controls />
        <MiniMap />
        <Background
          variant={BackgroundVariant.Dots}
          gap={12}
          size={1}
          className="bg-muted"
        />
      </ReactFlow>
    </main>
  );
}
