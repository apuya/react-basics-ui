import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pagination } from './Pagination';

const meta = {
  title: 'Navigation/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Pagination enables navigation through paged content. Supports controlled/uncontrolled modes, customizable sibling count, ellipsis for large datasets, and first/last page navigation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    totalPages: {
      control: 'number',
      description: 'Total number of pages',
    },
    page: {
      control: 'number',
      description: 'Current page number (controlled mode)',
    },
    defaultPage: {
      control: 'number',
      description: 'Default page for uncontrolled mode',
    },
    siblingCount: {
      control: 'number',
      description: 'Number of sibling pages to show around current page',
    },
    showFirstLast: {
      control: 'boolean',
      description: 'Whether to show first/last page buttons',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of pagination items',
    },
    onChange: {
      action: 'onChange',
      description: 'Callback when page changes',
    },
  },
  args: {
    totalPages: 10,
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic pagination with previous/next buttons and page numbers. Shows first 5 pages with ellipsis.',
      },
    },
  },
  render: () => {
    const [page, setPage] = useState(1);
    const totalPages = 10;

    return (
      <Pagination totalPages={totalPages} page={page} onChange={setPage}>
        <Pagination.List>
          <Pagination.Previous />
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => (
            <Pagination.Item key={i + 1} page={i + 1} />
          ))}
          {totalPages > 5 && <Pagination.Ellipsis />}
          <Pagination.Next />
        </Pagination.List>
      </Pagination>
    );
  },
};

export const Simple: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Simple pagination showing all pages. Ideal for small datasets with 5-7 pages.',
      },
    },
  },
  render: () => {
    const [page, setPage] = useState(1);
    const totalPages = 5;

    return (
      <Pagination totalPages={totalPages} page={page} onChange={setPage}>
        <Pagination.List>
          <Pagination.Previous />
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item key={i + 1} page={i + 1} />
          ))}
          <Pagination.Next />
        </Pagination.List>
      </Pagination>
    );
  },
};

export const WithEllipsis: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Pagination with dynamic ellipsis for large page counts. Shows context around current page.',
      },
    },
  },
  render: () => {
    const [page, setPage] = useState(5);
    const totalPages = 20;
    const maxVisible = 7;

    const renderPageNumbers = () => {
      const pages = [];
      
      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(<Pagination.Item key={i} page={i} />);
        }
      } else {
        // Always show first page
        pages.push(<Pagination.Item key={1} page={1} />);

        if (page > 3) {
          pages.push(<Pagination.Ellipsis key="ellipsis-1" />);
        }

        // Show pages around current page
        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);
        
        for (let i = start; i <= end; i++) {
          pages.push(<Pagination.Item key={i} page={i} />);
        }

        if (page < totalPages - 2) {
          pages.push(<Pagination.Ellipsis key="ellipsis-2" />);
        }

        // Always show last page
        pages.push(<Pagination.Item key={totalPages} page={totalPages} />);
      }

      return pages;
    };

    return (
      <Pagination totalPages={totalPages} page={page} onChange={setPage}>
        <Pagination.List>
          <Pagination.Previous />
          {renderPageNumbers()}
          <Pagination.Next />
        </Pagination.List>
      </Pagination>
    );
  },
};

export const Minimal: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Minimal pagination with only prev/next and current page. Compact for mobile or limited space.',
      },
    },
  },
  render: () => {
    const [page, setPage] = useState(1);
    const totalPages = 10;

    return (
      <Pagination totalPages={totalPages} page={page} onChange={setPage}>
        <Pagination.List>
          <Pagination.Previous />
          <Pagination.Item page={page} />
          <Pagination.Next />
        </Pagination.List>
      </Pagination>
    );
  },
};

export const CustomLabels: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Pagination with custom text labels for previous/next buttons.',
      },
    },
  },
  render: () => {
    const [page, setPage] = useState(1);
    const totalPages = 8;

    return (
      <Pagination totalPages={totalPages} page={page} onChange={setPage}>
        <Pagination.List>
          <Pagination.Previous>
            <span>← Prev</span>
          </Pagination.Previous>
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item key={i + 1} page={i + 1}>
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next>
            <span>Next →</span>
          </Pagination.Next>
        </Pagination.List>
      </Pagination>
    );
  },
};

