import SettingBlock from '@/components/settingsBlock/SettingBlock';
import React from 'react';

export default function Page() {
  return (
    <div className="flex flex-col items-center m-6 gap-5">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <SettingBlock />
    </div>
  );
}
