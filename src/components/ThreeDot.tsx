"use client";

import { useRef } from "react";
import { Menu } from "primereact/menu";

interface IProps {
  onClickModify: () => void;
}

const modifyIcon = (
  <img src="icons/modify.svg" alt="" className="flex h-6 w-6 text-black mr-1" />
);

export default function ThreeDotMenu({ onClickModify }: IProps) {
  const menu = useRef<Menu>(null);

  const items = [
    {
      label: "Modify",
      icon: modifyIcon,
      command: () => onClickModify(),
    },
  ];

  return (
    <div className="relative">
      <img
        src="/icons/menu.svg"
        alt="menu"
        className="w-6 h-6 hover:cursor-pointer"
        onClick={(event) => menu.current?.toggle(event)}
        aria-haspopup
        aria-controls="popup_menu"
      />

      <Menu
        model={items}
        popup
        ref={menu}
        id="popup_menu"
        pt={{
          root: { className: "p-0 text-sm w-32 rounded-2xl" },
          content: { className: "p-0" },
          menuitem: { className: "p-0 text-sm font-medium text-[#323130]" },
        }}
      />
    </div>
  );
}