export const FirstAndLast: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Pagination with first/last page buttons for quick navigation to extremes.',
      },
    },
  },
  render: () => {
    const [page, setPage] = useState(5);
    const totalPages = 15;

    return (
      <Pagination totalPages={totalPages} page={page} onChange={setPage} showFirstLast>
        <Pagination.List>
          <Pagination.Item page={1}>First</Pagination.Item>
          <Pagination.Previous />
          <Pagination.Item page={Math.max(1, page - 1)} />
          <Pagination.Item page={page} />
          <Pagination.Item page={Math.min(totalPages, page + 1)} />
          <Pagination.Next />
          <Pagination.Item page={totalPages}>Last</Pagination.Item>
        </Pagination.List>
      </Pagination>
    );
  },
};

export const LargeDataset: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Pagination optimized for very large datasets (100+ pages) with smart ellipsis placement.',
      },
    },
  },
  render: () => {
    const [page, setPage] = useState(1);
    const totalPages = 100;
    const siblingCount = 1;

    const renderPages = () => {
      const pages = [];
      const showEllipsisStart = page > siblingCount + 2;
      const showEllipsisEnd = page < totalPages - siblingCount - 1;

      // First page
      pages.push(<Pagination.Item key={1} page={1} />);

      // Start ellipsis
      if (showEllipsisStart) {
        pages.push(<Pagination.Ellipsis key="ellipsis-start" />);
      }

      // Pages around current
      const start = Math.max(2, page - siblingCount);
      const end = Math.min(totalPages - 1, page + siblingCount);

      for (let i = start; i <= end; i++) {
        pages.push(<Pagination.Item key={i} page={i} />);
      }

      // End ellipsis
      if (showEllipsisEnd) {
        pages.push(<Pagination.Ellipsis key="ellipsis-end" />);
      }

      // Last page
      if (totalPages > 1) {
        pages.push(<Pagination.Item key={totalPages} page={totalPages} />);
      }

      return pages;
    };

    return (
      <Pagination totalPages={totalPages} page={page} onChange={setPage} siblingCount={siblingCount}>
        <Pagination.List>
          <Pagination.Previous />
          {renderPages()}
          <Pagination.Next />
        </Pagination.List>
      </Pagination>
    );
  },
};

export const WithPageInfo: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Pagination with additional page info showing item count. Useful for data tables.',
      },
    },
  },
  render: () => {
    const [page, setPage] = useState(1);
    const totalPages = 12;
    const itemsPerPage = 10;
    const totalItems = 115;

    return (
      <div className="flex flex-col items-center gap-4">
        <Pagination totalPages={totalPages} page={page} onChange={setPage}>
          <Pagination.List>
            <Pagination.Previous />
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => (
              <Pagination.Item key={i + 1} page={i + 1} />
            ))}
            {totalPages > 5 && <Pagination.Ellipsis />}
            <Pagination.Next />
          </Pagination.List>
        </Pagination>
        <div className="text-sm text-gray-600">
          Showing {(page - 1) * itemsPerPage + 1} to{' '}
          {Math.min(page * itemsPerPage, totalItems)} of {totalItems} items
        </div>
      </div>
    );
  },
};

export const SmallSize: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Small-sized pagination for compact UIs or secondary navigation.',
      },
    },
  },
  render: () => {
    const [page, setPage] = useState(1);
    const totalPages = 5;

    return (
      <Pagination totalPages={totalPages} page={page} onChange={setPage} size="sm">
        <Pagination.List>
          <Pagination.Previous />
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item key={i + 1} page={i + 1} />
          ))}
          <Pagination.Next />
        </Pagination.List>
      </Pagination>
    );
  },
};

export const LargeSize: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Large-sized pagination for prominent navigation or touch-friendly interfaces.',
      },
    },
  },
  render: () => {
    const [page, setPage] = useState(1);
    const totalPages = 5;

    return (
      <Pagination totalPages={totalPages} page={page} onChange={setPage} size="lg">
        <Pagination.List>
          <Pagination.Previous />
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item key={i + 1} page={i + 1} />
          ))}
          <Pagination.Next />
        </Pagination.List>
      </Pagination>
    );
  },
};
