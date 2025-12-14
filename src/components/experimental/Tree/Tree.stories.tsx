import type { Meta, StoryObj } from '@storybook/react';
import { Tree } from './Tree';
import { useState } from 'react';
import {
  BiFolder,
  BiFile,
  BiCodeAlt,
  BiImage,
  BiPackage,
  BiCog,
  BiHome,
  BiUser,
  BiBookmark,
  BiHeart,
  BiStar,
} from 'react-icons/bi';
import { Text } from '../../basic/typography/Text';
import { Heading } from '../../basic/typography/Heading';
import { Button } from '../../basic/forms/Button';
import { Box } from '../../basic/layout/Box';
import { Flex } from '../../basic/layout/Flex';
import { Stack } from '../../basic/layout/Stack';

const meta = {
  title: 'Experimental/Tree',
  component: Tree,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    selectable: {
      control: 'boolean',
    },
    showLines: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tree>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tree>
      <Tree.Node nodeId="1" label="Documents">
        <Tree.Node nodeId="1-1" label="Work" />
        <Tree.Node nodeId="1-2" label="Personal" />
      </Tree.Node>
      <Tree.Node nodeId="2" label="Downloads" />
      <Tree.Node nodeId="3" label="Pictures" />
    </Tree>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tree>
      <Tree.Node nodeId="1" label="src" icon={<BiFolder />}>
        <Tree.Node nodeId="1-1" label="components" icon={<BiFolder />}>
          <Tree.Node nodeId="1-1-1" label="Button.tsx" icon={<BiCodeAlt />} />
          <Tree.Node nodeId="1-1-2" label="Input.tsx" icon={<BiCodeAlt />} />
        </Tree.Node>
        <Tree.Node nodeId="1-2" label="utils" icon={<BiFolder />}>
          <Tree.Node nodeId="1-2-1" label="helpers.ts" icon={<BiFile />} />
        </Tree.Node>
      </Tree.Node>
      <Tree.Node nodeId="2" label="public" icon={<BiFolder />}>
        <Tree.Node nodeId="2-1" label="logo.png" icon={<BiImage />} />
      </Tree.Node>
      <Tree.Node nodeId="3" label="package.json" icon={<BiPackage />} />
    </Tree>
  ),
};

export const DefaultExpanded: Story = {
  render: () => (
    <Tree defaultExpanded={['1', '1-1']}>
      <Tree.Node nodeId="1" label="Documents">
        <Tree.Node nodeId="1-1" label="Projects">
          <Tree.Node nodeId="1-1-1" label="Project A" />
          <Tree.Node nodeId="1-1-2" label="Project B" />
        </Tree.Node>
        <Tree.Node nodeId="1-2" label="Archive" />
      </Tree.Node>
      <Tree.Node nodeId="2" label="Media">
        <Tree.Node nodeId="2-1" label="Photos" />
        <Tree.Node nodeId="2-2" label="Videos" />
      </Tree.Node>
    </Tree>
  ),
};

export const ExpandCollapse: Story = {
  render: () => (
    <Box>
      <Heading size="small" style={{ marginBottom: '1rem' }}>
        Expand/Collapse Demo
      </Heading>
      <Text size="small" style={{ marginBottom: '1rem' }} color="secondary">
        Click the chevron icons to expand or collapse nodes. The chevron rotates to indicate state.
      </Text>
      <Tree>
        <Tree.Node nodeId="1" label="Click to expand" icon={<BiFolder />}>
          <Tree.Node nodeId="1-1" label="Nested level 1" icon={<BiFolder />}>
            <Tree.Node nodeId="1-1-1" label="Nested level 2" icon={<BiFile />} />
            <Tree.Node nodeId="1-1-2" label="Another file" icon={<BiFile />} />
          </Tree.Node>
          <Tree.Node nodeId="1-2" label="Another folder" icon={<BiFolder />}>
            <Tree.Node nodeId="1-2-1" label="Deep file" icon={<BiFile />} />
          </Tree.Node>
        </Tree.Node>
        <Tree.Node nodeId="2" label="Second folder" icon={<BiFolder />}>
          <Tree.Node nodeId="2-1" label="File in second" icon={<BiFile />} />
        </Tree.Node>
        <Tree.Node nodeId="3" label="Leaf node (no children)" icon={<BiFile />} />
      </Tree>
    </Box>
  ),
};

