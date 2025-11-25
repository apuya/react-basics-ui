import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';
import { FiHome, FiUser, FiSettings, FiHelpCircle, FiSearch, FiShoppingCart, FiBell } from 'react-icons/fi';
import { Button } from '../../basic/forms/Button';

const meta: Meta<typeof Navbar> = {
  title: 'Experimental/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Navbar component for site-wide navigation. Features responsive mobile menu, flexible layout, and customizable sections. Perfect for headers, app bars, and top navigation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    fixed: {
      control: 'boolean',
      description: 'Whether the navbar is fixed to the top of the viewport',
    },
    bordered: {
      control: 'boolean',
      description: 'Whether to show a bottom border',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic navbar with logo and navigation links.',
      },
    },
  },
  render: () => (
    <Navbar>
      <Navbar.Content>
        <Navbar.Brand>
          <span className="text-2xl font-bold">Logo</span>
        </Navbar.Brand>
        <Navbar.Menu>
          <Navbar.Item>
            <Navbar.Link href="#" isActive>
              Home
            </Navbar.Link>
          </Navbar.Item>
          <Navbar.Item>
            <Navbar.Link href="#">About</Navbar.Link>
          </Navbar.Item>
          <Navbar.Item>
            <Navbar.Link href="#">Services</Navbar.Link>
          </Navbar.Item>
          <Navbar.Item>
            <Navbar.Link href="#">Contact</Navbar.Link>
          </Navbar.Item>
        </Navbar.Menu>
      </Navbar.Content>
    </Navbar>
  ),
};

export const WithMobileMenu: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Navbar with responsive mobile menu (burger button visible on mobile).',
      },
    },
  },
  render: () => (
    <Navbar>
      <Navbar.Content>
        <Navbar.Brand>
          <span className="text-2xl font-bold text-blue-600">MyApp</span>
        </Navbar.Brand>
        
        {/* Desktop Menu */}
        <Navbar.Menu>
          <Navbar.Item>
            <Navbar.Link href="#" isActive>
              Home
            </Navbar.Link>
          </Navbar.Item>
          <Navbar.Item>
            <Navbar.Link href="#">Products</Navbar.Link>
          </Navbar.Item>
          <Navbar.Item>
            <Navbar.Link href="#">Pricing</Navbar.Link>
          </Navbar.Item>
          <Navbar.Item>
            <Navbar.Link href="#">About</Navbar.Link>
          </Navbar.Item>
        </Navbar.Menu>
        
        {/* Mobile Menu Toggle */}
        <Navbar.Burger />
      </Navbar.Content>
      
      {/* Mobile Menu */}
      <Navbar.Menu mobile>
        <Navbar.Item>
          <Navbar.Link href="#" isActive>
            Home
          </Navbar.Link>
        </Navbar.Item>
        <Navbar.Item>
          <Navbar.Link href="#">Products</Navbar.Link>
        </Navbar.Item>
        <Navbar.Item>
          <Navbar.Link href="#">Pricing</Navbar.Link>
        </Navbar.Item>
        <Navbar.Item>
          <Navbar.Link href="#">About</Navbar.Link>
        </Navbar.Item>
      </Navbar.Menu>
    </Navbar>
  ),
};

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Navbar with icons in navigation links for better visual hierarchy.',
      },
    },
  },
  render: () => (
    <Navbar bordered>
      <Navbar.Content>
        <Navbar.Brand>
          <FiHome className="h-6 w-6" />
          <span className="text-xl font-bold">Dashboard</span>
        </Navbar.Brand>
        
        <Navbar.Menu>
          <Navbar.Item>
            <Navbar.Link href="#" isActive className="inline-flex items-center gap-2">
              <FiHome className="h-4 w-4" />
              Home
            </Navbar.Link>
          </Navbar.Item>
          <Navbar.Item>
            <Navbar.Link href="#" className="inline-flex items-center gap-2">
              <FiUser className="h-4 w-4" />
              Profile
            </Navbar.Link>
          </Navbar.Item>
          <Navbar.Item>
            <Navbar.Link href="#" className="inline-flex items-center gap-2">
              <FiSettings className="h-4 w-4" />
              Settings
            </Navbar.Link>
          </Navbar.Item>
        </Navbar.Menu>
        
        <Navbar.Burger />
      </Navbar.Content>
      
      <Navbar.Menu mobile>
        <Navbar.Item>
          <Navbar.Link href="#" isActive className="inline-flex items-center gap-2">
            <FiHome className="h-4 w-4" />
            Home
          </Navbar.Link>
        </Navbar.Item>
        <Navbar.Item>
          <Navbar.Link href="#" className="inline-flex items-center gap-2">
            <FiUser className="h-4 w-4" />
            Profile
          </Navbar.Link>
        </Navbar.Item>
        <Navbar.Item>
          <Navbar.Link href="#" className="inline-flex items-center gap-2">
            <FiSettings className="h-4 w-4" />
            Settings
          </Navbar.Link>
        </Navbar.Item>
      </Navbar.Menu>
    </Navbar>
  ),
};

