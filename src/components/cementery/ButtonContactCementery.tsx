import React from 'react'
import IconButton from '../IconButton'
import { ICONS_NAME } from '../IconButton.constants'

type IButtonContactCementeryProps = {
	icon: string,
	description: string,
}

const ButtonContactCementery = ({icon, description}: IButtonContactCementeryProps) => {
	return (
		<div className='inline-flex items-center gap-x-1 p-1.5 rounded-lg bg-turquoise-50'> 
			<IconButton iconName={ICONS_NAME.telephone} className={'h-3 w-3'}/>
			<p className='text-sm'>{description}</p>
		</div>
	)
}

export default ButtonContactCementery
