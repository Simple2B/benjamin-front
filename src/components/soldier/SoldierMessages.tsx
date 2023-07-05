import { SoldierMessageOut } from '@/openapi';

type IMessages = {
  messages: SoldierMessageOut[];
};

export const SoldierMessages = ({ messages }: IMessages) => {
  return (
    <div>
      {messages.map(({ messageText, messageType }, index) => (
        <div key={index} className="mt-3">
          <p className="text-sm text-grey-20 leading-7">
            Message from {messageType}
          </p>
          <p className="font-medium leading-6">“{messageText}“</p>
        </div>
      ))}
    </div>
  );
};
