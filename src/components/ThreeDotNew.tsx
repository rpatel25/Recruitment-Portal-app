"use client";

import { useRef } from "react";
import { Menu } from "primereact/menu";

interface IProps {
  onClickSave?: () => void;
  onClickDelete?: () => void;
  onClickUnsave?: () => void;
}

const saveIcon = (
  <img src="icons/save.svg" alt="" className="flex h-6 w-6 text-black mr-1" />
);

const deleteIcon = (
  <img src="icons/delete.svg" alt="" className="flex h-6 w-6 text-black mr-1" />
);

const unsaveIcon = (
  <img src="icons/unsave.svg" alt="" className="flex h-6 w-6 text-black mr-1" />
);


export default function ThreeDotNewMenu({ onClickSave, onClickDelete, onClickUnsave }: IProps) {
  const menu = useRef<Menu>(null);

  const items = [
    ...(onClickSave ? [{
      label: "Save",
      icon: saveIcon,
      command: () => onClickSave(),
    }] : []),
    ...(onClickUnsave ? [{
      label: "Unsave",
      icon: unsaveIcon,
      command: () => onClickUnsave(),
    }] : []),
    ...(onClickDelete ? [{
      label: "Delete",
      icon: deleteIcon,
      command: () => onClickDelete(),
    }] : []),
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
