"use client";

import * as React from "react";
import { LuSettings2 } from "react-icons/lu";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export type MultiFilterSection = {
  key: string;
  title: string;
  label?: string;
  options?: Array<string | number>;
  initialValue?: string | number | null;
  onSelect?: (value: string | number | null) => void;
  render?: (
    value: string | number | null,
    setValue: (v: string | number | null) => void
  ) => React.ReactNode;
};

export type MultiFilterButtonProps = {
  label?: React.ReactNode;
  sections?: MultiFilterSection[];
  onFilterClick?: (selections: Record<string, string | number | null>) => void;
  className?: string;
};

export function MultiFilterButton({
  label = "Filter",
  sections = [],
  onFilterClick,
  className,
}: MultiFilterButtonProps) {
  const [selections, setSelections] = React.useState<
    Record<string, string | number | null>
  >(() => {
    const init: Record<string, string | number | null> = {};
    sections.forEach((s) => {
      init[s.key] = s.initialValue ?? null;
    });
    return init;
  });

  React.useEffect(() => {
    setSelections((prev) => {
      const next = { ...prev };
      sections.forEach((s) => {
        if (!(s.key in next)) next[s.key] = s.initialValue ?? null;
      });
      return next;
    });
  }, [sections]);

  const handleSectionSelect = (key: string, value: string | number | null) => {
    setSelections((prev) => ({ ...prev, [key]: value }));
    const section = sections.find((s) => s.key === key);
    if (section && typeof section.onSelect === "function")
      section.onSelect(value);
  };

  const handleFilter = () => {
    onFilterClick?.(selections);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={
            "text-black p-1 rounded focus:outline-none border-grey-300 border-2 " +
            (className ?? "")
          }
        >
          <div className="flex flex-row text-sm font-normal">
            <LuSettings2 className="h-4 w-8 text-tgrey3" />
            {label}{" "}
            <MdOutlineKeyboardArrowDown className="w-8 h-6 text-tgrey3" />
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent sideOffset={8} className="max-w-52 mr-8 p-3">
        <div className="space-y-4">
          {sections.map((sec) => (
            <div key={sec.key} className="space-y-2">
              <h2 className="font-normal text-sm text-tgrey3">{sec.title}</h2>
              {sec.render ? (
                sec.render(selections[sec.key], (v) =>
                  handleSectionSelect(sec.key, v)
                )
              ) : (
                <Select
                  onValueChange={(v) => handleSectionSelect(sec.key, v)}
                  value={
                    selections[sec.key] == null
                      ? undefined
                      : String(selections[sec.key])
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder={sec.label ?? "All"} />
                  </SelectTrigger>
                  <SelectContent>
                    {(sec.options ?? []).map((opt) => (
                      <SelectItem key={String(opt)} value={String(opt)}>
                        {String(opt)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          ))}

          <Button
            className="font-bold w-full text-white text-sm bg-dashboardButtons py-1 px-2 rounded-lg"
            onClick={handleFilter}
            type="button"
          >
            Filter
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default MultiFilterButton;