export const WithActions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Navbar with action buttons on the right side.',
      },
    },
  },
  render: () => (
    <Navbar>
      <Navbar.Content>
        <Navbar.Brand>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Brand
          </span>
        </Navbar.Brand>
        
        <Navbar.Menu>
          <Navbar.Item>
            <Navbar.Link href="#" isActive>
              Home
            </Navbar.Link>
          </Navbar.Item>
          <Navbar.Item>
            <Navbar.Link href="#">Features</Navbar.Link>
          </Navbar.Item>
          <Navbar.Item>
            <Navbar.Link href="#">Pricing</Navbar.Link>
          </Navbar.Item>
        </Navbar.Menu>
        
        <Navbar.Section>
          <Button variant="ghost" size="small">
            Sign In
          </Button>
          <Button variant="primary" size="small">
            Sign Up
          </Button>
        </Navbar.Section>
        
        <Navbar.Burger />
      </Navbar.Content>
      
      <Navbar.Menu mobile>
        <Navbar.Item>
          <Navbar.Link href="#" isActive>
            Home
          </Navbar.Link>
        </Navbar.Item>
        <Navbar.Item>
          <Navbar.Link href="#">Features</Navbar.Link>
        </Navbar.Item>
        <Navbar.Item>
          <Navbar.Link href="#">Pricing</Navbar.Link>
        </Navbar.Item>
        <div className="p-4 flex flex-col gap-2">
          <Button variant="ghost" size="default" className="w-full">
            Sign In
          </Button>
          <Button variant="primary" size="default" className="w-full">
            Sign Up
          </Button>
        </div>
      </Navbar.Menu>
    </Navbar>
  ),
};

export const EcommercExample: Story = {
  parameters: {
    docs: {
      description: {
        story: 'E-commerce navbar with search, cart, and user actions.',
      },
    },
  },
  render: () => (
    <Navbar bordered>
      <Navbar.Content>
        <Navbar.Brand>
          <span className="text-2xl font-bold">Shop</span>
        </Navbar.Brand>
        
        <Navbar.Menu>
          <Navbar.Item>
            <Navbar.Link href="#" isActive>
              New Arrivals
            </Navbar.Link>
          </Navbar.Item>
          <Navbar.Item>
            <Navbar.Link href="#">Men</Navbar.Link>
          </Navbar.Item>
          <Navbar.Item>
            <Navbar.Link href="#">Women</Navbar.Link>
          </Navbar.Item>
          <Navbar.Item>
            <Navbar.Link href="#">Sale</Navbar.Link>
          </Navbar.Item>
        </Navbar.Menu>
        
        <Navbar.Section>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <FiSearch className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
            <FiShoppingCart className="h-5 w-5" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <FiUser className="h-5 w-5" />
          </button>
        </Navbar.Section>
        
        <Navbar.Burger />
      </Navbar.Content>
      
      <Navbar.Menu mobile>
        <Navbar.Item>
          <Navbar.Link href="#" isActive>
            New Arrivals
          </Navbar.Link>
        </Navbar.Item>
        <Navbar.Item>
          <Navbar.Link href="#">Men</Navbar.Link>
        </Navbar.Item>
        <Navbar.Item>
          <Navbar.Link href="#">Women</Navbar.Link>
        </Navbar.Item>
        <Navbar.Item>
          <Navbar.Link href="#">Sale</Navbar.Link>
        </Navbar.Item>
      </Navbar.Menu>
    </Navbar>
  ),
};

