import React from 'react';
import Map from './Map';
import Panel from './Panel';
import '../App.css';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.getRandomInt = this.getRandomInt.bind(this);
		this.getCellValue = this.getCellValue.bind(this);
		this.renderView = this.renderView.bind(this);
		this.moveFrom = this.moveFrom.bind(this);
		this.getEnemyStats = this.getEnemyStats.bind(this);
		this.getHealth = this.getHealth.bind(this);
		this.getWeapon = this.getWeapon.bind(this);
		this.renderView();
	}

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyPress);
	}

	componentWillUnmount() {
		window.removeEventListener('keypress', this.handleKeyPress);
	}

	getRandomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	//0 - floor, 1 - wall, 2 - player, 3 - outer wall, 4 - health pack, 5 - enemies, 6 - weapon, 21 - face left, 22 - face right

	//renders the view based on the player's current location.
	renderView() {
		const { yPos, xPos } = this.props.player;
		const { map } = this.props;

		const xMin = xPos - 4;
		const xMax = xPos + 4;

		const yMin = yPos - 4;
		const yMax = yPos + 4;

		const currView = map.filter((element, index) => {
			return (element.xPos > xMin && element.xPos < xMax && element.yPos > yMin && element.yPos < yMax);
		});

		console.log('yPos ' + yPos, 'xPos ' + xPos);

		this.props.updateView(currView);

	}
	//gets the cell value of the target location, yPos, xPos.
	getCellValue(yPos, xPos) {
		const { map } = this.props;
		const location = map.filter((element, index) => {
			return (element.xPos === xPos && element.yPos === yPos);
		});

		return location[0].value;

	}

	//gets the health and damage of the enemy at the target location, returns an object.
	getEnemyStats(yPos, xPos) {
		const { map } = this.props;
		const location = map.filter((element, index) => {
			return (element.xPos === xPos && element.yPos === yPos);
		});

		return {
			health: location[0].health,
			damage: location[0].damage
		}

	}

	//takes the parameters yPos, xPos, the direction to move the player, and the direction the player is currently facing. Updates the map and player objects with the new location, also sets the previous location to 0 (floor).
	moveFrom(yPos, xPos, direction, facing) {

		this.props.updateCurrentEnemyHealth('N/A');
		this.props.updateCurrentEnemyDamage('N/A');

		if(direction === 'LEFT') {
			this.props.updatePlayerPos(yPos, xPos - 1);
			this.props.updateMap(yPos, xPos - 1, 21);
			this.props.updateMap(yPos, xPos, 0);
		}

		if(direction === 'RIGHT') {
			this.props.updatePlayerPos(yPos, xPos + 1);
			this.props.updateMap(yPos, xPos + 1, 22);
			this.props.updateMap(yPos, xPos, 0);
		}

		if(direction === 'UP') {
			this.props.updatePlayerPos(yPos - 1, xPos);
			this.props.updateMap(yPos - 1, xPos, facing);
			this.props.updateMap(yPos, xPos, 0);
		}

		if(direction === 'DOWN') {
			this.props.updatePlayerPos(yPos + 1, xPos);
			this.props.updateMap(yPos + 1, xPos, facing);
			this.props.updateMap(yPos, xPos, 0);
		}
	}

	//fights an enemy at the target location, removes the enemy if player defeats the enemy or sets status to 'dead' if player loses.
	fightEnemyAt(yPos, xPos) {

		const playerHealth = this.props.player.health;
		const playerDamage = this.props.player.weapon.damage;

		const enemyStats = this.getEnemyStats(yPos, xPos);

		const newEnemyHealth = (enemyStats.health - playerDamage) > 0 ? (enemyStats.health - playerDamage) : 0;

		this.props.updateCurrentEnemyDamage(enemyStats.damage);
		this.props.updateCurrentEnemyHealth(newEnemyHealth);
		this.props.updateMapEnemy(yPos, xPos, newEnemyHealth);
		this.props.addMessage('You Deal ' + playerDamage + ' Damage');

		if(newEnemyHealth === 0) {

			const itemDrop = this.getRandomInt(1, 3);
			itemDrop === 1 ? this.props.updateMap(yPos, xPos, 6) : this.props.updateMap(yPos, xPos, 0);
			
			this.props.addMessage('Enemy Defeated');
			return;
		}

		const newPlayerHealth = (playerHealth - enemyStats.damage) > 0 ? (playerHealth - enemyStats.damage) : 0;

		this.props.updatePlayerHealth(newPlayerHealth);
		this.props.addMessage('You Take ' + enemyStats.damage + ' Damage');

		if(newPlayerHealth === 0){
			this.props.updateStatus('dead');
			this.props.addMessage('Game Over');
		}
	}

	getHealth(currentHealth) {
		this.props.updatePlayerHealth(currentHealth + 1);
		this.props.addMessage('+1 Health');
	}

	getWeapon() {
		const { name, damage } = this.props.player.weapon;
		const newDamage = damage + 1;
		let newWeapon = '';

		switch(name) {
			case 'Fists':
				newWeapon = 'Club';
				break;
			case 'Club':
				newWeapon = 'Axe';
				break;
			case 'Axe':
				newWeapon = 'Spear';
				break;
			case 'Spear':
				newWeapon = 'Sword';
			default:
				break;
		}

		this.props.updatePlayerWeapon(newWeapon, newDamage);
		this.props.addMessage('Picked Up a ' + newWeapon);
	}

	handleKeyPress(event) {

		const { status } = this.props;
		const { yPos, xPos, health, facing } = this.props.player;

		if(status === 'dead') {
			return;
		}

		switch(event.keyCode) {
			case 37:
				const moveLeftLoc = this.getCellValue(yPos, xPos - 1);

				this.props.updateMap(yPos, xPos, 21);
				this.props.updatePlayerFacing(21);

				if(moveLeftLoc === 0) {
					this.moveFrom(yPos, xPos, 'LEFT');
				}
				if(moveLeftLoc === 4) {
					this.moveFrom(yPos, xPos, 'LEFT');
					this.getHealth(health);
				}
				if(moveLeftLoc === 5) {
					this.fightEnemyAt(yPos, xPos - 1);
				}
				if(moveLeftLoc === 6) {
					this.moveFrom(yPos, xPos, 'LEFT');
					this.getWeapon();
				}

				this.renderView();
				break;

			case 38:
				const moveUpLoc = this.getCellValue(yPos - 1, xPos);
				if(moveUpLoc === 0) {
					this.moveFrom(yPos, xPos, 'UP', facing);
				}
				if(moveUpLoc === 4) {
					this.moveFrom(yPos, xPos, 'UP', facing);
					this.getHealth(health);
				}
				if(moveUpLoc === 5) {
					this.fightEnemyAt(yPos - 1, xPos);
				}
				if(moveUpLoc === 6) {
					this.moveFrom(yPos, xPos, 'UP', facing);
					this.getWeapon();
				}
				this.renderView();
				break;

			case 39:
				const moveRightLoc = this.getCellValue(yPos, xPos + 1);

				this.props.updateMap(yPos, xPos, 22);
				this.props.updatePlayerFacing(22);

				if(moveRightLoc === 0) {
					this.moveFrom(yPos, xPos, 'RIGHT');
				}
				if(moveRightLoc === 4) {
					this.moveFrom(yPos, xPos, 'RIGHT');
					this.getHealth(health);
				}
				if(moveRightLoc === 5) {
					this.fightEnemyAt(yPos, xPos + 1);
				}
				if(moveRightLoc === 6) {
					this.moveFrom(yPos, xPos, 'RIGHT');
					this.getWeapon();
				}
				this.renderView();
				break;

			case 40:
				const moveDownLoc = this.getCellValue(yPos + 1, xPos);
				if(moveDownLoc === 0) {
					this.moveFrom(yPos, xPos, 'DOWN', facing);
				}
				if(moveDownLoc === 4) {
					this.moveFrom(yPos, xPos, 'DOWN', facing);
					this.getHealth(health);
				}
				if(moveDownLoc === 5) {
					this.fightEnemyAt(yPos + 1, xPos);
				}
				if(moveDownLoc === 6) {
					this.moveFrom(yPos, xPos, 'DOWN', facing);
					this.getWeapon();
				}
				this.renderView();
				break;

			default:
				return;
		}
	}

	render() {

		return (
			<div className='main'>
				<Panel player={this.props.player} currentEnemy={this.props.currentEnemy} messages={this.props.messages}/>
				<Map map={this.props.view}/>
			</div>
		)
	}
}

export default Main;