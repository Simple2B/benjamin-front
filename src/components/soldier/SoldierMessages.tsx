type ISoldierMessages = {
  messages: IMessages[];
};

type IMessages = {
  sender: string;
  text: string;
};

export const SoldierMessages = (props: ISoldierMessages) => {
  return (
    <div>
      {props.messages.map(({ sender, text }) => (
        <div key={text} className="mt-3">
          <p className="text-sm text-grey-20 leading-7">{sender}</p>
          <p className="font-medium leading-6">“{text}“</p>
        </div>
      ))}
    </div>
  );
};
