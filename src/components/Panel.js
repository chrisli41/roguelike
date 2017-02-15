import React from 'react';
import '../App.css';

class Panel extends React.Component {
	render() {
		const currentMessages = this.props.messages.map((message, index) => {
			return (
				<li key={index}>{message}</li>
			)
		})
		return (
			<div className='panel'>
				<ul>
					<li>Player Stats:</li>
					<li>Level: {this.props.player.level}</li>
					<li>Health: {this.props.player.health}</li>
					<li>Weapon: {this.props.player.weapon.name}</li>
					<li>Damage: {this.props.player.weapon.damage}</li>
				</ul>
				<ul>
					<li>Current Enemy:</li>
					<li>Health: {this.props.currentEnemy.health}</li>
					<li>Damage: {this.props.currentEnemy.damage}</li>
				</ul>
				<ul>
					<li>Progress Log</li>
					{currentMessages}
				</ul>
			</div>
		)
	}
}

export default Panel;