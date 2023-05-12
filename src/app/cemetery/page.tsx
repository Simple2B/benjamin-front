import AdditionalInfo from '@/components/AdditionalInfo'
import AudioPlayer from '@/components/AudioPlayer'
import SearchBar from '@/components/SearchBar'
import ButtonContactCementery from '@/components/cementery/ButtonContactCementery'
import SoldierProfile from '@/components/cementery/SoldierProfile'
import SoldierSearchingCard from '@/components/search/SoldierSearchingCard'
import React from 'react'

export default function page() {
	return (
		<div>
			<ButtonContactCementery icon={'#'} description={'Call'}/>
			<SoldierProfile photo={'https://i.pinimg.com/564x/35/f1/14/35f114ab1878146bbb177f72cd41564a.jpg'} name={'1st Lt. Robert S. Fink'} />
			<SoldierSearchingCard name={'Charles Abraham'} number={'#43758698'} place={'Cleveland, OH'} />
			<AudioPlayer audioSourse={'https://www.bensound.com/bensound-music/bensound-tenderness.mp3'} />
			<SearchBar />
			<AdditionalInfo  superintendent={'John McJohn'} war={'World War II'} numberOfSoldiersBuried={12000}  numberOfJewishSoldiersBuried={250} listedAsMissingSoldiers={250} />
		</div>
	)
}
