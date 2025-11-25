export const NAVBAR_CLASSES =
  'w-full bg-[color:var(--component-navbar-bg)] text-[color:var(--component-navbar-text)] shadow-[shadow:var(--component-navbar-shadow)]';

export const CONTENT_CLASSES =
  'mx-auto flex h-[var(--component-navbar-height)] max-w-[var(--component-navbar-max-width)] items-center justify-between gap-[length:var(--component-navbar-gap)] px-[length:var(--component-navbar-padding-x)]';

export const BRAND_CLASSES =
  'flex items-center gap-[length:var(--component-navbar-brand-gap)] text-[length:var(--component-navbar-brand-size)] font-[number:var(--component-navbar-brand-weight)] text-[color:var(--component-navbar-brand-color)]';

export const SECTION_CLASSES = 'flex items-center gap-[length:var(--component-navbar-gap)]';

export const MENU_CLASSES =
  'hidden md:flex items-center gap-[length:var(--component-navbar-menu-gap)]';

export const MENU_MOBILE_CLASSES =
  'absolute left-0 right-0 top-full max-h-0 overflow-hidden bg-[color:var(--component-navbar-bg)] shadow-[shadow:var(--component-navbar-shadow)] transition-all duration-[var(--component-navbar-transition)] md:hidden border-b-[length:var(--component-navbar-border-width)] border-[color:var(--component-navbar-border)] opacity-0';

export const MENU_MOBILE_OPEN_CLASSES =
  'max-h-[80vh] overflow-y-auto opacity-100';

export const ITEM_CLASSES = 'flex items-center';

export const LINK_CLASSES =
  'block px-[length:var(--component-navbar-link-padding-x)] py-[length:var(--component-navbar-link-padding-y)] text-[length:var(--component-navbar-link-size)] font-[number:var(--component-navbar-link-weight)] text-[color:var(--component-navbar-link-color)] hover:text-[color:var(--component-navbar-link-color-hover)] hover:bg-[color:var(--component-navbar-link-bg-hover)] rounded-[var(--component-navbar-link-radius)] transition-colors duration-[var(--component-navbar-transition)] focus-visible:outline-none focus-visible:ring-[length:var(--semantic-focus-ring-width)] focus-visible:ring-offset-[length:var(--semantic-focus-ring-offset)] focus-visible:ring-[color:var(--semantic-border-focus)]';

export const LINK_ACTIVE_CLASSES =
  'text-[color:var(--component-navbar-link-color-active)] bg-[color:var(--component-navbar-link-bg-active)] font-[number:var(--component-navbar-link-weight-active)]';

export const BURGER_CLASSES =
  'flex md:hidden flex-col justify-center items-center w-[var(--component-navbar-burger-size)] h-[var(--component-navbar-burger-size)] gap-[var(--component-navbar-burger-gap)] bg-transparent border-none cursor-pointer p-[var(--component-navbar-burger-padding)] rounded-[var(--component-navbar-link-radius)] hover:bg-[color:var(--component-navbar-link-bg-hover)] transition-colors duration-[var(--component-navbar-transition)] focus-visible:outline-none focus-visible:ring-[length:var(--semantic-focus-ring-width)] focus-visible:ring-offset-[length:var(--semantic-focus-ring-offset)] focus-visible:ring-[color:var(--semantic-border-focus)]';

export const BURGER_LINE_CLASSES =
  'block w-full h-[var(--component-navbar-burger-line-height)] bg-[color:var(--component-navbar-text)] rounded-full transition-all duration-[var(--component-navbar-transition)] origin-center';

export const BURGER_LINE_CLOSE_CLASSES = [
  'rotate-45 translate-y-[calc(var(--component-navbar-burger-gap)+var(--component-navbar-burger-line-height))]',
  'opacity-0',
  '-rotate-45 -translate-y-[calc(var(--component-navbar-burger-gap)+var(--component-navbar-burger-line-height))]',
];
