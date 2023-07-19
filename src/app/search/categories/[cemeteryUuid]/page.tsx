import { CategoryPreview } from '@/components/categories/сategoryPreview/CategoryPreview';
import { SoldiersService } from '@/openapi';
import React from 'react';

interface ICategoryPageProps {
  params: ICategoryParams;
}

interface ICategoryParams {
  cemeteryUuid: string;
}

const Page = async ({ params }: ICategoryPageProps) => {
  const { cemeteryUuid } = params;

  const catogoriesValues = await SoldiersService.getCemeterySoldierFilters(
    cemeteryUuid
  );

  return (
    <CategoryPreview
      categoriesValues={catogoriesValues}
      cemeteryUuid={cemeteryUuid}
    />
  );
};
export default Page;
