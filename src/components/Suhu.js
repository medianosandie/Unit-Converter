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

	const SATUAN_SUHU = ['c','f','k'];

	function inputChanged({satuanDari,satuanKe,input,hasil,setUserInput}){
		const SATUAN_SUHU_2 = [
			{
				satuan : 'c',
				detail : [
					{
						operasi : 'c ke c',
						tujuan : 'c',
						rumus : input,
						info : `${input} ${satuanDari} = ${hasil} ${satuanKe}`
					},
					{
						operasi : 'c ke f',
						tujuan : 'f',
						rumus : (input * 9/5) + 32,
						info : `(${input} ${satuanDari} * 9/5) + 32 = ${hasil} ${satuanKe}`
					},
					{
						operasi : 'c ke k',
						tujuan : 'k',
						rumus : parseInt(input)  + parseInt(273.15),
						info : `${input} ${satuanDari} + 273.15 = ${hasil} ${satuanKe}`
					},
				]
			},
			{
				satuan : 'f',
				detail : [
					{
						operasi : 'f ke c',
						tujuan : 'c',
						rumus : (input - 32) * 5/9,
						info : `(${input} ${satuanDari} - 32) * 5/9 = ${hasil} ${satuanKe}`
					},
					{
						operasi : 'f ke f',
						tujuan : 'f',
						rumus : input,
						info : `${input} ${satuanDari} = ${hasil} ${satuanKe}`
					},
					{
						operasi : 'f ke k',
						tujuan : 'k',
						rumus : (input - 32) * 5/9 + 273.15,
						info : `(${input} ${satuanDari} - 32) * 5/9 + 273.15 = ${hasil} ${satuanKe}`
					},
				]
			},
			{
				satuan : 'k',
				detail : [
					{
						operasi : 'k ke c',
						tujuan : 'c',
						rumus : parseInt(input)  - parseInt(273.15),
						info : `${input} ${satuanDari} - 273.15 = ${hasil} ${satuanKe}`
					},
					{
						operasi : 'k ke f',
						tujuan : 'f',
						rumus : (input - 273.15) * 9/5 + 32,
						info : `(${input} ${satuanDari} - 273.15) * 9/5 + 32 = ${hasil} ${satuanKe}`
					},
					{
						operasi : 'k ke k',
						tujuan : 'k',
						rumus : input,
						info : `${input} ${satuanDari} = ${hasil} ${satuanKe}`
					},
				]
			}
		];
		SATUAN_SUHU_2.forEach((satuan)=>{
			for(let i = 0 ; i < SATUAN_SUHU_2.length ; i++){
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
		setUnit1(SATUAN_SUHU[0]);
		setUnit2(SATUAN_SUHU[0]);
	},[])

	useEffect( () => {
		onInputChanged();
	} ,[userInput1, userInput2, unit1, unit2, firstInputChanged]);

    return (
        <div className="container">
            <h1>Suhu</h1>
            <UserInput 
				getUserInput={onChangeInput1} 
				getUnit={onChangeUnit1} 
				userInput={userInput1}
				unit={unit1}
				options={SATUAN_SUHU}
			/>
			<UserInput 
				getUserInput={onChangeInput2} 
				getUnit={onChangeUnit2} 
				userInput={userInput2}
				unit={unit2}
				options={SATUAN_SUHU}
			/>
			<button id="clear-all-input" onClick={onClearAllButtonClick}>clear all</button>
        </div>
    )
}
