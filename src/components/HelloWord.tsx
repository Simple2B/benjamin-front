'use client';
import { useQuery, useMutation } from '@tanstack/react-query';
import React from 'react';

type Props = {};

export const HelloWord = (props: Props) => {
  const query = useQuery(['query'], async () => {
    const data = await fetch('/api', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data.json();
  });

  const mutation = useMutation(['mutation'], async () => {
    const data = await fetch('/api', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ msg: 'post request' }),
    });
    return data.json();
  });

  console.log({ query });
  console.log({ mutation });
  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <>
      <div>
        HelloWord <button onClick={handleClick}>bubu</button>
      </div>
    </>
  );
};
