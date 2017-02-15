import React from 'react';
import '../App.css';

class Map extends React.Component {
	render() {
		const currentMap = this.props.map;
		const grid = currentMap.map((item, index) => {
			return (
				<Square key={index} value={item.value} index={index} />
			)
		})

		return (
			<div className='map'>
				{grid}
			</div>
		)
	}
}

function Square(props) {

	function name(value) {

		switch(value) {
			case 0: 
				value = 'floor';
				break;
			case 1:  
				value = 'wall';
				break;
			case 21:
				value = 'playerLeft';
				break;
			case 22:
				value = 'playerRight';
				break;
			case 3:
				value = 'outerWall';
				break;
			case 4:
				value = 'health';
				break;
			case 5:
				value = 'monster';
				break;
			case 6:
				value = 'weapon';
			default:
		}	

		return 'square ' + value;
	}

  	return (
    	<div className={name(props.value)}></div>
  	)
}

export default Map;