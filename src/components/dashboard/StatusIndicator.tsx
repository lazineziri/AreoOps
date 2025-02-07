import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Status = "active" | "maintenance" | "grounded";

interface StatusIndicatorProps {
  status?: Status;
  className?: string;
  showLabel?: boolean;
  showTooltip?: boolean;
}

const statusConfig = {
  active: {
    color: "bg-green-500",
    label: "Active",
    description: "Aircraft is operational and available for flights",
  },
  maintenance: {
    color: "bg-yellow-500",
    label: "Maintenance",
    description: "Aircraft is undergoing scheduled maintenance",
  },
  grounded: {
    color: "bg-red-500",
    label: "Grounded",
    description: "Aircraft is temporarily out of service",
  },
};

const StatusIndicator = ({
  status = "active",
  className = "",
  showLabel = true,
  showTooltip = true,
}: StatusIndicatorProps) => {
  const config = statusConfig[status];

  const indicator = (
    <div
      className={cn(
        "flex items-center gap-2 bg-white p-2 rounded-md",
        className,
      )}
    >
      <div className={cn("w-3 h-3 rounded-full", config.color)} />
      {showLabel && (
        <Badge variant="secondary" className="font-medium">
          {config.label}
        </Badge>
      )}
    </div>
  );

  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{indicator}</TooltipTrigger>
          <TooltipContent>
            <p>{config.description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return indicator;
};

export default StatusIndicator;
