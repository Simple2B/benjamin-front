import { SoldierMessageOut } from '@/openapi';
import { messageSender } from '../constants/constants';

type IMessages = {
  messages: SoldierMessageOut[];
  soldierFirstName: string;
  soldierLastName: string;
  soldierSufix: string | undefined;
};

export const SoldierMessages = ({
  messages,
  soldierFirstName,
  soldierLastName,
  soldierSufix,
}: IMessages) => {
  return (
    <div>
      {messages.map(({ messageText, messageType }, index) => (
        <div key={index} className="mt-3">
          <p className="text-sm text-grey-20 leading-7">
            Message from{' '}
            {messageType == 1 &&
              `${soldierSufix} ${soldierFirstName} ${soldierLastName}`}
            `s {messageSender[messageType]}
          </p>
          <p className="font-medium leading-6">“{messageText}“</p>
        </div>
      ))}
    </div>
  );
};
