import PreviewCementery from '@/components/cemetery/PreviewCementery';
import { PATH } from '@/components/constants/path.constants';
import { CemeteriesService } from '@/openapi';
import { redirect } from 'next/navigation';

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

  const cemeteries = await CemeteriesService.getCemeteriesApiCemeteryGet();

  const cemetery = cemeteries.items.find(
    (cemetery) => cemetery.uuid === cemeteryUuid
  );

  if (!cemetery) {
    redirect(PATH.location);
  }

  return (
    <div className="flex flex-col gap-6 items-center">
      <PreviewCementery cemetery={cemetery} cemeteries={cemeteries.items} />
    </div>
  );
};

export default Page;