export const AppDashboard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Application dashboard navbar with user profile and notifications.',
      },
    },
  },
  render: () => (
    <Navbar>
      <Navbar.Content>
        <Navbar.Brand>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg" />
            <span className="text-xl font-bold">Dashboard</span>
          </div>
        </Navbar.Brand>
        
        <Navbar.Menu>
          <Navbar.Item>
            <Navbar.Link href="#" isActive>
              Overview
            </Navbar.Link>
          </Navbar.Item>
          <Navbar.Item>
            <Navbar.Link href="#">Analytics</Navbar.Link>
          </Navbar.Item>
          <Navbar.Item>
            <Navbar.Link href="#">Reports</Navbar.Link>
          </Navbar.Item>
          <Navbar.Item>
            <Navbar.Link href="#">Settings</Navbar.Link>
          </Navbar.Item>
        </Navbar.Menu>
        
        <Navbar.Section>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
            <FiBell className="h-5 w-5" />
            <span className="absolute top-1 right-1 bg-red-500 h-2 w-2 rounded-full" />
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
            <div className="h-8 w-8 bg-gray-300 rounded-full" />
            <span className="text-sm font-medium">John Doe</span>
          </div>
        </Navbar.Section>
        
        <Navbar.Burger />
      </Navbar.Content>
      
      <Navbar.Menu mobile>
        <Navbar.Item>
          <Navbar.Link href="#" isActive>
            Overview
          </Navbar.Link>
        </Navbar.Item>
        <Navbar.Item>
          <Navbar.Link href="#">Analytics</Navbar.Link>
        </Navbar.Item>
        <Navbar.Item>
          <Navbar.Link href="#">Reports</Navbar.Link>
        </Navbar.Item>
        <Navbar.Item>
          <Navbar.Link href="#">Settings</Navbar.Link>
        </Navbar.Item>
      </Navbar.Menu>
    </Navbar>
  ),
};

export const Fixed: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Fixed navbar that stays at the top when scrolling.',
      },
    },
  },
  render: () => (
    <div>
      <Navbar fixed bordered>
        <Navbar.Content>
          <Navbar.Brand>
            <span className="text-2xl font-bold">Fixed Nav</span>
          </Navbar.Brand>
          
          <Navbar.Menu>
            <Navbar.Item>
              <Navbar.Link href="#" isActive>
                Home
              </Navbar.Link>
            </Navbar.Item>
            <Navbar.Item>
              <Navbar.Link href="#">About</Navbar.Link>
            </Navbar.Item>
            <Navbar.Item>
              <Navbar.Link href="#">Contact</Navbar.Link>
            </Navbar.Item>
          </Navbar.Menu>
          
          <Navbar.Burger />
        </Navbar.Content>
        
        <Navbar.Menu mobile>
          <Navbar.Item>
            <Navbar.Link href="#" isActive>
              Home
            </Navbar.Link>
          </Navbar.Item>
          <Navbar.Item>
            <Navbar.Link href="#">About</Navbar.Link>
          </Navbar.Item>
          <Navbar.Item>
            <Navbar.Link href="#">Contact</Navbar.Link>
          </Navbar.Item>
        </Navbar.Menu>
      </Navbar>
      <div className="p-8 pt-24">
        <p className="text-gray-600">
          Scroll down to see the fixed navbar behavior. The navbar will stay at the top of
          the viewport.
        </p>
        <div className="h-screen flex items-center justify-center">
          <p className="text-gray-400">Scroll content...</p>
        </div>
      </div>
    </div>
  ),
};

export const MinimalDesign: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Minimal navbar design with clean aesthetics.',
      },
    },
  },
  render: () => (
    <Navbar bordered={false}>
      <Navbar.Content>
        <Navbar.Brand>
          <span className="text-sm font-semibold tracking-wider uppercase">Minimal</span>
        </Navbar.Brand>
        
        <Navbar.Menu>
          <Navbar.Item>
            <Navbar.Link href="#" isActive>
              Work
            </Navbar.Link>
          </Navbar.Item>
          <Navbar.Item>
            <Navbar.Link href="#">About</Navbar.Link>
          </Navbar.Item>
          <Navbar.Item>
            <Navbar.Link href="#">Contact</Navbar.Link>
          </Navbar.Item>
        </Navbar.Menu>
        
        <Navbar.Burger />
      </Navbar.Content>
      
      <Navbar.Menu mobile>
        <Navbar.Item>
          <Navbar.Link href="#" isActive>
            Work
          </Navbar.Link>
        </Navbar.Item>
        <Navbar.Item>
          <Navbar.Link href="#">About</Navbar.Link>
        </Navbar.Item>
        <Navbar.Item>
          <Navbar.Link href="#">Contact</Navbar.Link>
        </Navbar.Item>
      </Navbar.Menu>
    </Navbar>
  ),
};

