import { cn } from "@heroui/theme";
import React, { useEffect, useMemo, useRef, useState } from "react";

interface ISkillProps {
  errors: { name?: string; skills?: string; file?: string };
  options?: string[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Skills = ({
  errors,
  options = [],
  open,
  setOpen,

  selected,
  setSelected,
}: ISkillProps) => {
  const [allOptions, setAllOptions] = useState<string[]>(options);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (query.trim() === "") {
      setOpen(false);
      setHighlight(0);
    } else {
      setOpen(true);
      setHighlight(0);
    }
  }, [query]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        listRef.current &&
        !listRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allOptions
      .filter((o) => !selected.includes(o))
      .filter((o) => (q ? o.toLowerCase().includes(q) : true));
  }, [allOptions, query, selected]);

  const addTag = (tag: string) => {
    if (!tag) return;
    if (!allOptions.includes(tag)) {
      setAllOptions((s) => [tag, ...s]);
    }
    if (!selected.includes(tag)) {
      setSelected((s) => [...s, tag]);
    }
    setQuery("");
    setOpen(false);
    inputRef.current?.focus();
  };

  const removeTag = (tag: string) => {
    setSelected((s) => s.filter((x) => x !== tag));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setHighlight((h) => Math.min(h + 1, Math.max(0, filtered.length - 1)));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (open && filtered.length > 0) {
        addTag(filtered[highlight]);
      } else if (query.trim()) {
        addTag(query.trim());
      }
      return;
    }
    if (e.key === "Backspace" && query === "") {
      setSelected((s) => s.slice(0, -1));
      return;
    }
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Skills
      </label>
      <div className="relative">
        <div
          className={cn(
            "flex items-center",
            "px-3 py-2 border rounded-xl bg-white text-black",
            errors.skills ? "border-red-400" : "border-gray-200"
          )}
          onClick={() => inputRef.current?.focus()}
        >
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Choose a skill"
            className="flex-1 min-w-[120px] py-1 outline-none text-sm bg-transparent placeholder-gray-400"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-controls="skills-listbox"
          />
        </div>

        {selected.length > 0 && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {selected.map((s) => (
              <span
                key={s}
                className={cn(
                  "bg-gray-200 px-2 py-1",
                  "flex items-center gap-2",
                  "text-black text-xs rounded"
                )}
              >
                {s}
                <button
                  type="button"
                  onClick={() => removeTag(s)}
                  className="inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-indigo-100"
                  aria-label={`Remove ${s}`}
                >
                  <img src="/icons/filter_close.svg" alt="remove" className="w-5 h-4"/>
                </button>
              </span>
            ))}
          </div>
        )}

        {open && (
          <ul
            id="skills-listbox"
            role="listbox"
            ref={listRef}
            className="absolute z-20 mt-1 w-full max-h-56 overflow-auto bg-white border rounded-md shadow-lg"
          >
            {filtered.length === 0 ? (
              <li
                className="px-3 py-2 text-sm text-black cursor-pointer hover:bg-gray-50"
                onMouseDown={(e) => {
                  e.preventDefault();
                  addTag(query.trim());
                }}
              >
                Add "{query}"
              </li>
            ) : (
              filtered.map((opt, i) => (
                <li
                  key={opt}
                  role="option"
                  aria-selected={highlight === i}
                  onMouseDown={(ev) => {
                    ev.preventDefault();
                    addTag(opt);
                  }}
                  onMouseEnter={() => setHighlight(i)}
                  className={`px-3 py-2 text-sm cursor-pointer flex justify-between items-center ${
                    highlight === i
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700"
                  }`}
                >
                  <span>{opt}</span>
                </li>
              ))
            )}
          </ul>
        )}

        {errors.skills && (
          <div className="text-sm text-red-600 mt-2">{errors.skills}</div>
        )}
      </div>
    </div>
  );
};
