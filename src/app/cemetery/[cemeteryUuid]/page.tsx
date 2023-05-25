import PreviewCementery from '@/components/PreviewCementery';
import { CemeteriesService } from '@/openapi';

export const dynamic = 'force-dynamic';

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

  const cemeteries = await CemeteriesService.getCemeteriesApiCemeteryGet(
    1,
    1000
  );
  return (
    <div className="flex flex-col gap-6 items-center px-4 mb-4">
      <PreviewCementery cemetery={cemetery} cemeteries={cemeteries.items} />
    </div>
  );
};

export default Page;
