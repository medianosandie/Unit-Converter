
import React,{useState} from 'react';
import './style/App.css';
import Selector from './components/Selector';
import Panjang from './components/Panjang';
import Massa from './components/Massa';
import Suhu from './components/Suhu';
import Info from './components/Info';

function App() {

	const [mode,setMode] = useState('massa');
	const [info,setInfo] = useState('');

	const [userInput1, setUserInput1] = useState(0);
	const [userInput2, setUserInput2] = useState(0);
	const [unit1, setUnit1] = useState('');
	const [unit2, setUnit2] = useState('');
	const [firstInputChanged,setFirstInputChanged] = useState(false);

	function onChangeInput1(event){
		setUserInput1(event.target.value);
		setFirstInputChanged(true);
	}

	function onChangeInput2(event){
		setUserInput2(event.target.value);
		setFirstInputChanged(false);
	}

	function onChangeUnit1(event){
		setUnit1(event.target.value);
		setFirstInputChanged(false);
	}

	function onChangeUnit2(event){
		setUnit2(event.target.value);
		setFirstInputChanged(true);
	}

	function onClearAllButtonClick(){
		setUserInput1(0);
		setUserInput2(0);
	}

	function getMode(event){
		setMode(event.target.value);
	}

	function renderMode(){
		if(mode === 'massa'){
			return (
				<Massa 
					setUserInput1={setUserInput1}
					setUserInput2={setUserInput2}
					setInfo={setInfo}
					userInput1={userInput1}
					userInput2={userInput2}
					setUnit1={setUnit1}
					setUnit2={setUnit2}
					unit1={unit1}
					unit2={unit2}
					firstInputChanged={firstInputChanged}
					onChangeInput1={onChangeInput1}
					onChangeInput2={onChangeInput2}
					onChangeUnit1={onChangeUnit1}
					onChangeUnit2={onChangeUnit2}
					onClearAllButtonClick={onClearAllButtonClick}
				/>
			);
		}
		if(mode === 'suhu'){
			return (
				<Suhu 
					setUserInput1={setUserInput1}
					setUserInput2={setUserInput2}
					setInfo={setInfo}
					userInput1={userInput1}
					userInput2={userInput2}
					setUnit1={setUnit1}
					setUnit2={setUnit2}
					unit1={unit1}
					unit2={unit2}
					firstInputChanged={firstInputChanged}
					onChangeInput1={onChangeInput1}
					onChangeInput2={onChangeInput2}
					onChangeUnit1={onChangeUnit1}
					onChangeUnit2={onChangeUnit2}
					onClearAllButtonClick={onClearAllButtonClick}
				/>
			);
		}
		if(mode === 'panjang'){
			return (
				<Panjang 
					setUserInput1={setUserInput1}
					setUserInput2={setUserInput2}
					setInfo={setInfo}
					userInput1={userInput1}
					userInput2={userInput2}
					setUnit1={setUnit1}
					setUnit2={setUnit2}
					unit1={unit1}
					unit2={unit2}
					firstInputChanged={firstInputChanged}
					onChangeInput1={onChangeInput1}
					onChangeInput2={onChangeInput2}
					onChangeUnit1={onChangeUnit1}
					onChangeUnit2={onChangeUnit2}
					onClearAllButtonClick={onClearAllButtonClick}
				/>
			);
		}
	}

	return (
		<div className="App">
			<h1>Unit Converter</h1>
			<Selector 
				options={['massa','suhu','panjang']} 
				getUnit={getMode}
				unit={mode}
				name={mode}
			/>
			{renderMode()}
			<Info info={info}/>
		</div>
	);
}

export default App;
