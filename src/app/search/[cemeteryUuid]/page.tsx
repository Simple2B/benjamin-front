import { PATH } from '@/components/constants/path.constants';
import { PreviewerSearch } from '@/components/search/PreviewerSearch';
import { CemeteriesService } from '@/openapi';
import { redirect } from 'next/navigation';
import React from 'react';

interface ICemeteryPageProps {
  params: ICemeteryParams;
}

interface ICemeteryParams {
  cemeteryUuid: string;
}

const Page = async ({ params }: ICemeteryPageProps) => {
  const { cemeteryUuid } = params;

  const cemeteries = await CemeteriesService.getCemeteries();

  const cemetery = cemeteries.items.find(
    (cemetery) => cemetery.uuid === cemeteryUuid
  );

  if (!cemetery) {
    redirect(PATH.location);
  }

  return <PreviewerSearch cemetery={cemetery} />;
};

export default Page;
