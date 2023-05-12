import React from 'react'

type ICementryInfoProps = {
    superintendent: string;
    war: string;
    numberOfSoldiersBuried: number;
    numberOfJewishSoldiersBuried: number;
    listedAsMissingSoldiers: number;
}

const AdditionalInfo = (props: ICementryInfoProps) => {  
	return (
		<div className='w-96 bg-grey-10 p-4 rounded-lg'>
			<h2 className='font-semibold'>Additional info</h2>
			{Object.entries(props).map(([key, value])=>{
				return(
					<div className='my-2' key={key}>
						<p className='text-sm  text-grey-20'>{key}</p>
						<p className='text-base  text-indigo-1000 font-medium'>{value}</p>
					</div>
				)
			})}
		</div>
	)
}

export default AdditionalInfo
