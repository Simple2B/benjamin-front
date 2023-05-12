import React from 'react'

type IButtonContactCementeryProps = {
	icon: string,
	description: string,
}

const ButtonContactCementery = ({icon, description}: IButtonContactCementeryProps) => {
	return (
		<div className='inline-flex items-center gap-x-1 p-1.5 rounded-lg bg-turquoise-50'> 
			{icon}
			<p className='text-sm'>{description}</p>
		</div>
	)
}

export default ButtonContactCementery
