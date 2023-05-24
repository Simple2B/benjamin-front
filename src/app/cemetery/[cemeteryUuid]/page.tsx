import PreviewCementery from '@/components/PreviewCementery';
import { CemeteriesService } from '@/openapi';

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
  console.log('Cemetery', cemetery);

  return (
    <div className="flex flex-col gap-6 items-center px-4 mb-4">
      <PreviewCementery cemetery={cemetery} />
    </div>
  );
};

export default Page;
