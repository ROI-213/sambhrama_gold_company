import React from "react";
import { AlertCircle, Loader2 } from "lucide-react";

export const LoadingState: React.FC<{ label?: string }> = ({
  label = "Loading information...",
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <Loader2 className="h-8 w-8 animate-spin text-[#B91C1C] mb-3" aria-hidden="true" />
      <p className="text-sm text-[#991B1B]">{label}</p>
    </div>
  );
};

export const ErrorState: React.FC<{
  message: string;
  onRetry?: () => void;
}> = ({ message, onRetry }) => {
  return (
    <div
      role="alert"
      className="rounded-lg border border-red-500/40 bg-red-950/30 p-6 text-center max-w-xl mx-auto"
    >
      <AlertCircle className="h-7 w-7 text-red-400 mx-auto mb-2" aria-hidden="true" />
      <p className="text-sm text-red-200">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex items-center rounded-md border border-[#FFB800]/60 px-4 py-2 text-xs font-medium text-[#991B1B] hover:bg-[#FFB800]/15"
        >
          Try Again
        </button>
      )}
    </div>
  );
};
