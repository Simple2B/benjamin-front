import React from 'react'

type Props = {}

const SoldierSearchingCard = (props: Props) => {
	return (
		<div className='w-[350px] rounded-lg text-indigo-100 p-3 shadow-box m-2'>
			<h2 className='font-semibold'>Charles Abraham</h2>
			<div className='inline-flex gap-2 text-sm'>
				<p>#43758698</p>
				<p>&#8226;</p>
				<p>Cleveland, OH</p>
			</div>
		</div>
	)
}

export default SoldierSearchingCard


