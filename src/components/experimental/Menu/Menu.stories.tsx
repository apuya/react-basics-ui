import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from './Menu';
import {
  BiUser,
  BiCog,
  BiLogOut,
  BiEdit,
  BiTrash,
  BiCopy,
  BiCut,
  BiPaste,
  BiSave,
  BiFolder,
  BiFile,
  BiDownload,
  BiShare,
  BiHeart,
  BiCheck,
} from 'react-icons/bi';

const meta = {
  title: 'Experimental/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ minWidth: '300px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Menu>
      <Menu.Item>Profile</Menu.Item>
      <Menu.Item>Settings</Menu.Item>
      <Menu.Divider />
      <Menu.Item>Logout</Menu.Item>
    </Menu>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Menu>
      <Menu.Item leadingIcon={<BiUser />}>Profile</Menu.Item>
      <Menu.Item leadingIcon={<BiCog />}>Settings</Menu.Item>
      <Menu.Divider />
      <Menu.Item leadingIcon={<BiLogOut />} variant="danger">
        Logout
      </Menu.Item>
    </Menu>
  ),
};

export const WithShortcuts: Story = {
  render: () => (
    <Menu>
      <Menu.Item leadingIcon={<BiCopy />} shortcut="⌘C">
        Copy
      </Menu.Item>
      <Menu.Item leadingIcon={<BiCut />} shortcut="⌘X">
        Cut
      </Menu.Item>
      <Menu.Item leadingIcon={<BiPaste />} shortcut="⌘V">
        Paste
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item leadingIcon={<BiSave />} shortcut="⌘S">
        Save
      </Menu.Item>
    </Menu>
  ),
};

export const WithDescriptions: Story = {
  render: () => (
    <Menu>
      <Menu.Item
        leadingIcon={<BiUser />}
        description="View and edit your profile"
      >
        Profile
      </Menu.Item>
      <Menu.Item
        leadingIcon={<BiCog />}
        description="Manage your account settings"
      >
        Settings
      </Menu.Item>
      <Menu.Item
        leadingIcon={<BiShare />}
        description="Share with your team"
      >
        Share
      </Menu.Item>
    </Menu>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Menu>
      <Menu.Group label="File">
        <Menu.Item leadingIcon={<BiFile />} shortcut="⌘N">
          New File
        </Menu.Item>
        <Menu.Item leadingIcon={<BiFolder />} shortcut="⌘O">
          Open
        </Menu.Item>
        <Menu.Item leadingIcon={<BiSave />} shortcut="⌘S">
          Save
        </Menu.Item>
      </Menu.Group>
      <Menu.Divider />
      <Menu.Group label="Edit">
        <Menu.Item leadingIcon={<BiCopy />} shortcut="⌘C">
          Copy
        </Menu.Item>
        <Menu.Item leadingIcon={<BiCut />} shortcut="⌘X">
          Cut
        </Menu.Item>
        <Menu.Item leadingIcon={<BiPaste />} shortcut="⌘V">
          Paste
        </Menu.Item>
      </Menu.Group>
    </Menu>
  ),
};

export const DisabledItems: Story = {
  render: () => (
    <Menu>
      <Menu.Item leadingIcon={<BiEdit />}>Edit</Menu.Item>
      <Menu.Item leadingIcon={<BiCopy />} disabled>
        Copy (disabled)
      </Menu.Item>
      <Menu.Item leadingIcon={<BiPaste />} disabled>
        Paste (disabled)
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item leadingIcon={<BiTrash />} variant="danger">
        Delete
      </Menu.Item>
    </Menu>
  ),
};

export const DangerVariant: Story = {
  render: () => (
    <Menu>
      <Menu.Item leadingIcon={<BiEdit />}>Edit</Menu.Item>
      <Menu.Item leadingIcon={<BiCopy />}>Duplicate</Menu.Item>
      <Menu.Item leadingIcon={<BiDownload />}>Download</Menu.Item>
      <Menu.Divider />
      <Menu.Item leadingIcon={<BiTrash />} variant="danger">
        Delete
      </Menu.Item>
      <Menu.Item variant="danger">Remove from Team</Menu.Item>
    </Menu>
  ),
};

export const ComplexMenu: Story = {
  render: () => (
    <Menu>
      <Menu.Group label="Actions">
        <Menu.Item
          leadingIcon={<BiEdit />}
          shortcut="⌘E"
          description="Edit this document"
        >
          Edit
        </Menu.Item>
        <Menu.Item
          leadingIcon={<BiCopy />}
          shortcut="⌘D"
          description="Create a copy"
        >
          Duplicate
        </Menu.Item>
        <Menu.Item
          leadingIcon={<BiShare />}
          description="Share with others"
        >
          Share
        </Menu.Item>
      </Menu.Group>
      <Menu.Divider />
      <Menu.Group label="More">
        <Menu.Item leadingIcon={<BiDownload />} shortcut="⌘↓">
          Download
        </Menu.Item>
        <Menu.Item leadingIcon={<BiHeart />}>Add to Favorites</Menu.Item>
      </Menu.Group>
      <Menu.Divider />
      <Menu.Item leadingIcon={<BiTrash />} variant="danger" shortcut="⌘⌫">
        Delete
      </Menu.Item>
    </Menu>
  ),
};

