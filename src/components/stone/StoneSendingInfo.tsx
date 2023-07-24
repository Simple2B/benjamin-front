interface IStoneSendingInfoProps {
  handleNext: () => void;
}

export const StoneSendingInfo = ({ handleNext }: IStoneSendingInfoProps) => {
  return (
    <>
      <p className="text-grey-20 w-[244px] text-center mt-2">
        Thank you for adding a photo. Your photo is under review by Operation
        Benjamin.
      </p>
      <div className="w-full justify-end flex px-8">
        <button
          onClick={handleNext}
          className={`inline-flex items-center gap-x-2 p-3 rounded-lg justify-center font-semibold bg-turquoise-100 w-[120px] text-white`}
        >
          <p className={`leading-6 font-semibold font-noto`}>OK</p>
        </button>
      </div>
    </>
  );
};
