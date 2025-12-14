/**
 * Generates a consistent form element ID from a prefix and label.
 * Used to create unique IDs for form inputs when no explicit ID is provided.
 *
 * @param prefix - The component prefix (e.g., 'input', 'select', 'textarea')
 * @param label - The label text to derive the ID from
 * @returns The generated ID string, or undefined if no label is provided
 *
 * @example
 * generateFormId('input', 'Email Address') // 'input-email-address'
 * generateFormId('select', 'Country') // 'select-country'
 * generateFormId('input', undefined) // undefined
 */
export function generateFormId(
  prefix: string,
  label: string | undefined
): string | undefined {
  if (!label) return undefined;
  return `${prefix}-${label.toLowerCase().replace(/\s+/g, '-')}`;
}
