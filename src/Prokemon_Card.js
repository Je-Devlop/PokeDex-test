import React from 'react'
import Cute from './assets/cute.png';


export default class PokemonCard extends React.Component {

    state = {
        pokemonCardItems: this.props.pokeMonItem,
        happyIcon: []
    };

    constructor(props) {
        super(props);
    }

    render() {
        return <div key={this.state.pokemonCardItems.id} className="cardContainer">
            <div className='pokemonCardContainer'>
                <div className='imageContainer'>
                    <img width='150px' src={this.state.pokemonCardItems.imageUrl}/>
                </div>


                <div>
                    <div>
                        {this.state.pokemonCardItems.name}
                    </div>
                    <div>
                        HP: <progress id="hp" value={this.hpCalculate(this.state.pokemonCardItems.hp)} max="100"></progress>
                    </div>
                    <div>
                        STR: <progress id="str" value={this.strengthCalculate(this.state.pokemonCardItems.attacks)} max="100"></progress>
                    </div>
                    <div>
                        WEAK: <progress id="str" value={this.weaknessCalculate(this.state.pokemonCardItems.weaknesses)} max="100"></progress>
                    </div>
                    <div className='happieContainer'>
                        {
                            this.happinessCalculate(this.state.pokemonCardItems)
                        }
                    </div>
                </div>
            </div>


            <button className='btnClickCard' onClick={e => this.props.onClick(this.state.pokemonCardItems)}>
                {this.props.btnText}
            </button>
        </div>
    }

    hpCalculate = (pokeMonHp) => {
        if (pokeMonHp > 100)
            return 100
        else
            return pokeMonHp
    }

    strengthCalculate = (pokeMonStrength) => {
        if (pokeMonStrength) {
            let str = pokeMonStrength.length * 50
            if (str >= 100)
                return 100
            else
                return str
        } else {
            return 0
        }

    }

    weaknessCalculate = (pokeMonWeakness) => {
        if (pokeMonWeakness) {
            let weak = pokeMonWeakness.length * 100
            if (weak >= 100 || weak == 1)
                return 100
            else
                return 0
        } else {
            return 0
        }
    }

    damageCalculate = (pokeMondamageList) => {
        return Math.floor(Math.random() * 50)
        // if (pokeMondamageList) {
        //     let total
        //     for (let i = 0; i < pokeMondamageList.length; i++) {
        //         // total += parseInt(pokeMondamageList[i].damage.substr(0,1))
        //         // console.log(parseInt(pokeMondamageList[i].damage.substr(0,1)))
        //         console.log(pokeMondamageList[i].damage)
        //     }
        //     return total
        // }

    }

    happinessCalculate = (pokemonDetail) => {
        let hp = this.hpCalculate(pokemonDetail.hp)
        let damage = this.damageCalculate(pokemonDetail)
        let weak = this.weaknessCalculate(pokemonDetail.weaknesses)
        let iconTag = []
        for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
            iconTag.push(<div className='cuteIcon'>
                <img width='30px' src={require('./assets/cute.png')}/>
            </div>)

        }
        return iconTag
    }
}
