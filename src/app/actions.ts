'use server';
import { SoldiersService, StonesService } from '@/openapi';

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

  return await SoldiersService.createSoldierStone(soldierUuid, formData);
};

export const deleteStonePhoto = async (stoneUuid: string) => {
  const deleteStone = await StonesService.deleteStone(stoneUuid).then((res) =>
    console.log(res)
  );
};

export const sendMessage = async (
  soldierUuid: string,
  message: string,
  email: string
) => {
  const formData = {
    senderEmail: email,
    messageText: message,
    messageType: 3,
  };

  return await SoldiersService.createSoldierMessage(soldierUuid, formData);
};
