export const MENU_BASE_CLASSES =
  'min-w-[12rem] rounded-lg border bg-white shadow-lg py-1 overflow-hidden';

export const MENU_ITEM_BASE_CLASSES =
  'relative flex items-center gap-3 px-3 py-2 text-sm cursor-pointer select-none outline-none transition-colors duration-150';

export const MENU_ITEM_STATES = {
  default:
    'text-gray-700 hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-200',
  disabled:
    'text-gray-400 cursor-not-allowed pointer-events-none',
  danger:
    'text-red-600 hover:bg-red-50 focus:bg-red-50 active:bg-red-100',
} as const;

export const MENU_DIVIDER_CLASSES = 'my-1 border-t border-gray-200';

export const MENU_GROUP_CLASSES = 'py-1';

export const MENU_GROUP_LABEL_CLASSES =
  'px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider';

export const MENU_ITEM_ICON_CLASSES = 'w-4 h-4 shrink-0';

export const MENU_ITEM_SHORTCUT_CLASSES =
  'ml-auto text-xs text-gray-400 tracking-wider';

export const MENU_ITEM_DESCRIPTION_CLASSES =
  'text-xs text-gray-500 block mt-0.5';
