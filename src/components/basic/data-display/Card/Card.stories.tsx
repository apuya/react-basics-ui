import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../../forms/Button/Button';
import { Badge } from '../../feedback/Badge/Badge';

const meta = {
  title: 'Data Display/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile container component for grouping related content. Built using the compound component pattern with `Card.Header`, `Card.Title`, `Card.Description`, `Card.Content`, and `Card.Footer` subcomponents. Supports multiple visual variants (default, elevated, outlined, interactive) for different use cases.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'interactive'],
      description: 'The visual style variant of the card',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Compound Component Overview
export const CompoundComponents: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Card is built using the compound component pattern. It consists of: `Card` (root container), `Card.Header` (header section), `Card.Title` (heading element), `Card.Description` (subtitle text), `Card.Content` (main content area), and `Card.Footer` (action buttons section). Mix and match these components based on your needs.',
      },
    },
  },
  args: {
    children: (
      <>
        <Card.Header>
          <Card.Title>Card Components</Card.Title>
          <Card.Description>All available subcomponents</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>This demonstrates all compound components:</p>
          <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem', fontSize: '0.875rem' }}>
            <li>Card.Header - Container for title and description</li>
            <li>Card.Title - Heading element</li>
            <li>Card.Description - Subtitle or description text</li>
            <li>Card.Content - Main content area</li>
            <li>Card.Footer - Action buttons section</li>
          </ul>
        </Card.Content>
        <Card.Footer>
          <Button variant="secondary" size="small">Cancel</Button>
          <Button size="small">Confirm</Button>
        </Card.Footer>
      </>
    ),
  },
};

// Variant Examples
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default card variant with subtle shadow. Suitable for most use cases.',
      },
    },
  },
  args: {
    children: (
      <>
        <Card.Header>
          <Card.Title>Default Card</Card.Title>
          <Card.Description>This is a default card variant</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Card content goes here. This is the main content area of the card.</p>
        </Card.Content>
      </>
    ),
  },
};

export const Elevated: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Elevated variant with prominent shadow effect. Makes the card appear lifted from the page.',
      },
    },
  },
  args: {
    variant: 'elevated',
    children: (
      <>
        <Card.Header>
          <Card.Title>Elevated Card</Card.Title>
          <Card.Description>This card has elevated shadow styling</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>The elevated variant provides a more prominent shadow effect, making the card appear lifted from the page.</p>
        </Card.Content>
      </>
    ),
  },
};

export const Outlined: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Outlined variant using border instead of shadow. Perfect for minimal or flat design systems.',
      },
    },
  },
  args: {
    variant: 'outlined',
    children: (
      <>
        <Card.Header>
          <Card.Title>Outlined Card</Card.Title>
          <Card.Description>This card has a border instead of shadow</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>The outlined variant uses a border for definition rather than shadows, perfect for minimal designs.</p>
        </Card.Content>
      </>
    ),
  },
};

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive variant with hover and focus states. Use for clickable cards that trigger navigation or actions.',
      },
    },
  },
  args: {
    variant: 'interactive',
    children: (
      <>
        <Card.Header>
          <Card.Title>Interactive Card</Card.Title>
          <Card.Description>This card responds to hover and focus</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>The interactive variant includes hover and focus states, making it perfect for clickable card components.</p>
        </Card.Content>
      </>
    ),
  },
};

export const WithFooter: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Card with footer section containing action buttons. Common pattern for forms and confirmation dialogs.',
      },
    },
  },
  args: {
    children: (
      <>
        <Card.Header>
          <Card.Title>Card with Footer</Card.Title>
          <Card.Description>Example with footer actions</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>This card demonstrates the footer section with action buttons.</p>
        </Card.Content>
        <Card.Footer>
          <Button variant="secondary" size="small">Cancel</Button>
          <Button size="small">Confirm</Button>
        </Card.Footer>
      </>
    ),
  },
};

export const ContentOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Minimal card with only content section, no header or footer.',
      },
    },
  },
  args: {
    children: (
      <Card.Content>
        <p>This card contains only content without header or footer sections.</p>
      </Card.Content>
    ),
  },
};

