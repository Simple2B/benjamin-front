import { redirect } from 'next/navigation';
import { CemeteriesService, SoldiersService } from '@/openapi';
import { PATH } from '@/components/constants/path.constants';
import PreviewCemeterySoldier from '@/components/cemeterySoldier/PreviewCementery';

// export const dynamic = 'force-dynamic';
export const fetchCache = 'default-cache';
export const revalidate = 60;

interface ICemeteryPageProps {
  params: ICemeteryParams;
}

interface ICemeteryParams {
  cemeteryUuid: string;
  soldierUuid: string;
}

const Page = async ({ params }: ICemeteryPageProps) => {
  const { cemeteryUuid, soldierUuid } = params;

  const cemeteries = await CemeteriesService.getCemeteries();

  const cemetery = cemeteries.items.find(
    (cemetery) => cemetery.uuid === cemeteryUuid
  );

  const soldier = await SoldiersService.getSoldier(soldierUuid);

  if (!soldier) {
    redirect(PATH.location);
  }

  if (!cemetery) {
    redirect(PATH.location);
  }

  return <PreviewCemeterySoldier cemetery={cemetery} soldier={soldier} />;
};

export default Page;
