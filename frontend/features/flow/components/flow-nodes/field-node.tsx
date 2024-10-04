import * as React from "react";

import {
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";

import { RectangleEllipsis } from "lucide-react";
import { toast } from "sonner";

import { ComboboxNode } from "@/features/flow/components/flow-nodes/combobox-node";
import {
  NodeData,
  NodeProps,
  NodeType,
} from "@/features/flow/components/flow-nodes/types";
import { NODE_TITLES } from "@/features/flow/components/sidebar/constants";
import { useFields } from "@/features/flow/hooks/use-fields";

export const FieldNode = ({ id }: NodeProps) => {
  const { updateNodeData } = useReactFlow();
  const measurementConnections = useHandleConnections({
    type: "target",
    id: "MEASUREMENT" as NodeType,
  });
  const measurementNodeData = useNodesData(measurementConnections?.[0]?.source);

  const previousNodeData = React.useMemo(
    () => (measurementNodeData?.data.result as NodeData["result"]) || {},
    [measurementNodeData],
  );

  const { data, error } = useFields(previousNodeData);

  if (error) {
    toast.error(error?.message);
  }

  const handleSelectField = (field: string | undefined) => {
    updateNodeData(id, {
      value: field,
      result: { ...previousNodeData, field },
    });
  };

  const [isPreviousNodeValueChanged, setIsPreviousNodeValueChanged] =
    React.useState(false);
  const previousMeasurementRef = React.useRef(previousNodeData?.measurement);

  React.useEffect(() => {
    if (previousNodeData?.measurement !== previousMeasurementRef.current) {
      previousMeasurementRef.current = previousNodeData?.measurement;
      setIsPreviousNodeValueChanged(true);
    }
  }, [previousNodeData]);

  React.useEffect(() => {
    if (isPreviousNodeValueChanged) {
      setIsPreviousNodeValueChanged(false);
    }
  }, [isPreviousNodeValueChanged]);

  return (
    <ComboboxNode
      id={id}
      title={NODE_TITLES.FIELD}
      icon={RectangleEllipsis}
      selections={data?.fields}
      upHandleId="MEASUREMENT"
      underHandleId="FIELD"
      upHandle
      underHandle
      onSelectNodeOption={handleSelectField}
      isPreviousNodeValueChanged={isPreviousNodeValueChanged}
    />
  );
};