export const ComplexLayout: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example of complex card layout with custom header arrangement, badges, and structured content.',
      },
    },
  },
  args: {
    variant: 'elevated',
    children: (
      <>
        <Card.Header>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <Card.Title>Project Dashboard</Card.Title>
              <Card.Description>Overview of project metrics and activities</Card.Description>
            </div>
            <Badge variant="success">Active</Badge>
          </div>
        </Card.Header>
        <Card.Content>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 500 }}>Tasks Completed:</span>
              <span>24/30</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 500 }}>Team Members:</span>
              <span>8</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 500 }}>Deadline:</span>
              <span>Dec 31, 2025</span>
            </div>
          </div>
        </Card.Content>
        <Card.Footer>
          <Button variant="secondary" size="small">View Details</Button>
          <Button size="small">Edit Project</Button>
        </Card.Footer>
      </>
    ),
  },
};

export const ProductCard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'E-commerce product card example with image placeholder, pricing, and action buttons.',
      },
    },
  },
  args: {
    variant: 'interactive',
    children: (
      <>
        <Card.Content>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ 
              width: '100%', 
              height: '200px', 
              backgroundColor: 'var(--semantic-color-background-subtle)',
              borderRadius: 'var(--semantic-border-radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ color: 'var(--semantic-color-text-tertiary)' }}>Product Image</span>
            </div>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                Premium Headphones
              </h3>
              <p style={{ color: 'var(--semantic-color-text-secondary)', fontSize: '0.875rem' }}>
                Wireless noise-cancelling headphones
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>$299</span>
              <span style={{ 
                fontSize: '1rem', 
                color: 'var(--semantic-color-text-tertiary)',
                textDecoration: 'line-through' 
              }}>
                $399
              </span>
              <Badge variant="success">25% OFF</Badge>
            </div>
          </div>
        </Card.Content>
        <Card.Footer>
          <Button variant="secondary" size="small" style={{ flex: 1 }}>Add to Wishlist</Button>
          <Button size="small" style={{ flex: 1 }}>Add to Cart</Button>
        </Card.Footer>
      </>
    ),
  },
};

export const UserProfile: Story = {
  parameters: {
    docs: {
      description: {
        story: 'User profile card with avatar, name, role, and bio. Common pattern for team pages or social features.',
      },
    },
  },
  args: {
    variant: 'outlined',
    children: (
      <>
        <Card.Content>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '50%',
              backgroundColor: 'var(--semantic-color-primary-default)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 600,
              flexShrink: 0,
            }}>
              JD
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                John Doe
              </h3>
              <p style={{ color: 'var(--semantic-color-text-secondary)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                Senior Software Engineer
              </p>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.5 }}>
                Passionate about building scalable web applications and mentoring junior developers.
              </p>
            </div>
          </div>
        </Card.Content>
        <Card.Footer>
          <Button variant="secondary" size="small">Message</Button>
          <Button size="small">View Profile</Button>
        </Card.Footer>
      </>
    ),
  },
};

export const StatsCard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Statistics card for displaying metrics, KPIs, or data insights with trend indicators.',
      },
    },
  },
  args: {
    variant: 'elevated',
    children: (
      <>
        <Card.Header>
          <Card.Title>Monthly Revenue</Card.Title>
        </Card.Header>
        <Card.Content>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              $45,231
            </div>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.25rem',
              color: 'var(--semantic-color-success-default)',
              fontSize: '0.875rem',
              fontWeight: 500,
            }}>
              <span>↑ 12.5%</span>
              <span style={{ color: 'var(--semantic-color-text-tertiary)' }}>from last month</span>
            </div>
          </div>
        </Card.Content>
      </>
    ),
  },
};

export const MultipleCards: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example showing multiple cards in a grid layout with different variants.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', minWidth: '800px' }}>
      <Card>
        <Card.Header>
          <Card.Title>Card 1</Card.Title>
        </Card.Header>
        <Card.Content>
          <p>First card in a grid layout.</p>
        </Card.Content>
      </Card>
      <Card variant="elevated">
        <Card.Header>
          <Card.Title>Card 2</Card.Title>
        </Card.Header>
        <Card.Content>
          <p>Second card with elevated variant.</p>
        </Card.Content>
      </Card>
      <Card variant="outlined">
        <Card.Header>
          <Card.Title>Card 3</Card.Title>
        </Card.Header>
        <Card.Content>
          <p>Third card with outlined variant.</p>
        </Card.Content>
      </Card>
    </div>
  ),
};