export const Selectable: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>('1-1');

    return (
      <Box>
        <Text size="small" color="secondary" className="mb-4">
          Selected: <strong>{selected || 'None'}</strong>
        </Text>
        <Tree selectable selectedId={selected} onSelect={setSelected}>
          <Tree.Node nodeId="1" label="Root">
            <Tree.Node nodeId="1-1" label="Child 1" />
            <Tree.Node nodeId="1-2" label="Child 2">
              <Tree.Node nodeId="1-2-1" label="Grandchild 1" />
              <Tree.Node nodeId="1-2-2" label="Grandchild 2" />
            </Tree.Node>
          </Tree.Node>
          <Tree.Node nodeId="2" label="Other Root" />
        </Tree>
      </Box>
    );
  },
};

export const WithDisabledNodes: Story = {
  render: () => (
    <Tree selectable>
      <Tree.Node nodeId="1" label="Available">
        <Tree.Node nodeId="1-1" label="File 1" />
        <Tree.Node nodeId="1-2" label="File 2 (disabled)" disabled />
      </Tree.Node>
      <Tree.Node nodeId="2" label="Locked Folder" disabled>
        <Tree.Node nodeId="2-1" label="Cannot access" />
      </Tree.Node>
    </Tree>
  ),
};

export const ShowLines: Story = {
  render: () => (
    <Tree showLines defaultExpanded={['1', '1-1']}>
      <Tree.Node nodeId="1" label="src" icon={<BiFolder />}>
        <Tree.Node nodeId="1-1" label="components" icon={<BiFolder />}>
          <Tree.Node nodeId="1-1-1" label="Button.tsx" icon={<BiCodeAlt />} />
          <Tree.Node nodeId="1-1-2" label="Input.tsx" icon={<BiCodeAlt />} />
        </Tree.Node>
        <Tree.Node nodeId="1-2" label="utils" icon={<BiFolder />}>
          <Tree.Node nodeId="1-2-1" label="helpers.ts" icon={<BiFile />} />
        </Tree.Node>
      </Tree.Node>
      <Tree.Node nodeId="2" label="public" icon={<BiFolder />}>
        <Tree.Node nodeId="2-1" label="logo.png" icon={<BiImage />} />
      </Tree.Node>
      <Tree.Node nodeId="3" label="package.json" icon={<BiPackage />} />
    </Tree>
  ),
};

export const DataAttributes: Story = {
  render: () => (
    <Box>
      <Heading size="small" style={{ marginBottom: '1rem' }}>
        Data Attributes Demo
      </Heading>
      <Text size="small" style={{ marginBottom: '1rem' }} color="secondary">
        Open DevTools to inspect data-* attributes for testing and CSS targeting.
      </Text>
      <Tree selectable selectedId="1-1" defaultExpanded={['1']}>
        <Tree.Node nodeId="1" label="Parent Node" icon={<BiFolder />}>
          <Tree.Node nodeId="1-1" label="Selected Child" icon={<BiFile />} />
          <Tree.Node nodeId="1-2" label="Disabled Child" icon={<BiFile />} disabled />
          <Tree.Node nodeId="1-3" label="Regular Child" icon={<BiFile />} />
        </Tree.Node>
        <Tree.Node nodeId="2" label="Leaf Node" icon={<BiFile />} />
        <Tree.Node nodeId="3" label="Another Parent" icon={<BiFolder />}>
          <Tree.Node nodeId="3-1" label="Nested Child" icon={<BiFile />} />
        </Tree.Node>
      </Tree>
      <Box className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded">
        <Text size="small" weight="semibold" className="mb-2">Available data attributes:</Text>
        <ul className="text-sm text-gray-700 space-y-1">
          <li><code>data-node-id</code> - Unique node identifier</li>
          <li><code>data-expanded</code> - Set when node is expanded</li>
          <li><code>data-selected</code> - Set when node is selected</li>
          <li><code>data-disabled</code> - Set when node is disabled</li>
          <li><code>data-has-children</code> - Set when node has children</li>
          <li><code>data-leaf</code> - Set when node has no children</li>
          <li><code>data-show-lines</code> - Set on root when showLines is true</li>
        </ul>
      </Box>
    </Box>
  ),
};

export const WithRightContent: Story = {
  render: () => (
    <Tree>
      <Tree.Node
        nodeId="1"
        label="Documents"
        rightContent={<Text size="caption" color="secondary">12 items</Text>}
      >
        <Tree.Node
          nodeId="1-1"
          label="report.pdf"
          icon={<BiFile />}
          rightContent={<Text size="caption" color="secondary">2.4 MB</Text>}
        />
        <Tree.Node
          nodeId="1-2"
          label="presentation.pptx"
          icon={<BiFile />}
          rightContent={<Text size="caption" color="secondary">8.1 MB</Text>}
        />
      </Tree.Node>
      <Tree.Node
        nodeId="2"
        label="Images"
        rightContent={<Text size="caption" color="secondary">24 items</Text>}
      >
        <Tree.Node
          nodeId="2-1"
          label="photo.jpg"
          icon={<BiImage />}
          rightContent={<Text size="caption" color="secondary">1.2 MB</Text>}
        />
      </Tree.Node>
    </Tree>
  ),
};

