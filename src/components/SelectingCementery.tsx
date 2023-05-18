"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import IconButton from "./IconButton";
import { ICONS_NAME } from "./constants/iconName";

type ISelectingCemeterProps = {
  setState: React.Dispatch<React.SetStateAction<string | undefined>>;
};

interface ICemeteryInfo {
  id: number;
  name: string;
  value: string;
}

const SelectingCemetery = ({ setState }: ISelectingCemeterProps) => {
  const [cemeteries, setCemeteries] = useState<ICemeteryInfo[]>([]);
  const [selected, setSelected] = useState<ICemeteryInfo | undefined>();

  const handleChange = (e: ICemeteryInfo) => {
    setState(e.value);
    setSelected(e);
  };

  useEffect(() => {
    const cem: ICemeteryInfo[] = [
      { id: 0, name: "Select a cemetery", value: "" },
      { id: 1, name: "cemetery1", value: "cemetery1" },
      { id: 2, name: "cemetery2", value: "cemetery2" },
      { id: 3, name: "cemetery3", value: "cemetery3" },
    ];
    setCemeteries(cem);
    setSelected(cem[0]);
  }, []);

  return (
    <div className="w-80">
      <Listbox value={selected} onChange={handleChange}>
        {({ open }) => (
          <>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full h-10 cursor-default rounded-3xl bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">{selected?.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <IconButton
                    iconName={ICONS_NAME.selectingArrow}
                    className={`h-4 w-4 m-1 ${open && "rotate-90"}`}
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {cemeteries.map((cemetery, cemeteryIdx) => (
                    <Listbox.Option
                      key={cemeteryIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-900"
                        }`
                      }
                      value={cemetery}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {cemetery.name}
                          </span>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default SelectingCemetery;
