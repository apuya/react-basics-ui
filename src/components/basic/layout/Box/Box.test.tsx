import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Box } from './Box';

describe('Box', () => {
  it('renders with default props', () => {
    render(<Box>Content</Box>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders as a div by default', () => {
    const { container } = render(<Box>Content</Box>);
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('renders as different element types using as prop', () => {
    const { container } = render(<Box as="section">Section content</Box>);
    expect(container.querySelector('section')).toBeInTheDocument();
    expect(screen.getByText('Section content')).toBeInTheDocument();
  });

  it('renders as article element', () => {
    const { container } = render(<Box as="article">Article content</Box>);
    expect(container.querySelector('article')).toBeInTheDocument();
  });

  it('renders as span element', () => {
    const { container } = render(<Box as="span">Span content</Box>);
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  describe('Padding', () => {
    it('applies padding with p prop', () => {
      const { container } = render(<Box p={16}>Content</Box>);
      const box = container.querySelector('div');
      expect(box).toHaveStyle({ padding: '16px' });
    });

    it('applies padding with string value', () => {
      const { container } = render(<Box p="2rem">Content</Box>);
      const box = container.querySelector('div');
      expect(box).toHaveStyle({ padding: '2rem' });
    });

    it('applies horizontal padding with px prop', () => {
      const { container } = render(<Box px={20}>Content</Box>);
      const box = container.querySelector('div');
      expect(box).toHaveStyle({ paddingLeft: '20px', paddingRight: '20px' });
    });

    it('applies vertical padding with py prop', () => {
      const { container } = render(<Box py={24}>Content</Box>);
      const box = container.querySelector('div');
      expect(box).toHaveStyle({ paddingTop: '24px', paddingBottom: '24px' });
    });

    it('applies directional padding', () => {
      const { container } = render(
        <Box pt={8} pr={16} pb={24} pl={32}>
          Content
        </Box>
      );
      const box = container.querySelector('div');
      expect(box).toHaveStyle({
        paddingTop: '8px',
        paddingRight: '16px',
        paddingBottom: '24px',
        paddingLeft: '32px',
      });
    });

    it('px and py override individual padding values', () => {
      const { container } = render(<Box px={20} py={10} pt={5}>Content</Box>);
      const box = container.querySelector('div');
      expect(box).toHaveStyle({
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '10px',
        paddingBottom: '10px',
      });
    });
  });

  describe('Margin', () => {
    it('applies margin with m prop', () => {
      const { container } = render(<Box m={16}>Content</Box>);
      const box = container.querySelector('div');
      expect(box).toHaveStyle({ margin: '16px' });
    });

    it('applies horizontal margin with mx prop', () => {
      const { container } = render(<Box mx={20}>Content</Box>);
      const box = container.querySelector('div');
      expect(box).toHaveStyle({ marginLeft: '20px', marginRight: '20px' });
    });

    it('applies vertical margin with my prop', () => {
      const { container } = render(<Box my={24}>Content</Box>);
      const box = container.querySelector('div');
      expect(box).toHaveStyle({ marginTop: '24px', marginBottom: '24px' });
    });

    it('applies directional margin', () => {
      const { container } = render(
        <Box mt={8} mr={16} mb={24} ml={32}>
          Content
        </Box>
      );
      const box = container.querySelector('div');
      expect(box).toHaveStyle({
        marginTop: '8px',
        marginRight: '16px',
        marginBottom: '24px',
        marginLeft: '32px',
      });
    });
  });

  describe('Sizing', () => {
    it('applies width', () => {
      const { container } = render(<Box w={200}>Content</Box>);
      const box = container.querySelector('div');
      expect(box).toHaveStyle({ width: '200px' });
    });

    it('applies height', () => {
      const { container } = render(<Box h={150}>Content</Box>);
      const box = container.querySelector('div');
      expect(box).toHaveStyle({ height: '150px' });
    });

    it('applies width and height with string values', () => {
      const { container } = render(<Box w="50%" h="100vh">Content</Box>);
      const box = container.querySelector('div');
      expect(box).toHaveStyle({ width: '50%', height: '100vh' });
    });

    it('applies min width', () => {
      const { container } = render(<Box minW={100}>Content</Box>);
      const box = container.querySelector('div');
      expect(box).toHaveStyle({ minWidth: '100px' });
    });

    it('applies max width', () => {
      const { container } = render(<Box maxW={500}>Content</Box>);
      const box = container.querySelector('div');
      expect(box).toHaveStyle({ maxWidth: '500px' });
    });

    it('applies min and max height', () => {
      const { container } = render(<Box minH={50} maxH={300}>Content</Box>);
      const box = container.querySelector('div');
      expect(box).toHaveStyle({ minHeight: '50px', maxHeight: '300px' });
    });
  });

  describe('Colors', () => {
    it('applies background color', () => {
      const { container } = render(<Box bg="#ff0000">Content</Box>);
      const box = container.querySelector('div');
      expect(box).toHaveStyle({ backgroundColor: '#ff0000' });
    });

    it('applies text color', () => {
      const { container } = render(<Box color="#0000ff">Content</Box>);
      const box = container.querySelector('div');
      expect(box).toHaveStyle({ color: '#0000ff' });
    });

    it('applies both background and text color', () => {
      const { container } = render(<Box bg="#ffffff" color="#000000">Content</Box>);
      const box = container.querySelector('div');
      expect(box).toHaveStyle({ backgroundColor: '#ffffff', color: '#000000' });
    });
  });

  describe('Borders', () => {
    it('applies border width', () => {
      const { container } = render(<Box borderWidth={2}>Content</Box>);
      const box = container.querySelector('div');
      expect(box).toHaveStyle({ borderWidth: '2px' });
    });

    it('applies border color', () => {
      const { container } = render(<Box borderColor="#cccccc">Content</Box>);
      const box = container.querySelector('div');
      expect(box).toHaveStyle({ borderColor: '#cccccc' });
    });

    it('applies border radius', () => {
      const { container } = render(<Box borderRadius={8}>Content</Box>);
      const box = container.querySelector('div');
      expect(box).toHaveStyle({ borderRadius: '8px' });
    });

    it('applies border radius with string value', () => {
      const { container } = render(<Box borderRadius="50%">Content</Box>);
      const box = container.querySelector('div');
      expect(box).toHaveStyle({ borderRadius: '50%' });
    });
  });

  describe('Layout', () => {
    it('applies display property', () => {
      const { container } = render(<Box display="flex">Content</Box>);
      const box = container.querySelector('div');
      expect(box).toHaveStyle({ display: 'flex' });
    });

    it('applies position property', () => {
      const { container } = render(<Box position="relative">Content</Box>);
      const box = container.querySelector('div');
      expect(box).toHaveStyle({ position: 'relative' });
    });

    it('applies overflow property', () => {
      const { container } = render(<Box overflow="hidden">Content</Box>);
      const box = container.querySelector('div');
      expect(box).toHaveStyle({ overflow: 'hidden' });
    });

    it('applies text alignment', () => {
      const { container } = render(<Box textAlign="center">Content</Box>);
      const box = container.querySelector('div');
      expect(box).toHaveStyle({ textAlign: 'center' });
    });
  });

  describe('Custom props', () => {
    it('applies custom className', () => {
      const { container } = render(<Box className="custom-class">Content</Box>);
      const box = container.querySelector('div');
      expect(box).toHaveClass('custom-class');
    });

    it('merges custom style with component styles', () => {
      const { container } = render(
        <Box p={16} style={{ fontSize: '20px' }}>
          Content
        </Box>
      );
      const box = container.querySelector('div');
      expect(box).toHaveStyle({ padding: '16px', fontSize: '20px' });
    });

    it('forwards ref', () => {
      const ref = vi.fn();
      render(<Box ref={ref}>Content</Box>);
      expect(ref).toHaveBeenCalled();
    });

    it('applies data attributes', () => {
      const { container } = render(<Box data-testid="custom-box">Content</Box>);
      expect(container.querySelector('[data-testid="custom-box"]')).toBeInTheDocument();
    });

    it('applies aria attributes', () => {
      const { container } = render(<Box aria-label="Custom box">Content</Box>);
      const box = container.querySelector('div');
      expect(box).toHaveAttribute('aria-label', 'Custom box');
    });
  });

  describe('Complex combinations', () => {
    it('combines multiple styling props', () => {
      const { container } = render(
        <Box
          p={24}
          m={16}
          w={300}
          h={200}
          bg="#f0f0f0"
          color="#333333"
          borderWidth={1}
          borderColor="#cccccc"
          borderRadius={12}
          display="flex"
          style={{ borderStyle: 'solid' }}
        >
          Content
        </Box>
      );
      const box = container.querySelector('div');
      expect(box).toHaveStyle({
        padding: '24px',
        margin: '16px',
        width: '300px',
        height: '200px',
        backgroundColor: '#f0f0f0',
        color: '#333333',
        borderWidth: '1px',
        borderColor: '#cccccc',
        borderRadius: '12px',
        display: 'flex',
      });
    });

    it('creates a card-like structure', () => {
      const { container } = render(
        <Box p={24} bg="#ffffff" borderRadius={8} style={{ border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <Box as="h3" mb={16}>
            Title
          </Box>
          <Box color="#666">Description</Box>
        </Box>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveStyle({
        padding: '24px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
      });
    });
  });

  describe('Edge cases', () => {
    it('handles zero values', () => {
      const { container } = render(<Box p={0} m={0}>Content</Box>);
      const box = container.querySelector('div');
      expect(box).toHaveStyle({ padding: '0px', margin: '0px' });
    });

    it('handles undefined values gracefully', () => {
      const { container } = render(<Box p={undefined} m={undefined}>Content</Box>);
      const box = container.querySelector('div');
      expect(box).toBeInTheDocument();
    });

    it('renders without children', () => {
      const { container } = render(<Box p={16} />);
      expect(container.querySelector('div')).toBeInTheDocument();
    });
  });
});
