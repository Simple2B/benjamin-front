import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { StoneUploadPhoto } from './StoneUploadPhoto';
import IconButton from '../IconButton';
import { ICONS_NAME } from '../constants/iconName';
import { useAppStore } from '@/lib/slices/store';
import { IStone } from './PreviewerStone';
import moment from 'moment';

type ISendPhotoFormProps = {
  setClosing: (ard: boolean) => void;
  handleUploadWindowClose: () => void;
};

const formInitialValues = {
  name: '',
  email: '',
};

export const SendPhotoForm = ({
  setClosing,
  handleUploadWindowClose,
}: ISendPhotoFormProps) => {
  const { currentStone, setCurrentStone } = useAppStore();
  const [uploadedPhoto, setUploadedPhoto] = useState<string>();

  const handleSubmit = (values: typeof formInitialValues) => {
    if (uploadedPhoto) {
      const uploadPhotoInfo = {
        date: moment().format('YYYY-MM-D'),
        sender: values.name,
        email: values.email,
        photoSrc: uploadedPhoto,
      };
      let stonesArr: IStone[];

      if (currentStone) {
        stonesArr = [uploadPhotoInfo, ...currentStone];
      } else {
        stonesArr = [uploadPhotoInfo];
      }

      setCurrentStone(stonesArr);
      handleUploadWindowClose();
      setClosing(true);
    }
  };

  const validateEmail = (value: string) => {
    if (!/\S+@\S+\.\S+/.test(value)) {
      return 'Please enter a valid email address';
    }
  };

  return (
    <div className="flex flex-col w-full gap-6 items-center justify-center">
      <StoneUploadPhoto setUploadedPhoto={setUploadedPhoto} />
      <Formik initialValues={formInitialValues} onSubmit={handleSubmit}>
        <Form className="w-full px-8 mt-2 flex flex-col gap-4">
          <div className="flex flex-col w-full gap-2">
            <h3 className="font-semibold leading-6">NAME</h3>
            <Field
              type="text"
              name="name"
              id="name"
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
    </div>
  );
};
