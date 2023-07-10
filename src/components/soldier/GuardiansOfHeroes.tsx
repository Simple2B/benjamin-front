import React from 'react';

type IGuardiansOfHeroesProps = {
  guardiansOfHeroes: string[];
};

export const GuardiansOfHeroes = ({
  guardiansOfHeroes,
}: IGuardiansOfHeroesProps) => {
  return (
    <div className="mt-4">
      <p className="text-sm text-grey-20">Guardian of Heroes</p>
      <p className="font-semibold text-sm leading-7 text-turquoise-200">
        What is the Guardian of Heroes program?
      </p>
      <div className="leading-6">
        {guardiansOfHeroes.map((guardian, index) => (
          <p key={index}>{guardian}</p>
        ))}
      </div>
    </div>
  );
};
