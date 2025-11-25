import type { Meta, StoryObj } from '@storybook/react';
import { Timeline } from './Timeline';
import { BiCheck, BiX, BiTime, BiStar, BiCart, BiPackage, BiHome } from 'react-icons/bi';

const meta: Meta<typeof Timeline> = {
  title: 'Experimental/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A timeline component for displaying chronological events or steps. Built using the compound component pattern with `Timeline.Item` subcomponent. Supports multiple positions (left, right, alternate) and visual variants (default, primary, success, warning, error, info).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['left', 'right', 'alternate'],
      description: 'Position of timeline items',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of timeline dots',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

// Basic Examples
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic timeline with default styling.',
      },
    },
  },
  render: () => (
    <Timeline>
      <Timeline.Item
        title="Project Started"
        timestamp="Jan 1, 2024"
        description="Initial project setup and planning phase completed."
      />
      <Timeline.Item
        title="Development Phase"
        timestamp="Feb 15, 2024"
        description="Core features implemented and tested."
      />
      <Timeline.Item
        title="Beta Release"
        timestamp="Mar 20, 2024"
        description="First beta version released to select users."
      />
      <Timeline.Item
        title="Production Launch"
        timestamp="Apr 1, 2024"
        description="Official launch to all users."
        isLast
      />
    </Timeline>
  ),
};

// Position Variations
export const LeftPosition: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Timeline with items positioned on the left (default).',
      },
    },
  },
  render: () => (
    <Timeline position="left">
      <Timeline.Item
        title="Account Created"
        timestamp="2 hours ago"
        description="New user account was created successfully."
      />
      <Timeline.Item
        title="Profile Updated"
        timestamp="1 hour ago"
        description="User updated profile information."
      />
      <Timeline.Item
        title="First Purchase"
        timestamp="30 minutes ago"
        description="User made their first purchase."
        isLast
      />
    </Timeline>
  ),
};

export const RightPosition: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Timeline with items positioned on the right.',
      },
    },
  },
  render: () => (
    <Timeline position="right">
      <Timeline.Item
        title="Order Placed"
        timestamp="Today, 9:00 AM"
        description="Customer placed an order for 3 items."
      />
      <Timeline.Item
        title="Payment Confirmed"
        timestamp="Today, 9:05 AM"
        description="Payment successfully processed."
      />
      <Timeline.Item
        title="Shipped"
        timestamp="Today, 2:00 PM"
        description="Order has been shipped."
        isLast
      />
    </Timeline>
  ),
};

export const AlternatePosition: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Timeline with items alternating between left and right.',
      },
    },
  },
  render: () => (
    <Timeline position="alternate">
      <Timeline.Item
        title="Q1 Planning"
        timestamp="January 2024"
        description="Strategic planning and goal setting for the first quarter."
      />
      <Timeline.Item
        title="Product Launch"
        timestamp="February 2024"
        description="Launched new product line with marketing campaign."
      />
      <Timeline.Item
        title="Expansion"
        timestamp="March 2024"
        description="Expanded to three new markets in Asia Pacific."
      />
      <Timeline.Item
        title="Partnership Announced"
        timestamp="April 2024"
        description="Announced strategic partnership with industry leader."
        isLast
      />
    </Timeline>
  ),
};

// Size Variations
export const SmallSize: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Timeline with small-sized dots.',
      },
    },
  },
  render: () => (
    <Timeline size="sm">
      <Timeline.Item
        title="Task Created"
        timestamp="9:00 AM"
        description="New task assigned to team member."
      />
      <Timeline.Item
        title="In Progress"
        timestamp="10:30 AM"
        description="Team member started working on the task."
      />
      <Timeline.Item
        title="Completed"
        timestamp="2:45 PM"
        description="Task completed and marked as done."
        isLast
      />
    </Timeline>
  ),
};

export const LargeSize: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Timeline with large-sized dots.',
      },
    },
  },
  render: () => (
    <Timeline size="lg">
      <Timeline.Item
        title="Initial Consultation"
        timestamp="Week 1"
        description="Met with stakeholders to discuss project requirements."
      />
      <Timeline.Item
        title="Design Phase"
        timestamp="Week 2-3"
        description="Created wireframes and high-fidelity mockups."
      />
      <Timeline.Item
        title="Development"
        timestamp="Week 4-8"
        description="Built and tested all features."
        isLast
      />
    </Timeline>
  ),
};

// Variant Examples
export const SuccessVariant: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Timeline items with success variant.',
      },
    },
  },
  render: () => (
    <Timeline>
      <Timeline.Item
        variant="success"
        title="Environment Setup"
        timestamp="Step 1"
        description="All dependencies installed successfully."
      />
      <Timeline.Item
        variant="success"
        title="Tests Passed"
        timestamp="Step 2"
        description="All 47 tests passed without errors."
      />
      <Timeline.Item
        variant="success"
        title="Build Complete"
        timestamp="Step 3"
        description="Production build generated successfully."
        isLast
      />
    </Timeline>
  ),
};

