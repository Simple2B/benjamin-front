"use client";
import React, { useState } from "react";
import Image from "next/image";
import Spinner from "./Spinner";

type IIconButtonProps = {
  iconName: string;
  className: string;
};

const IconButton = ({ iconName, className }: IIconButtonProps) => {
  return (
    <div className={`${className} inline-flex items-center justify-center`}>
      <Image
        src={`images/icons/${iconName}.svg`}
        width={500}
        height={500}
        alt="Picture of the author"
      />
    </div>
  );
};

export default IconButton;
