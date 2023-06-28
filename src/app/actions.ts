'use server';

import { SoldiersService } from '@/openapi';

export async function searchSoldier(searchValue: string) {
  console.log({ searchValue });
}

export const uploadStonePhoto = async (
  soldierUuid: string,
  photo: string,
  senderEmail: string,
  senderName: string
) => {
  const photoBase64 = photo.split(',')[1];

  const formData = {
    photo: photoBase64,
    senderEmail,
    senderName,
  };

  console.log(formData);

  const uploadStone = await SoldiersService.createSoldierStone(
    soldierUuid,
    formData
  ).then((res) => console.log(res));
};
