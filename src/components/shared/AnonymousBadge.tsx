import React from "react";
import { Lock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function AnonymousBadge() {
  return (
    <Badge variant="anonymous" icon={<Lock className="w-3 h-3" />}>
      Anonymous
    </Badge>
  );
}