export const WithTrailingIcons: Story = {
  render: () => (
    <Menu>
      <Menu.Item leadingIcon={<BiUser />} trailingIcon={<BiCheck />}>
        Active Profile
      </Menu.Item>
      <Menu.Item leadingIcon={<BiCog />}>Settings</Menu.Item>
      <Menu.Divider />
      <Menu.Item leadingIcon={<BiLogOut />}>Logout</Menu.Item>
    </Menu>
  ),
};

export const MinimalMenu: Story = {
  render: () => (
    <Menu>
      <Menu.Item>View</Menu.Item>
      <Menu.Item>Edit</Menu.Item>
      <Menu.Item>Share</Menu.Item>
      <Menu.Divider />
      <Menu.Item>Delete</Menu.Item>
    </Menu>
  ),
};

export const LongLabels: Story = {
  render: () => (
    <Menu>
      <Menu.Item leadingIcon={<BiFile />}>
        Open Recent Document from Last Week
      </Menu.Item>
      <Menu.Item leadingIcon={<BiFolder />}>
        Create New Project in Workspace
      </Menu.Item>
      <Menu.Item
        leadingIcon={<BiShare />}
        description="Share this document with team members and external collaborators"
      >
        Share with Team Members
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item leadingIcon={<BiDownload />}>
        Download as PDF with Annotations
      </Menu.Item>
    </Menu>
  ),
};

export const UserAccountMenu: Story = {
  render: () => (
    <Menu>
      <div className="px-3 py-2 border-b border-gray-200">
        <div className="font-semibold text-sm">John Doe</div>
        <div className="text-xs text-gray-500">john.doe@example.com</div>
      </div>
      <Menu.Group>
        <Menu.Item leadingIcon={<BiUser />}>Your Profile</Menu.Item>
        <Menu.Item leadingIcon={<BiCog />}>Settings</Menu.Item>
      </Menu.Group>
      <Menu.Divider />
      <Menu.Item leadingIcon={<BiLogOut />}>Sign Out</Menu.Item>
    </Menu>
  ),
};

export const ContextMenu: Story = {
  render: () => (
    <Menu>
      <Menu.Item leadingIcon={<BiEdit />} shortcut="E">
        Rename
      </Menu.Item>
      <Menu.Item leadingIcon={<BiCopy />} shortcut="C">
        Copy
      </Menu.Item>
      <Menu.Item leadingIcon={<BiCut />} shortcut="X">
        Cut
      </Menu.Item>
      <Menu.Item leadingIcon={<BiPaste />} shortcut="V">
        Paste
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item leadingIcon={<BiDownload />}>Download</Menu.Item>
      <Menu.Item leadingIcon={<BiShare />}>Share</Menu.Item>
      <Menu.Divider />
      <Menu.Item leadingIcon={<BiTrash />} variant="danger" shortcut="Del">
        Delete
      </Menu.Item>
    </Menu>
  ),
};

export const FileMenu: Story = {
  render: () => (
    <Menu>
      <Menu.Item leadingIcon={<BiFile />} shortcut="⌘N">
        New File
      </Menu.Item>
      <Menu.Item leadingIcon={<BiFolder />} shortcut="⌘⇧N">
        New Folder
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item leadingIcon={<BiFolder />} shortcut="⌘O">
        Open...
      </Menu.Item>
      <Menu.Item disabled>Open Recent</Menu.Item>
      <Menu.Divider />
      <Menu.Item leadingIcon={<BiSave />} shortcut="⌘S">
        Save
      </Menu.Item>
      <Menu.Item shortcut="⌘⇧S">Save As...</Menu.Item>
      <Menu.Item>Save All</Menu.Item>
    </Menu>
  ),
};

export const InteractiveDemo: Story = {
  render: () => {
    const handleClick = (action: string) => {
      alert(`Clicked: ${action}`);
    };

    return (
      <Menu>
        <Menu.Item
          leadingIcon={<BiEdit />}
          shortcut="⌘E"
          onClick={() => handleClick('Edit')}
        >
          Edit
        </Menu.Item>
        <Menu.Item
          leadingIcon={<BiCopy />}
          shortcut="⌘C"
          onClick={() => handleClick('Copy')}
        >
          Copy
        </Menu.Item>
        <Menu.Item
          leadingIcon={<BiShare />}
          onClick={() => handleClick('Share')}
        >
          Share
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          leadingIcon={<BiTrash />}
          variant="danger"
          onClick={() => handleClick('Delete')}
        >
          Delete
        </Menu.Item>
      </Menu>
    );
  },
};
