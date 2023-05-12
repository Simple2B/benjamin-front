import React from 'react'

type ISoldierProfileProps = {
	photo: string,
	name: string,
}

const SoldierProfile = ({photo, name}: ISoldierProfileProps) => {
	return (
		<div className='w-[140px]'>
			<img 
				className='w-[140px] h-[132px] rounded-lg bg-grey-30' 
				src={photo}
				alt="Soldier" 
			/>
			<p className='text-base text-center'>{name}</p>
		</div>
	)
}

export default SoldierProfile
