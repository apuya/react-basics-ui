import { memo } from 'react';

interface HighlightTextProps {
  text: string;
  query: string;
  highlightClassName?: string;
}

/**
 * Highlights matching portions of text based on the query.
 * Case-insensitive matching with support for special characters.
 */
export const HighlightText = memo(({ text, query, highlightClassName = 'bg-yellow-200 dark:bg-yellow-700' }: HighlightTextProps) => {
  if (!query || !text) {
    return <>{text}</>;
  }

  // Escape special regex characters in the query
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Create regex with global and case-insensitive flags
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  
  // Split text by matches
  const parts = text.split(regex);
  
  return (
    <>
      {parts.map((part, index) => {
        // Check if this part matches the query (case-insensitive)
        const isMatch = regex.test(part);
        // Reset regex lastIndex for next test
        regex.lastIndex = 0;
        
        if (isMatch) {
          return (
            <mark key={index} className={highlightClassName}>
              {part}
            </mark>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
});

HighlightText.displayName = 'HighlightText';
