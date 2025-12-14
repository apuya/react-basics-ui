import { describe, it, expect } from 'vitest';
import { generateFormId } from './generateFormId';

describe('generateFormId', () => {
  it('generates id from prefix and label', () => {
    expect(generateFormId('input', 'Email Address')).toBe('input-email-address');
  });

  it('converts label to lowercase', () => {
    expect(generateFormId('select', 'Country')).toBe('select-country');
  });

  it('replaces spaces with hyphens', () => {
    expect(generateFormId('textarea', 'User Bio')).toBe('textarea-user-bio');
  });

  it('handles multiple consecutive spaces', () => {
    expect(generateFormId('input', 'First   Name')).toBe('input-first-name');
  });

  it('returns undefined when label is undefined', () => {
    expect(generateFormId('input', undefined)).toBeUndefined();
  });

  it('works with various prefixes', () => {
    expect(generateFormId('checkbox', 'Accept Terms')).toBe('checkbox-accept-terms');
    expect(generateFormId('radio', 'Option A')).toBe('radio-option-a');
    expect(generateFormId('switch', 'Dark Mode')).toBe('switch-dark-mode');
    expect(generateFormId('slider', 'Volume Level')).toBe('slider-volume-level');
  });

  it('handles single word labels', () => {
    expect(generateFormId('input', 'Name')).toBe('input-name');
  });

  it('handles labels with numbers', () => {
    expect(generateFormId('input', 'Phone 1')).toBe('input-phone-1');
  });
});
