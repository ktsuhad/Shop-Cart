import React from "react";
import { CircularProgress } from "@mui/material";

interface LoadingSpinnerProps {
  size?: number;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 24, color = "primary" }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
      <CircularProgress size={size} color={color} />
    </div>
  );
};

export default LoadingSpinner;
