import React, {useEffect} from 'react';
import UserInput from './UserInput';

export default function Suhu(props) {

	const {
		setUserInput1,
		setUserInput2,
		setInfo,
		userInput1,
		userInput2,
		setUnit1,
		setUnit2,
		unit1,
		unit2,
		firstInputChanged,
		onChangeInput1,
		onChangeInput2,
		onChangeUnit1,
		onChangeUnit2,
		onClearAllButtonClick,
	} = props;

	const SATUAN_MASSA = ['kilogram','gram','miligram'];

	function inputChanged({satuanDari,satuanKe,input,hasil,setUserInput}){
		const SATUAN_MASSA_2 = [
			{
				satuan : 'kilogram',
				detail : [
					{
						operasi : 'kilogram ke kilogram',
						tujuan : 'kilogram',
						rumus : input,
						info : `${input} ${satuanDari} = ${hasil} ${satuanKe}`
					},
					{
						operasi : 'kilogram ke gram',
						tujuan : 'gram',
						rumus : input * 1000,
						info : `${input} ${satuanDari} * 1000 = ${hasil} ${satuanKe}`
					},
					{
						operasi : 'kilogram ke miligram',
						tujuan : 'miligram',
						rumus : input * 1000000,
						info : `${input} ${satuanDari} * 1000000 = ${hasil} ${satuanKe}`
					},
				]
			},
			{
				satuan : 'gram',
				detail : [
					{
						operasi : 'gram ke kilogram',
						tujuan : 'kilogram',
						rumus : input / 1000,
						info : `${input} ${satuanDari} / 1000 = ${hasil} ${satuanKe}`
					},
					{
						operasi : 'gram ke gram',
						tujuan : 'gram',
						rumus : input,
						info : `${input} ${satuanDari} = ${hasil} ${satuanKe}`
					},
					{
						operasi : 'gram ke miligram',
						tujuan : 'miligram',
						rumus : input * 1000,
						info : `${input} ${satuanDari} * 1000 = ${hasil} ${satuanKe}`
					},
				]
			},
			{
				satuan : 'miligram',
				detail : [
					{
						operasi : 'miligram ke kilogram',
						tujuan : 'kilogram',
						rumus : input / 1000000,
						info : `${input} ${satuanDari} / 1000000 = ${hasil} ${satuanKe}`
					},
					{
						operasi : 'miligram ke gram',
						tujuan : 'gram',
						rumus : input / 1000,
						info : `(${input} ${satuanDari} / 1000 = ${hasil} ${satuanKe}`
					},
					{
						operasi : 'miligram ke miligram',
						tujuan : 'miligram',
						rumus : input,
						info : `${input} ${satuanDari} = ${hasil} ${satuanKe}`
					},
				]
			}
		];
		SATUAN_MASSA_2.forEach((satuan)=>{
			for(let i = 0 ; i < SATUAN_MASSA_2.length ; i++){
				if( satuanDari === satuan.satuan && satuanKe === satuan.detail[i].tujuan){
					setUserInput(satuan.detail[i].rumus);
					setInfo(satuan.detail[i].info);
				}
			}
		});
	}

	function onInputChanged(){
		if(firstInputChanged){
			inputChanged({
				satuanDari: unit1,
				satuanKe: unit2,
				input: userInput1,
				hasil: userInput2,
				setUserInput: setUserInput2 
			});
		}
		else{
			inputChanged({
				satuanDari: unit2,
				satuanKe: unit1,
				input: userInput2,
				hasil: userInput1,
				setUserInput: setUserInput1
			});
		}
	}

	useEffect(()=>{
		setUnit1(SATUAN_MASSA[0]);
		setUnit2(SATUAN_MASSA[0]);
	},[])

	useEffect( () => {
		onInputChanged();
	} ,[userInput1, userInput2, unit1, unit2, firstInputChanged]);

    return (
        <div className="container">
            <h1>Massa</h1>
            <UserInput 
				getUserInput={onChangeInput1} 
				getUnit={onChangeUnit1} 
				userInput={userInput1}
				unit={unit1}
				options={SATUAN_MASSA}
			/>
			<UserInput 
				getUserInput={onChangeInput2} 
				getUnit={onChangeUnit2} 
				userInput={userInput2}
				unit={unit2}
				options={SATUAN_MASSA}
			/>
			<button id="clear-all-input" onClick={onClearAllButtonClick}>clear all</button>
        </div>
    )
}
