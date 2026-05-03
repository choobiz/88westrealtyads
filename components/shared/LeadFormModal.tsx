"use client";

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

interface LeadFormModalProps {
  open: boolean;
  onClose: () => void;
  contextHeadline?: string;
  contextSubtitle?: string;
  children: ReactNode;
}

export default function LeadFormModal({
  open,
  onClose,
  contextHeadline,
  contextSubtitle,
  children,
}: LeadFormModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-eightyw-blue/70 backdrop-blur-sm cursor-default"
      />
      <div className="relative w-full max-w-md my-8 bg-white rounded-2xl shadow-2xl border-t-4 border-brand-red overflow-hidden">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center bg-eightyw-light hover:bg-eightyw-border rounded-full text-eightyw-blue transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        {(contextHeadline || contextSubtitle) && (
          <div className="px-5 md:px-6 pt-6 pb-3 border-b border-eightyw-border bg-eightyw-light">
            {contextHeadline && (
              <p className="text-brand-red text-[11px] font-semibold uppercase tracking-[2px] mb-1">
                {contextHeadline}
              </p>
            )}
            {contextSubtitle && (
              <p className="text-eightyw-blue text-base md:text-lg font-bold leading-snug">
                {contextSubtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
