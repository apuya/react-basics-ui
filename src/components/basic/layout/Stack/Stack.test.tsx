import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Stack, HStack, VStack } from './Stack';

describe('Stack', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Stack data-testid="stack">Content</Stack>);
      expect(screen.getByTestId('stack')).toBeInTheDocument();
    });

    it('renders children content', () => {
      render(
        <Stack>
          <span>Item 1</span>
          <span>Item 2</span>
        </Stack>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('renders as div element', () => {
      render(<Stack data-testid="stack">Content</Stack>);
      expect(screen.getByTestId('stack').tagName).toBe('DIV');
    });
  });

  describe('Direction', () => {
    it('defaults to vertical direction', () => {
      render(<Stack data-testid="stack">Content</Stack>);
      expect(screen.getByTestId('stack')).toHaveAttribute('data-direction', 'vertical');
      expect(screen.getByTestId('stack')).toHaveClass('flex-col');
    });

    it('applies horizontal direction', () => {
      render(
        <Stack direction="horizontal" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveAttribute('data-direction', 'horizontal');
      expect(screen.getByTestId('stack')).toHaveClass('flex-row');
    });

    it('applies vertical direction explicitly', () => {
      render(
        <Stack direction="vertical" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('flex-col');
    });
  });

  describe('Spacing', () => {
    it('applies preset spacing xs', () => {
      render(
        <Stack spacing="xs" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveAttribute('data-spacing', 'xs');
    });

    it('applies preset spacing sm', () => {
      render(
        <Stack spacing="sm" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveAttribute('data-spacing', 'sm');
    });

    it('applies preset spacing md', () => {
      render(
        <Stack spacing="md" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveAttribute('data-spacing', 'md');
    });

    it('applies preset spacing lg', () => {
      render(
        <Stack spacing="lg" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveAttribute('data-spacing', 'lg');
    });

    it('applies preset spacing xl', () => {
      render(
        <Stack spacing="xl" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveAttribute('data-spacing', 'xl');
    });

    it('applies preset spacing 2xl', () => {
      render(
        <Stack spacing="2xl" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveAttribute('data-spacing', '2xl');
    });

    it('applies numeric spacing as rem via style', () => {
      render(
        <Stack spacing={2} data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveStyle({ gap: '2rem' });
    });

    it('applies custom string spacing via style', () => {
      render(
        <Stack spacing="20px" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveStyle({ gap: '20px' });
    });

    it('does not set data-spacing for custom spacing values', () => {
      render(
        <Stack spacing="20px" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).not.toHaveAttribute('data-spacing');
    });
  });

  describe('Alignment', () => {
    it('applies align start', () => {
      render(
        <Stack align="start" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('items-start');
    });

    it('applies align center', () => {
      render(
        <Stack align="center" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('items-center');
    });

    it('applies align end', () => {
      render(
        <Stack align="end" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('items-end');
    });

    it('applies align stretch', () => {
      render(
        <Stack align="stretch" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('items-stretch');
    });

    it('applies align baseline', () => {
      render(
        <Stack align="baseline" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('items-baseline');
    });
  });

  describe('Justify', () => {
    it('applies justify start', () => {
      render(
        <Stack justify="start" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('justify-start');
    });

    it('applies justify center', () => {
      render(
        <Stack justify="center" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('justify-center');
    });

    it('applies justify end', () => {
      render(
        <Stack justify="end" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('justify-end');
    });

    it('applies justify between', () => {
      render(
        <Stack justify="between" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('justify-between');
    });

    it('applies justify around', () => {
      render(
        <Stack justify="around" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('justify-around');
    });

    it('applies justify evenly', () => {
      render(
        <Stack justify="evenly" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('justify-evenly');
    });
  });

  describe('Wrap', () => {
    it('applies nowrap', () => {
      render(
        <Stack wrap="nowrap" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('flex-nowrap');
    });

    it('applies wrap', () => {
      render(
        <Stack wrap="wrap" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('flex-wrap');
    });

    it('applies wrap-reverse', () => {
      render(
        <Stack wrap="wrap-reverse" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('flex-wrap-reverse');
    });
  });

  describe('Inline', () => {
    it('defaults to flex display', () => {
      render(<Stack data-testid="stack">Content</Stack>);
      expect(screen.getByTestId('stack')).toHaveClass('flex');
    });

    it('applies inline-flex when inline is true', () => {
      render(
        <Stack inline data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('inline-flex');
      expect(screen.getByTestId('stack')).not.toHaveClass('flex');
    });
  });

  describe('Divider', () => {
    it('inserts divider between children', () => {
      render(
        <Stack divider={<hr data-testid="divider" />}>
          <span>Item 1</span>
          <span>Item 2</span>
          <span>Item 3</span>
        </Stack>
      );
      const dividers = screen.getAllByTestId('divider');
      expect(dividers).toHaveLength(2);
    });

    it('does not add divider after last child', () => {
      render(
        <Stack divider={<hr data-testid="divider" />}>
          <span>Item 1</span>
          <span>Item 2</span>
        </Stack>
      );
      const dividers = screen.getAllByTestId('divider');
      expect(dividers).toHaveLength(1);
    });

    it('does not render divider when no children', () => {
      render(<Stack divider={<hr data-testid="divider" />} data-testid="stack" />);
      expect(screen.queryByTestId('divider')).not.toBeInTheDocument();
    });

    it('does not render divider with single child', () => {
      render(
        <Stack divider={<hr data-testid="divider" />}>
          <span>Only Item</span>
        </Stack>
      );
      expect(screen.queryByTestId('divider')).not.toBeInTheDocument();
    });
  });

  describe('Custom className', () => {
    it('applies custom className', () => {
      render(
        <Stack className="custom-class" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveClass('custom-class');
    });

    it('merges custom className with default classes', () => {
      render(
        <Stack className="custom-class" data-testid="stack">
          Content
        </Stack>
      );
      const stack = screen.getByTestId('stack');
      expect(stack).toHaveClass('flex');
      expect(stack).toHaveClass('flex-col');
      expect(stack).toHaveClass('custom-class');
    });
  });

  describe('Custom style', () => {
    it('applies custom style', () => {
      render(
        <Stack style={{ minHeight: '100px' }} data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId('stack')).toHaveStyle({ minHeight: '100px' });
    });

    it('merges custom style with spacing style', () => {
      render(
        <Stack spacing={2} style={{ minHeight: '100px' }} data-testid="stack">
          Content
        </Stack>
      );
      const stack = screen.getByTestId('stack');
      expect(stack).toHaveStyle({ gap: '2rem' });
      expect(stack).toHaveStyle({ minHeight: '100px' });
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to Stack div element', () => {
      let refValue: HTMLDivElement | null = null;
      render(
        <Stack
          ref={(el) => {
            refValue = el;
          }}
        >
          Content
        </Stack>
      );
      expect(refValue).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to HStack div element', () => {
      let refValue: HTMLDivElement | null = null;
      render(
        <HStack
          ref={(el) => {
            refValue = el;
          }}
        >
          Content
        </HStack>
      );
      expect(refValue).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to VStack div element', () => {
      let refValue: HTMLDivElement | null = null;
      render(
        <VStack
          ref={(el) => {
            refValue = el;
          }}
        >
          Content
        </VStack>
      );
      expect(refValue).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('HTML Attributes', () => {
    it('forwards additional HTML attributes', () => {
      render(
        <Stack data-custom="value" data-testid="stack" aria-label="Stack container">
          Content
        </Stack>
      );
      const stack = screen.getByTestId('stack');
      expect(stack).toHaveAttribute('data-custom', 'value');
      expect(stack).toHaveAttribute('aria-label', 'Stack container');
    });
  });
});

describe('HStack', () => {
  it('renders with horizontal direction', () => {
    render(<HStack data-testid="hstack">Content</HStack>);
    expect(screen.getByTestId('hstack')).toHaveAttribute('data-direction', 'horizontal');
    expect(screen.getByTestId('hstack')).toHaveClass('flex-row');
  });

  it('applies spacing', () => {
    render(
      <HStack spacing="md" data-testid="hstack">
        Content
      </HStack>
    );
    expect(screen.getByTestId('hstack')).toHaveAttribute('data-spacing', 'md');
  });

  it('applies alignment', () => {
    render(
      <HStack align="center" data-testid="hstack">
        Content
      </HStack>
    );
    expect(screen.getByTestId('hstack')).toHaveClass('items-center');
  });

  it('applies justify', () => {
    render(
      <HStack justify="between" data-testid="hstack">
        Content
      </HStack>
    );
    expect(screen.getByTestId('hstack')).toHaveClass('justify-between');
  });

  it('has displayName HStack', () => {
    expect(HStack.displayName).toBe('HStack');
  });
});

describe('VStack', () => {
  it('renders with vertical direction', () => {
    render(<VStack data-testid="vstack">Content</VStack>);
    expect(screen.getByTestId('vstack')).toHaveAttribute('data-direction', 'vertical');
    expect(screen.getByTestId('vstack')).toHaveClass('flex-col');
  });

  it('applies spacing', () => {
    render(
      <VStack spacing="lg" data-testid="vstack">
        Content
      </VStack>
    );
    expect(screen.getByTestId('vstack')).toHaveAttribute('data-spacing', 'lg');
  });

  it('applies alignment', () => {
    render(
      <VStack align="end" data-testid="vstack">
        Content
      </VStack>
    );
    expect(screen.getByTestId('vstack')).toHaveClass('items-end');
  });

  it('has displayName VStack', () => {
    expect(VStack.displayName).toBe('VStack');
  });
});

describe('DisplayName', () => {
  it('Stack has correct displayName', () => {
    expect(Stack.displayName).toBe('Stack');
  });

  it('HStack has correct displayName', () => {
    expect(HStack.displayName).toBe('HStack');
  });

  it('VStack has correct displayName', () => {
    expect(VStack.displayName).toBe('VStack');
  });
});
