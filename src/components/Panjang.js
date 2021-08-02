import React, {useEffect} from 'react';
import UserInput from './UserInput';

export default function Panjang(props) {

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

	const SATUAN_PANJANG = ['kilometer','meter','milimeter'];

	function inputChanged({satuanDari,satuanKe,input,hasil,setUserInput}){
		const SATUAN_PANJANG_2 = [
			{
				satuan : 'kilometer',
				detail : [
					{
						operasi : 'kilometer ke kilometer',
						tujuan : 'kilometer',
						rumus : input,
						info : `${input} ${satuanDari} = ${hasil} ${satuanKe}`
					},
					{
						operasi : 'kilometer ke meter',
						tujuan : 'meter',
						rumus : input * 1000,
						info : `${input} ${satuanDari} * 1000 = ${hasil} ${satuanKe}`
					},
					{
						operasi : 'kilometer ke milimeter',
						tujuan : 'milimeter',
						rumus : input * 1000000,
						info : `${input} ${satuanDari} * 1000000 = ${hasil} ${satuanKe}`
					},
				]
			},
			{
				satuan : 'meter',
				detail : [
					{
						operasi : 'meter ke kilometer',
						tujuan : 'kilometer',
						rumus : input / 1000,
						info : `${input} ${satuanDari} / 1000 = ${hasil} ${satuanKe}`
					},
					{
						operasi : 'meter ke meter',
						tujuan : 'meter',
						rumus : input,
						info : `${input} ${satuanDari} = ${hasil} ${satuanKe}`
					},
					{
						operasi : 'meter ke milimeter',
						tujuan : 'milimeter',
						rumus : input * 1000,
						info : `${input} ${satuanDari} * 1000 = ${hasil} ${satuanKe}`
					},
				]
			},
			{
				satuan : 'milimeter',
				detail : [
					{
						operasi : 'milimeter ke kilometer',
						tujuan : 'kilometer',
						rumus : input / 1000000,
						info : `${input} ${satuanDari} / 1000000 = ${hasil} ${satuanKe}`
					},
					{
						operasi : 'milimeter ke meter',
						tujuan : 'meter',
						rumus : input / 1000,
						info : `(${input} ${satuanDari} / 1000 = ${hasil} ${satuanKe}`
					},
					{
						operasi : 'milimeter ke milimeter',
						tujuan : 'milimeter',
						rumus : input,
						info : `${input} ${satuanDari} = ${hasil} ${satuanKe}`
					},
				]
			}
		];
		SATUAN_PANJANG_2.forEach((satuan)=>{
			for(let i = 0 ; i < SATUAN_PANJANG_2.length ; i++){
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
		setUnit1(SATUAN_PANJANG[0]);
		setUnit2(SATUAN_PANJANG[0]);
	},[])

	useEffect( () => {
		onInputChanged();
	} ,[userInput1, userInput2, unit1, unit2, firstInputChanged]);

    return (
        <div className="container">
            <h1>Panjang</h1>
            <UserInput 
				getUserInput={onChangeInput1} 
				getUnit={onChangeUnit1} 
				userInput={userInput1}
				unit={unit1}
				options={SATUAN_PANJANG}
			/>
			<UserInput 
				getUserInput={onChangeInput2} 
				getUnit={onChangeUnit2} 
				userInput={userInput2}
				unit={unit2}
				options={SATUAN_PANJANG}
			/>
			<button id="clear-all-input" onClick={onClearAllButtonClick}>clear all</button>
        </div>
    )
}
