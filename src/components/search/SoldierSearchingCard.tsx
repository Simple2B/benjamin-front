import React from 'react'

type ISoldierSearchingCard = {
	name: string,
	number: string,
	place: string
}

const SoldierSearchingCard = ({name, number, place}: ISoldierSearchingCard) => {
	return (
		<div className='w-[350px] rounded-lg text-indigo-100 p-3 shadow-box m-2'>
			<h2 className='font-semibold'>{name}</h2>
			<div className='inline-flex gap-2 text-sm'>
				<p>{number}</p>
				<p>&#8226;</p>
				<p>{place}</p>
			</div>
		</div>
	)
}

export default SoldierSearchingCard
