import { createContext, useContext } from 'react';

/**
 * Factory function to create a typed context and hook for a component
 * Eliminates duplicate context creation patterns across components
 * 
 * @param componentName - Name of the component (used in error messages)
 * @returns Object containing the Context and useContext hook
 * 
 * @example
 * ```tsx
 * const { Context: ModalContext, useContext: useModalContext } = 
 *   createComponentContext<ModalContextValue>('Modal');
 * ```
 */
export function createComponentContext<T>(componentName: string) {
  const Context = createContext<T | undefined>(undefined);

  const useComponentContext = (): T => {
    const context = useContext(Context);
    if (!context) {
      throw new Error(
        `${componentName} compound components must be used within a ${componentName} component`
      );
    }
    return context;
  };

  /**
   * Hook that returns context value or undefined if not within provider.
   * Use this for components that can work both with and without context.
   */
  const useOptionalComponentContext = (): T | undefined => {
    return useContext(Context);
  };

  return {
    Context,
    useContext: useComponentContext,
    useOptionalContext: useOptionalComponentContext,
  };
}