export const WithLogo: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Navbar with logo image and branding.',
      },
    },
  },
  render: () => (
    <Navbar>
      <Navbar.Content>
        <Navbar.Brand>
          <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
            L
          </div>
          <span className="text-xl font-bold">LogoName</span>
        </Navbar.Brand>
        
        <Navbar.Menu>
          <Navbar.Item>
            <Navbar.Link href="#" isActive>
              Products
            </Navbar.Link>
          </Navbar.Item>
          <Navbar.Item>
            <Navbar.Link href="#">Solutions</Navbar.Link>
          </Navbar.Item>
          <Navbar.Item>
            <Navbar.Link href="#">Resources</Navbar.Link>
          </Navbar.Item>
          <Navbar.Item>
            <Navbar.Link href="#">Pricing</Navbar.Link>
          </Navbar.Item>
        </Navbar.Menu>
        
        <Navbar.Section>
          <Button variant="ghost" size="small">
            Login
          </Button>
          <Button variant="primary" size="small">
            Get Started
          </Button>
        </Navbar.Section>
        
        <Navbar.Burger />
      </Navbar.Content>
      
      <Navbar.Menu mobile>
        <Navbar.Item>
          <Navbar.Link href="#" isActive>
            Products
          </Navbar.Link>
        </Navbar.Item>
        <Navbar.Item>
          <Navbar.Link href="#">Solutions</Navbar.Link>
        </Navbar.Item>
        <Navbar.Item>
          <Navbar.Link href="#">Resources</Navbar.Link>
        </Navbar.Item>
        <Navbar.Item>
          <Navbar.Link href="#">Pricing</Navbar.Link>
        </Navbar.Item>
        <div className="p-4 flex flex-col gap-2">
          <Button variant="ghost" size="default" className="w-full">
            Login
          </Button>
          <Button variant="primary" size="default" className="w-full">
            Get Started
          </Button>
        </div>
      </Navbar.Menu>
    </Navbar>
  ),
};

export const HelpCenter: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Help center navbar with search and support links.',
      },
    },
  },
  render: () => (
    <Navbar bordered>
      <Navbar.Content>
        <Navbar.Brand>
          <FiHelpCircle className="h-6 w-6" />
          <span className="text-xl font-bold">Help Center</span>
        </Navbar.Brand>
        
        <Navbar.Menu>
          <Navbar.Item>
            <Navbar.Link href="#" isActive>
              Getting Started
            </Navbar.Link>
          </Navbar.Item>
          <Navbar.Item>
            <Navbar.Link href="#">Guides</Navbar.Link>
          </Navbar.Item>
          <Navbar.Item>
            <Navbar.Link href="#">API</Navbar.Link>
          </Navbar.Item>
          <Navbar.Item>
            <Navbar.Link href="#">FAQ</Navbar.Link>
          </Navbar.Item>
        </Navbar.Menu>
        
        <Navbar.Section>
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </Navbar.Section>
        
        <Navbar.Burger />
      </Navbar.Content>
      
      <Navbar.Menu mobile>
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <Navbar.Item>
          <Navbar.Link href="#" isActive>
            Getting Started
          </Navbar.Link>
        </Navbar.Item>
        <Navbar.Item>
          <Navbar.Link href="#">Guides</Navbar.Link>
        </Navbar.Item>
        <Navbar.Item>
          <Navbar.Link href="#">API</Navbar.Link>
        </Navbar.Item>
        <Navbar.Item>
          <Navbar.Link href="#">FAQ</Navbar.Link>
        </Navbar.Item>
      </Navbar.Menu>
    </Navbar>
  ),
};
