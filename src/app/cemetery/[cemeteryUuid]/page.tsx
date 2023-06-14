import { redirect } from 'next/navigation';
import { CemeteriesService } from '@/openapi';
import PreviewCemetery from '@/components/cemetery/PreviewCementery';
import { PATH } from '@/components/constants/path.constants';

// export const dynamic = 'force-dynamic';
export const fetchCache = 'default-cache';
export const revalidate = 60;

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

  return <PreviewCemetery cemetery={cemetery} cemeteries={cemeteries.items} />;
};

export default Page;
