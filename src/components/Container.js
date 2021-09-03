import React, {useState,useEffect} from 'react';
import UserInput from './UserInput';

export default function Container(props) {

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
        dataSatuan,
        title
	} = props;

	const [data,setData] = useState([]);
	const [satuan,setSatuan] = useState([]);

	useEffect(()=>{
		setData(dataSatuan)
	},[dataSatuan]);

	useEffect(()=>{
		setSatuan( data.map(item => item.satuan))
		onClearAllButtonClick()
	},[data]);

	useEffect(()=>{
		setUnit1(satuan[0])
		setUnit2(satuan[0])
		setInfo('')
	},[satuan])

	function inputChanged({satuanDari,satuanKe,input,hasil,setUserInput}){
		data.forEach((satuan)=>{
			for(let i = 0 ; i < data.length ; i++){
				if( satuanDari === satuan.satuan && satuanKe === satuan.detail[i].tujuan){
					setUserInput(eval(satuan.detail[i].rumus));
					setInfo(`${input} ${satuanDari} ${satuan.detail[i].info} = ${hasil} ${satuanKe}`);
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
		setUnit1(satuan[0]);
		setUnit2(satuan[0]);
	},[])

	useEffect( () => {
		onInputChanged();
	} ,[userInput1, userInput2, unit1, unit2, firstInputChanged]);

    return (
        <div className="container">
            <h1>{title}</h1>
            <UserInput 
				getUserInput={onChangeInput1} 
				getUnit={onChangeUnit1} 
				userInput={userInput1}
				unit={unit1}
				options={satuan}
			/>
			<UserInput 
				getUserInput={onChangeInput2} 
				getUnit={onChangeUnit2} 
				userInput={userInput2}
				unit={unit2}
				options={satuan}
			/>
			<button id="clear-all-input" onClick={onClearAllButtonClick}>clear all</button>
        </div>
    )
}
