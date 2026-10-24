"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import BrandCrown from "@/components/ui/BrandCrown";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  sectionName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-8 my-6 bg-[#120E09] border border-[#6B0E16] rounded-xl text-center flex flex-col items-center gap-4 shadow-xl">
          <div className="flex items-center justify-center gap-2 text-[#E5C158]">
            <BrandCrown className="w-6 h-6" />
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <div className="flex flex-col gap-1 max-w-md">
            <h3 className="font-serif text-lg font-bold text-[#F9F5EC]">
              {this.props.sectionName
                ? `Unable to load ${this.props.sectionName}`
                : "Section Temporarily Unavailable"}
            </h3>
            <p className="font-sans text-xs text-[#E8DCC4]/70 font-light leading-relaxed">
              {this.state.error?.message ||
                "A temporary error occurred while rendering this module."}
            </p>
          </div>
          <button
            onClick={this.handleReset}
            className="px-4 py-2 bg-[#6B0E16] text-[#F9F5EC] border border-[#E5C158]/40 text-xs font-bold font-sans tracking-wider rounded-md hover:bg-[#8B121D] transition-colors flex items-center gap-2 cursor-pointer shadow-md"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>RETRY SECTION</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
