import { Component, type ReactNode, type ErrorInfo } from 'react';
import { Text } from '@/components/typography/Text/Text';

/**
 * Props for DropdownErrorBoundary.
 */
interface DropdownErrorBoundaryProps {
  /** Child components to render */
  children: ReactNode;
  /** Custom fallback UI to display on error */
  fallback?: ReactNode;
  /** Callback invoked when an error is caught */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

/**
 * State for DropdownErrorBoundary.
 */
interface DropdownErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary component for Dropdown to catch and handle errors gracefully.
 * 
 * Prevents the entire application from crashing if an error occurs within the Dropdown.
 * Displays a user-friendly fallback UI and optionally logs errors for monitoring.
 * 
 * @example
 * ```tsx
 * <DropdownErrorBoundary
 *   fallback={<div>Failed to load menu</div>}
 *   onError={(error) => console.error('Dropdown error:', error)}
 * >
 *   <Dropdown>...</Dropdown>
 * </DropdownErrorBoundary>
 * ```
 */
export class DropdownErrorBoundary extends Component<
  DropdownErrorBoundaryProps,
  DropdownErrorBoundaryState
> {
  constructor(props: DropdownErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): DropdownErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to error reporting service
    this.props.onError?.(error, errorInfo);
    
    // eslint-disable-next-line no-console
    console.error('Dropdown Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render custom fallback or default error UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--semantic-status-error-alpha)] border border-[var(--semantic-status-error-light)]"
          role="alert"
        >
          <svg
            className="w-4 h-4 text-[var(--semantic-text-error)] flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <Text size="small" weight="medium" color="error">
            Failed to load dropdown
          </Text>
        </div>
      );
    }

    return this.props.children;
  }
}
