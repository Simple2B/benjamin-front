import React from 'react'

type Props = {}

const SoldierProfile = (props: Props) => {
	return (
		<div className='w-[140px]'>
			<img 
				className='w-[140px] h-[132px] rounded-lg bg-grey-30' 
				src='#' 
				alt="Soldier" 
			/>
			<p className='text-base text-center'>1st Lt. Robert S. Fink</p>
		</div>
	)
}

export default SoldierProfile