import React, { useState } from 'react';
import { useTransition } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { StoneUploadPhoto } from './StoneUploadPhoto';
import IconButton from '../IconButton';
import { ICONS_NAME } from '../constants/iconName';
import { useAppStore } from '@/lib/slices/store';
import { uploadStonePhoto } from '@/app/actions';

type ISendPhotoFormProps = {
  setClosing: (ard: boolean) => void;
  handleUploadWindowClose: () => void;
  setPreviewSending: (ard: boolean) => void;
  soldierUuid: string;
  setGallaryUpdating: (value: boolean) => void;
  photoSrc?: string;
  uploadedPhotoForm?: Blob;
};

const formInitialValues = {
  name: '',
  email: '',
};

export const SendPhotoForm = ({
  setClosing,
  handleUploadWindowClose,
  soldierUuid,
  setPreviewSending,
  setGallaryUpdating,
  photoSrc,
  uploadedPhotoForm,
}: ISendPhotoFormProps) => {
  const { currentStones, setCurrentStone } = useAppStore();
  const [isNext, setNext] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const prewiousUploadedStones = sessionStorage.getItem('uploadedStonePhoto');
  const prewiousUploadedStonesObj = JSON.parse(prewiousUploadedStones || '[]');
  const stonesforSoldier = prewiousUploadedStonesObj[soldierUuid] || [];

  const handleSubmit = async (values: typeof formInitialValues) => {
    setGallaryUpdating(true);
    if (!uploadedPhotoForm || !photoSrc) {
      setGallaryUpdating(false);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(uploadedPhotoForm);
    reader.onloadend = () => {
      const base64data = reader.result;
      if (typeof base64data !== 'string') {
        return;
      }

      startTransition(async () => {
        const res = await uploadStonePhoto(
          soldierUuid,
          base64data,
          values.email,
          values.name
        );

        if (currentStones) {
          setCurrentStone([res, ...currentStones]);
        } else {
          setCurrentStone([res]);
        }
        const uploadedPhotoInfo = {
          created_at: res.created_at,
          senderName: res.senderName,
          senderEmail: res.senderEmail,
          photoUrl: photoSrc,
          uuid: res.uuid,
        };
        stonesforSoldier.unshift(uploadedPhotoInfo);
        const dataToStore = JSON.stringify({
          ...prewiousUploadedStonesObj,
          [soldierUuid]: stonesforSoldier,
        });
        sessionStorage.setItem('uploadedStonePhoto', dataToStore);
        setGallaryUpdating(false);
      });
    };

    setNext(true);
    setPreviewSending(true);
  };

  const handleNext = () => {
    handleUploadWindowClose();
    setClosing(true);
  };

  const validateEmail = (value: string) => {
    if (!/\S+@\S+\.\S+/.test(value)) {
      return 'Please enter a valid email address';
    }
  };

  return (
    <div className="flex flex-col w-full gap-4 items-center justify-center overflow-scroll">
      <StoneUploadPhoto photoSrc={photoSrc} />
      {!isNext ? (
        <Formik initialValues={formInitialValues} onSubmit={handleSubmit}>
          <Form className="w-full px-8 mt-2 flex flex-col gap-4 items-center">
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-semibold leading-6">NAME</h3>
              <Field
                type="text"
                name="name"
                className="border border-gray-300 text-sm rounded-lg p-3 w-full h-[55px] outline-none"
                placeholder="Type your name"
              />
              <p className={`text-xs text-grey-20`}>Skip to stay anonymous</p>
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-semibold leading-6">
                EMAIL<span className="text-red-600">*</span>
              </h3>
              <Field
                type="email"
                name="email"
                id="email"
                className="border border-gray-300 text-sm rounded-lg p-3 w-full h-[55px] outline-none"
                placeholder="Type your email"
                validate={validateEmail}
                required
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-xs text-red-600"
              />
            </div>
            <div className="w-full mt-6 justify-end flex px-8 mb-2">
              <button
                type="submit"
                className={`inline-flex items-center gap-x-2 p-3 rounded-lg justify-center font-semibold bg-turquoise-100 w-36 text-white`}
              >
                <p className={`leading-6 font-semibold font-noto`}>Upload</p>
                <IconButton
                  iconName={ICONS_NAME.arrowRigth}
                  className={` h-4 w-4`}
                />
              </button>
            </div>
          </Form>
        </Formik>
      ) : (
        <>
          <p className="text-grey-20 w-[244px] text-center mt-2">
            Thank you for adding a photo. Your photo is under review by
            Operation Benjamin.
          </p>
          <div className="w-full mt-[51px] justify-end flex px-8">
            <button
              onClick={handleNext}
              className={`inline-flex items-center gap-x-2 p-3 rounded-lg justify-center font-semibold bg-turquoise-100 w-[120px] text-white`}
            >
              <p className={`leading-6 font-semibold font-noto`}>OK</p>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