export const FileSystemTree: Story = {
  render: () => (
    <Tree defaultExpanded={['root', 'src', 'components']}>
      <Tree.Node nodeId="root" label="my-project" icon={<BiFolder />}>
        <Tree.Node nodeId="src" label="src" icon={<BiFolder />}>
          <Tree.Node nodeId="components" label="components" icon={<BiFolder />}>
            <Tree.Node nodeId="button" label="Button.tsx" icon={<BiCodeAlt />} />
            <Tree.Node nodeId="input" label="Input.tsx" icon={<BiCodeAlt />} />
            <Tree.Node nodeId="modal" label="Modal.tsx" icon={<BiCodeAlt />} />
          </Tree.Node>
          <Tree.Node nodeId="utils" label="utils" icon={<BiFolder />}>
            <Tree.Node nodeId="helpers" label="helpers.ts" icon={<BiFile />} />
            <Tree.Node nodeId="constants" label="constants.ts" icon={<BiFile />} />
          </Tree.Node>
          <Tree.Node nodeId="app" label="App.tsx" icon={<BiCodeAlt />} />
          <Tree.Node nodeId="index" label="index.tsx" icon={<BiCodeAlt />} />
        </Tree.Node>
        <Tree.Node nodeId="public" label="public" icon={<BiFolder />}>
          <Tree.Node nodeId="favicon" label="favicon.ico" icon={<BiImage />} />
          <Tree.Node nodeId="index-html" label="index.html" icon={<BiFile />} />
        </Tree.Node>
        <Tree.Node nodeId="package" label="package.json" icon={<BiPackage />} />
        <Tree.Node nodeId="tsconfig" label="tsconfig.json" icon={<BiCog />} />
        <Tree.Node nodeId="readme" label="README.md" icon={<BiFile />} />
      </Tree.Node>
    </Tree>
  ),
};

export const NavigationTree: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>('home');

    return (
      <Tree
        selectable
        selectedId={selected}
        onSelect={setSelected}
        defaultExpanded={['settings']}
      >
        <Tree.Node nodeId="home" label="Home" icon={<BiHome />} />
        <Tree.Node nodeId="profile" label="Profile" icon={<BiUser />} />
        <Tree.Node nodeId="favorites" label="Favorites" icon={<BiHeart />}>
          <Tree.Node nodeId="fav-1" label="Saved Items" icon={<BiBookmark />} />
          <Tree.Node nodeId="fav-2" label="Starred" icon={<BiStar />} />
        </Tree.Node>
        <Tree.Node nodeId="settings" label="Settings" icon={<BiCog />}>
          <Tree.Node nodeId="settings-1" label="General" />
          <Tree.Node nodeId="settings-2" label="Privacy" />
          <Tree.Node nodeId="settings-3" label="Notifications" />
        </Tree.Node>
      </Tree>
    );
  },
};

export const DeepNesting: Story = {
  render: () => (
    <Tree defaultExpanded={['1', '1-1', '1-1-1']}>
      <Tree.Node nodeId="1" label="Level 1">
        <Tree.Node nodeId="1-1" label="Level 2">
          <Tree.Node nodeId="1-1-1" label="Level 3">
            <Tree.Node nodeId="1-1-1-1" label="Level 4">
              <Tree.Node nodeId="1-1-1-1-1" label="Level 5" />
            </Tree.Node>
          </Tree.Node>
          <Tree.Node nodeId="1-1-2" label="Level 3" />
        </Tree.Node>
        <Tree.Node nodeId="1-2" label="Level 2" />
      </Tree.Node>
      <Tree.Node nodeId="2" label="Level 1" />
    </Tree>
  ),
};

