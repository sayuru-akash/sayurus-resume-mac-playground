import type { ReactNode } from "react";

interface MenuItemProps {
  onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
  children: ReactNode;
}

interface MenuItemGroupProps {
  border?: boolean;
  children: ReactNode;
}

const MenuItem = (props: MenuItemProps) => {
  return (
    <li
      onClick={props.onClick}
      className="cursor-default px-5 leading-6 text-black hover:bg-blue-500 hover:text-white dark:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-colors duration-100"
    >
      {props.children}
    </li>
  );
};

const MenuItemGroup = (props: MenuItemGroupProps) => {
  const border =
    props.border === false
      ? ""
      : "border-b border-gray-300/40 dark:border-gray-600/40";
  return <ul className={`py-1 ${border}`}>{props.children}</ul>;
};

export { MenuItem, MenuItemGroup };
