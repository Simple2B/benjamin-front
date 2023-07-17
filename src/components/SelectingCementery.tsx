'use client';
import React from 'react';
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import IconButton from './IconButton';
import { ICONS_NAME } from './constants/iconName';
import { CemeteryOut } from '@/openapi';

type ISelectingCemeteriesProps = {
  selectedCemetery?: CemeteryOut | null;
  onSelect: (arg: CemeteryOut) => void;
  cemeteries: Array<CemeteryOut>;
  setSelectingOpen: (arg: boolean) => void;
  boxWidth: string;
};

const SelectingCemetery = ({
  selectedCemetery,
  onSelect,
  cemeteries,
  setSelectingOpen,
  boxWidth,
}: ISelectingCemeteriesProps) => {
  return (
    <div className={`${boxWidth} h-10 z-50 relative`}>
      <Listbox value={selectedCemetery} onChange={onSelect}>
        {({ open }) => (
          <>
            {setSelectingOpen(open)}
            <div className="relative mt-1">
              <Listbox.Button
                style={{
                  transitionProperty: 'border-radius',
                  transitionDuration: '150ms',
                }}
                className={`relative w-full h-10 cursor-default text-sm leading-6 pl-4 ${
                  open ? 'rounded-t-3xl' : 'rounded-3xl'
                } bg-white pt-2 text-left settings-shawdow  focus:outline-nonesm:text-sm  font-noto transition duration-500 ease-in-out `}
              >
                <span
                  className={`block truncate font-noto w-[235px] pb-1 ${
                    open && 'border-b border-solid border-grey-40'
                  }`}
                >
                  {selectedCemetery?.name
                    ? selectedCemetery.name
                    : 'Select cemetery'}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                  <IconButton
                    iconName={ICONS_NAME.selectCemeteryArrow}
                    className={`h-4 w-4 m-1 ${open && 'rotate-90'}`}
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Listbox.Options
                  placeholder="Select cemetery"
                  className="absolute max-h-60 w-full overflow-auto rounded-b-3xl bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {cemeteries.map((cementery) => (
                    <div key={cementery.uuid}>
                      {cementery.uuid !== selectedCemetery?.uuid && (
                        <Listbox.Option
                          key={cementery.uuid}
                          className={({ active }) =>
                            `relative cursor-default select-none pt-2 pl-4 text-sm leading-6 h-10 flex`
                          }
                          value={cementery}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`font-noto block truncate w-[235px] border-b border-solid border-[rgba(217, 218, 221, 0.5)] ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {cementery.name}
                              </span>
                            </>
                          )}
                        </Listbox.Option>
                      )}
                    </div>
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