export const ErrorVariant: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Timeline items with error variant.',
      },
    },
  },
  render: () => (
    <Timeline>
      <Timeline.Item
        variant="default"
        title="Deploy Started"
        timestamp="3:00 PM"
        description="Deployment process initiated."
      />
      <Timeline.Item
        variant="error"
        title="Deploy Failed"
        timestamp="3:05 PM"
        description="Deployment failed due to configuration error."
      />
      <Timeline.Item
        variant="default"
        title="Rollback Initiated"
        timestamp="3:07 PM"
        description="Automatic rollback to previous version."
        isLast
      />
    </Timeline>
  ),
};

export const MixedVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Timeline with different variants for different states.',
      },
    },
  },
  render: () => (
    <Timeline>
      <Timeline.Item
        variant="success"
        title="Order Received"
        timestamp="Mon, 9:00 AM"
        description="Your order has been received and is being processed."
      />
      <Timeline.Item
        variant="primary"
        title="Processing"
        timestamp="Mon, 10:30 AM"
        description="Your order is currently being prepared."
      />
      <Timeline.Item
        variant="info"
        title="Shipped"
        timestamp="Tue, 2:00 PM"
        description="Your order has been shipped and is on the way."
      />
      <Timeline.Item
        variant="warning"
        title="Delivery Delayed"
        timestamp="Wed, 11:00 AM"
        description="Delivery delayed due to weather conditions."
        isLast
      />
    </Timeline>
  ),
};

// With Icons
export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Timeline items with custom icons instead of dots.',
      },
    },
  },
  render: () => (
    <Timeline>
      <Timeline.Item
        icon={<BiCheck />}
        variant="success"
        title="Order Confirmed"
        timestamp="Jan 15, 2024"
        description="Your order has been confirmed."
      />
      <Timeline.Item
        icon={<BiPackage />}
        variant="primary"
        title="Packed"
        timestamp="Jan 16, 2024"
        description="Your order has been packed."
      />
      <Timeline.Item
        icon={<BiPackage />}
        variant="info"
        title="Shipped"
        timestamp="Jan 17, 2024"
        description="Your order is on the way."
      />
      <Timeline.Item
        icon={<BiHome />}
        variant="default"
        title="Delivered"
        timestamp="Jan 20, 2024"
        description="Expected delivery date."
        isLast
      />
    </Timeline>
  ),
};

export const WithCustomContent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Timeline items with custom content in children.',
      },
    },
  },
  render: () => (
    <Timeline>
      <Timeline.Item
        variant="primary"
        title="New Feature Release"
        timestamp="2 days ago"
      >
        <div style={{ marginTop: '0.5rem', padding: '0.75rem', backgroundColor: 'var(--semantic-color-bg-subtle)', borderRadius: '0.375rem' }}>
          <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>Released version 2.0 with exciting new features:</p>
          <ul style={{ fontSize: '0.875rem', marginLeft: '1.25rem' }}>
            <li>Dark mode support</li>
            <li>Performance improvements</li>
            <li>New dashboard design</li>
          </ul>
        </div>
      </Timeline.Item>
      <Timeline.Item
        variant="success"
        title="Bug Fixes"
        timestamp="1 day ago"
      >
        <div style={{ marginTop: '0.5rem', padding: '0.75rem', backgroundColor: 'var(--semantic-color-bg-subtle)', borderRadius: '0.375rem' }}>
          <p style={{ fontSize: '0.875rem' }}>Fixed 12 critical bugs and improved stability.</p>
        </div>
      </Timeline.Item>
      <Timeline.Item
        variant="info"
        title="Upcoming Maintenance"
        timestamp="Tomorrow"
      >
        <div style={{ marginTop: '0.5rem', padding: '0.75rem', backgroundColor: 'var(--semantic-color-bg-subtle)', borderRadius: '0.375rem' }}>
          <p style={{ fontSize: '0.875rem' }}>Scheduled maintenance window: 2 AM - 4 AM EST</p>
        </div>
      </Timeline.Item>
    </Timeline>
  ),
};

