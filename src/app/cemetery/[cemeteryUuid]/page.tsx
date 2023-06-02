import PreviewCementery from '@/components/cemetery/PreviewCementery';
import { CemeteriesService } from '@/openapi';

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
  const cemetery =
    await CemeteriesService.getCemeteryApiCemeteryCemeteryUuidGet(cemeteryUuid);

  const cemeteries = await CemeteriesService.getCemeteriesApiCemeteryGet();
  return (
    <div className="flex flex-col gap-6 items-center">
      <PreviewCementery cemetery={cemetery} cemeteries={cemeteries.items} />
    </div>
  );
};

export default Page;
