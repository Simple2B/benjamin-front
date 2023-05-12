import React from 'react'

type IIconButtonProps = {
  iconName: string,
  className: string
}

const IconButton = ({iconName, className}: IIconButtonProps) => {
	return (
		<div className={`${className} inline-flex items-center justify-center`}>
			<img src={`/images/icons/${iconName}.svg`}  />
		</div>
	)
}

export default IconButton;