// Use Case Examples
export const OrderTracking: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Timeline used for order tracking.',
      },
    },
  },
  render: () => (
    <Timeline>
      <Timeline.Item
        icon={<BiCart />}
        variant="success"
        title="Order Placed"
        timestamp="March 1, 2024 - 10:30 AM"
        description="Order #12345 placed successfully. Total: $129.99"
      />
      <Timeline.Item
        icon={<BiCheck />}
        variant="success"
        title="Payment Confirmed"
        timestamp="March 1, 2024 - 10:32 AM"
        description="Payment processed via Visa ending in 4242"
      />
      <Timeline.Item
        icon={<BiPackage />}
        variant="success"
        title="Order Packed"
        timestamp="March 2, 2024 - 9:15 AM"
        description="Your order has been packed and ready for shipment"
      />
      <Timeline.Item
        icon={<BiPackage />}
        variant="primary"
        title="In Transit"
        timestamp="March 2, 2024 - 2:00 PM"
        description="Package is on the way. Tracking: 1Z999AA10123456784"
      />
      <Timeline.Item
        icon={<BiHome />}
        variant="default"
        title="Expected Delivery"
        timestamp="March 5, 2024"
        description="Estimated delivery between 9 AM - 5 PM"
        isLast
      />
    </Timeline>
  ),
};

export const ProjectTimeline: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Timeline used for project milestones.',
      },
    },
  },
  render: () => (
    <Timeline position="alternate" size="lg">
      <Timeline.Item
        variant="success"
        title="Project Kickoff"
        timestamp="Q1 2024"
        description="Initial team assembled and project scope defined. Budget approved."
      />
      <Timeline.Item
        variant="success"
        title="Research & Discovery"
        timestamp="Q1 2024"
        description="Market research completed. User interviews conducted with 50+ participants."
      />
      <Timeline.Item
        variant="success"
        title="Design Phase"
        timestamp="Q2 2024"
        description="UI/UX design completed. Prototype tested with focus groups."
      />
      <Timeline.Item
        variant="primary"
        title="Development Sprint 1"
        timestamp="Q2-Q3 2024"
        description="Core features implemented. Backend infrastructure deployed."
      />
      <Timeline.Item
        variant="info"
        title="Beta Testing"
        timestamp="Q3 2024"
        description="Scheduled: 500 beta testers to evaluate the product."
      />
      <Timeline.Item
        variant="default"
        title="Production Launch"
        timestamp="Q4 2024"
        description="Planned: Full product launch to market."
        isLast
      />
    </Timeline>
  ),
};

export const UserActivity: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Timeline used for user activity log.',
      },
    },
  },
  render: () => (
    <Timeline size="sm">
      <Timeline.Item
        variant="primary"
        title="Logged In"
        timestamp="5 minutes ago"
        description="User logged in from Chrome on MacOS"
      />
      <Timeline.Item
        variant="info"
        title="Updated Profile"
        timestamp="3 minutes ago"
        description="Changed profile picture and bio"
      />
      <Timeline.Item
        variant="success"
        title="Created Post"
        timestamp="2 minutes ago"
        description="Published new blog post 'Getting Started with React'"
      />
      <Timeline.Item
        variant="default"
        title="Commented"
        timestamp="1 minute ago"
        description="Commented on 'TypeScript Best Practices'"
      />
      <Timeline.Item
        variant="warning"
        title="Failed Login Attempt"
        timestamp="30 seconds ago"
        description="Failed login attempt detected from unknown location"
        isLast
      />
    </Timeline>
  ),
};

export const BuildPipeline: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Timeline used for CI/CD build pipeline status.',
      },
    },
  },
  render: () => (
    <Timeline>
      <Timeline.Item
        icon={<BiCheck />}
        variant="success"
        title="Code Checkout"
        timestamp="00:01"
        description="Repository cloned successfully"
      />
      <Timeline.Item
        icon={<BiCheck />}
        variant="success"
        title="Dependencies Install"
        timestamp="00:42"
        description="All dependencies installed (235 packages)"
      />
      <Timeline.Item
        icon={<BiCheck />}
        variant="success"
        title="Tests"
        timestamp="02:15"
        description="All 127 tests passed"
      />
      <Timeline.Item
        icon={<BiCheck />}
        variant="success"
        title="Build"
        timestamp="03:30"
        description="Production build completed"
      />
      <Timeline.Item
        icon={<BiCheck />}
        variant="success"
        title="Deploy"
        timestamp="04:05"
        description="Deployed to production environment"
        isLast
      />
    </Timeline>
  ),
};

export const CompactTimeline: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Compact timeline with minimal information.',
      },
    },
  },
  render: () => (
    <Timeline size="sm">
      <Timeline.Item title="Sign up" timestamp="Jan 1" />
      <Timeline.Item title="Email verified" timestamp="Jan 1" />
      <Timeline.Item title="Profile completed" timestamp="Jan 2" />
      <Timeline.Item title="First post" timestamp="Jan 3" />
      <Timeline.Item title="Connected with 5 users" timestamp="Jan 5" isLast />
    </Timeline>
  ),
};
