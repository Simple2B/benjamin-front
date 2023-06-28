import React, { useState } from 'react';
import { useTransition } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { StoneUploadPhoto } from './StoneUploadPhoto';
import IconButton from '../IconButton';
import { ICONS_NAME } from '../constants/iconName';
import { useAppStore } from '@/lib/slices/store';
import { IStone } from './PreviewerStone';
import moment from 'moment';
import { uploadStonePhoto } from '@/app/actions';

type ISendPhotoFormProps = {
  setClosing: (ard: boolean) => void;
  handleUploadWindowClose: () => void;
  stonePhotosGallery: IStone[];
  setStonePhotosGallery: (arg: IStone[]) => void;
  soldierUuid: string;
};

const formInitialValues = {
  name: '',
  email: '',
};

export const SendPhotoForm = ({
  setClosing,
  handleUploadWindowClose,
  stonePhotosGallery,
  setStonePhotosGallery,
  soldierUuid,
}: ISendPhotoFormProps) => {
  const { currentStones, setCurrentStone } = useAppStore();
  const [uploadedPhoto, setUploadedPhoto] = useState<string>();
  const [uploadedPhotoForm, setUploadedPhotoForm] = useState<Blob>();
  const [isNext, setNext] = useState<boolean>(false);
  const [photoSrc, setPhotoSrc] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (values: typeof formInitialValues) => {
    if (uploadedPhoto) {
      const uploadPhotoInfo = {
        date: moment().format('YYYY-MM-D HH:mm:ss'),
        sender: values.name,
        email: values.email,
        photoSrc: uploadedPhoto,
      };

      if (currentStones) {
        setCurrentStone([uploadPhotoInfo, ...currentStones]);
      } else {
        setCurrentStone([uploadPhotoInfo]);
      }
      if (uploadedPhotoForm) {
        const formData = new FormData();
        formData.append('sender_name', values.name);
        formData.append('sender_email', values.email);
        formData.append('photo', uploadedPhotoForm);

        const reader = new FileReader();
        reader.readAsDataURL(uploadedPhotoForm);
        reader.onloadend = () => {
          const base64data = reader.result;
          if (typeof base64data === 'string') {
            startTransition(() =>
              uploadStonePhoto(
                soldierUuid,
                base64data,
                values.email,
                values.name
              )
            );
          }
        };

        const updatedStoneGallery = [uploadPhotoInfo, ...stonePhotosGallery];
        setStonePhotosGallery(updatedStoneGallery);
      }
    }
    setNext(true);
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
    <div className="flex flex-col w-full gap-6 items-center justify-center">
      <StoneUploadPhoto
        setUploadedPhoto={setUploadedPhoto}
        setUploadedPhotoForm={setUploadedPhotoForm}
      />
      {!isNext ? (
        <Formik initialValues={formInitialValues} onSubmit={handleSubmit}>
          <Form className="w-full px-8 mt-2 flex flex-col gap-4 items-center">
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-semibold leading-6">NAME</h3>
              <Field
                type="text"
                name="name"
                className="border border-gray-300 text-sm rounded-lg p-3 w-full h-[55px]"
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
                className="border border-gray-300 text-sm rounded-lg p-3 w-full h-[55px]"
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
            <div className="w-full mt-8 justify-end flex px-8">
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
