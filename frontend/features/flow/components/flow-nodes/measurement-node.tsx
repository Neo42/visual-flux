import {
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";

import { Grid } from "lucide-react";
import { toast } from "sonner";

import { ComboboxNode } from "@/features/flow/components/flow-nodes/combobox-node";
import {
  NodeData,
  NodeProps,
  NodeType,
} from "@/features/flow/components/flow-nodes/type";
import { NODE_TITLES } from "@/features/flow/components/sidebar/constants";
import { useMeasurements } from "@/features/flow/hooks/use-measurements";

export const MeasurementNode = ({ id }: NodeProps) => {
  const { updateNodeData } = useReactFlow();
  const dateRangeConnections = useHandleConnections({
    type: "target",
    id: "DATE_RANGE" as NodeType,
  });
  const dateRangeNodeData = useNodesData(dateRangeConnections?.[0]?.source);

  const previousNodeData =
    (dateRangeNodeData?.data.result as NodeData["result"]) || {};

  const { data, error } = useMeasurements(previousNodeData);

  if (error) {
    toast.error(error?.message);
  }

  const handleSelectMeasurement = (measurement: string | undefined) => {
    updateNodeData(id, {
      value: measurement,
      result: { ...previousNodeData, measurement },
    });
  };

  return (
    <ComboboxNode
      id={id}
      title={NODE_TITLES.MEASUREMENT}
      icon={Grid}
      selections={data?.measurements}
      upHandleId="DATE_RANGE"
      underHandleId="MEASUREMENT"
      upHandle
      underHandle
      onSelectNodeOption={handleSelectMeasurement}
    />
  );
};