export const InteractiveExample: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | undefined>();
    const [nodeInfo, setNodeInfo] = useState<{ id: string; label: string } | null>(null);

    const handleSelect = (nodeId: string) => {
      setSelected(nodeId);
      // In a real app, you'd fetch node details here
      const labels: Record<string, string> = {
        'docs': 'Documents folder containing all your files',
        'work': 'Work-related documents and projects',
        'project-a': 'Project A specifications and resources',
        'project-b': 'Project B development files',
        'personal': 'Personal documents and notes',
        'downloads': 'Recently downloaded files',
        'pictures': 'Photo library and images',
      };
      setNodeInfo({ id: nodeId, label: labels[nodeId] || 'Node information' });
    };

    return (
      <div className="space-y-4">
        <Tree
          selectable
          selectedId={selected}
          onSelect={handleSelect}
          defaultExpanded={['docs']}
        >
          <Tree.Node nodeId="docs" label="Documents" icon={<BiFolder />}>
            <Tree.Node nodeId="work" label="Work" icon={<BiFolder />}>
              <Tree.Node nodeId="project-a" label="Project A" icon={<BiFile />} />
              <Tree.Node nodeId="project-b" label="Project B" icon={<BiFile />} />
            </Tree.Node>
            <Tree.Node nodeId="personal" label="Personal" icon={<BiFolder />} />
          </Tree.Node>
          <Tree.Node nodeId="downloads" label="Downloads" icon={<BiFolder />} />
          <Tree.Node nodeId="pictures" label="Pictures" icon={<BiFolder />} />
        </Tree>

        {nodeInfo && (
          <Box className="p-4 bg-blue-50 border border-blue-200 rounded">
            <Heading level="h4" className="text-blue-900 mb-1">Selected Node</Heading>
            <Text size="small" className="text-blue-700">
              <strong>ID:</strong> {nodeInfo.id}
            </Text>
            <Text size="small" className="text-blue-700">{nodeInfo.label}</Text>
          </Box>
        )}
      </div>
    );
  },
};

export const ManyItems: Story = {
  render: () => (
    <Tree defaultExpanded={['folder-1']}>
      {Array.from({ length: 5 }, (_, i) => (
        <Tree.Node key={i} nodeId={`folder-${i + 1}`} label={`Folder ${i + 1}`}>
          {Array.from({ length: 10 }, (_, j) => (
            <Tree.Node
              key={j}
              nodeId={`folder-${i + 1}-file-${j + 1}`}
              label={`File ${j + 1}`}
              icon={<BiFile />}
            />
          ))}
        </Tree.Node>
      ))}
    </Tree>
  ),
};

export const SingleLevel: Story = {
  render: () => (
    <Tree selectable>
      <Tree.Node nodeId="1" label="Option 1" />
      <Tree.Node nodeId="2" label="Option 2" />
      <Tree.Node nodeId="3" label="Option 3" />
      <Tree.Node nodeId="4" label="Option 4" />
      <Tree.Node nodeId="5" label="Option 5" />
    </Tree>
  ),
};

export const CustomIcons: Story = {
  render: () => (
    <Tree defaultExpanded={['favorites']}>
      <Tree.Node nodeId="home" label="Home" icon={<BiHome />} />
      <Tree.Node nodeId="favorites" label="Favorites" icon={<BiHeart />}>
        <Tree.Node nodeId="fav-1" label="Important" icon={<BiStar />} />
        <Tree.Node nodeId="fav-2" label="Bookmarked" icon={<BiBookmark />} />
      </Tree.Node>
      <Tree.Node nodeId="settings" label="Settings" icon={<BiCog />} />
    </Tree>
  ),
};

export const DynamicExpansion: Story = {
  render: () => {
    const [expandedIds, setExpandedIds] = useState<string[]>(['1']);

    const handleExpandAll = () => {
      setExpandedIds(['1', '1-1', '2']);
    };

    const handleCollapseAll = () => {
      setExpandedIds([]);
    };

    return (
      <Stack spacing="md">
        <Box>
          <Heading size="small" style={{ marginBottom: '0.5rem' }}>
            Dynamic Expansion Control
          </Heading>
          <Text size="small" color="secondary" style={{ marginBottom: '1rem' }}>
            Use buttons to control which nodes are expanded. Tree remounts with new defaultExpanded values.
          </Text>
        </Box>

        <Flex gap="sm">
          <Button
            onClick={handleExpandAll}
            variant="primary"
            size="small"
          >
            Expand All
          </Button>
          <Button
            onClick={handleCollapseAll}
            variant="secondary"
            size="small"
          >
            Collapse All
          </Button>
        </Flex>

        <Tree defaultExpanded={expandedIds} key={expandedIds.join(',')}>
          <Tree.Node nodeId="1" label="Documents" icon={<BiFolder />}>
            <Tree.Node nodeId="1-1" label="Projects" icon={<BiFolder />}>
              <Tree.Node nodeId="1-1-1" label="Project A" icon={<BiFile />} />
              <Tree.Node nodeId="1-1-2" label="Project B" icon={<BiFile />} />
            </Tree.Node>
            <Tree.Node nodeId="1-2" label="Archive" icon={<BiFolder />} />
          </Tree.Node>
          <Tree.Node nodeId="2" label="Media" icon={<BiFolder />}>
            <Tree.Node nodeId="2-1" label="Photos" icon={<BiImage />} />
            <Tree.Node nodeId="2-2" label="Videos" icon={<BiImage />} />
          </Tree.Node>
        </Tree>
      </Stack>
    );
  },
};
