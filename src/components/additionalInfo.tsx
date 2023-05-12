import React from 'react'

type Props = {}

interface CementryInfo {
    Superintendent: string;
    War: string;
    'Number of soldiers buried': string;
    'Number of Jewish soldiers buried': number;
    'Listed as Missing Soldiers': number;
}

const AdditionalInfo = (props: Props) => {  
	const cementryInfo: CementryInfo = {
		Superintendent: 'John McJohn',
		War: 'World War II',
		'Number of soldiers buried': '12,000',
		'Number of Jewish soldiers buried': 250,
		'Listed as Missing Soldiers': 500,
	};
      
	return (
		<div className='w-[366px] bg-grey-10 p-4 rounded-lg'>
			<h2 className='font-semibold'>Additional info</h2>
			{Object.entries(cementryInfo).map(([key, value])=>{
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