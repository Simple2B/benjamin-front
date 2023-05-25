import IconButton from '@/components/IconButton';
import { ICONS_NAME } from '@/components/constants/iconName';
import { PATH } from '@/components/constants/path.constants';
import SettingBlock from '@/components/settingsBlock/SettingBlock';
import Link from 'next/link';
import React from 'react';
import { ApiService } from '@/openapi';

const LINKS = ['aboutUrl', 'gravestoneFormUrl', 'contactUsUrl', 'donateUrl'];

export const dynamic = 'force-dynamic';

const Page = async () => {
  const settingsData = await ApiService.rootApiGet();
  const links: { [key: string]: string } = {};

  (Object.keys(settingsData) as (keyof typeof settingsData)[]).forEach(
    (key) => {
      if (LINKS.includes(key)) {
        links[key] = settingsData[key];
      }
    }
  );

  return (
    <div className="flex flex-col items-start m-6 gap-5">
      <div className="w-full flex items-baseline justify-between">
        <Link href={PATH.cemetery}>
          <IconButton
            iconName={ICONS_NAME.selectingArrow}
            className="w-4 h-4 rotate-180"
          />
        </Link>
        <h1 className="text-2xl font-semibold flex-grow text-center">
          Settings
        </h1>
      </div>

      <SettingBlock links={links} />
    </div>
  );
};

export default Page;
