import React from 'react'
import axios from "axios";
import PokemonCard from './Prokemon_Card'

export default class SearchPokemon extends React.Component {

    state = {
        searchPokeMonName: '',
        searchPokeMonType: '',
        pokemonDetail: []
    };

    constructor() {
        super();
        this.onFetchCard()
    }

    handleChangePokeMonName = event => {
        this.setState({searchPokeMonName: event.target.value});
    };

    handleChangePokeMonType = event => {
        this.setState({searchPokeMonType: event.target.value});
    };

    onFilterDex = (pokemonCard) => {
        let filterPokeMon = pokemonCard.filter(
            (pokemons) => {
                if (this.props.dexList.length == 0) {
                    return pokemons
                }
                else {
                    for (let i = 0; i < this.props.dexList.length; i++) {
                        return pokemons.id != this.props.dexList[i].id
                    }
                }

            }
        );


    }

    render() {
        return this.props.show ?
            <div className='modal'>
                <div className='searchInputContainer'>
                    <input placeholder='Find By PokeMon Name' value={this.state.search} className='searchInput' onChange={this.handleChangePokeMonName}/>
                    <input placeholder='Find By PokeMon Type' value={this.state.search} className='searchInput' onChange={this.handleChangePokeMonType}/>
                    <button className='btnSearch' onClick={this.onFetchCard}>Search</button>
                </div>


                <div className='cardWrapperSearchPage'>
                    {
                        this.state.pokemonDetail.map(res => this.buildPokemonCard(res))
                    }
                </div>
            </div> : null
    }

    onAddPokeMon = (pokemons) => {
        this.props.onAddPokeMon(pokemons)
    }

    buildPokemonCard(pokemonCardItems) {
        return pokemonCardItems ?
            <PokemonCard btnText='ADD' pokeMonItem={pokemonCardItems} onClick={this.onAddPokeMon}/> :
            <div>
                Loading...
            </div>
    }


    searchPokemon(keyWord) {

    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    onFetchCard = async () => {
        try {
            await axios({
                method: 'get',
                url: `http://localhost:3030/api/cards`,
                params: {
                    name: this.state.searchPokeMonName,
                    limit: '20',
                    type: this.state.searchPokeMonType
                }
            }).then((response) => {
                this.setState({
                        pokemonDetail: response.data.cards
                    }
                )
            })
        } catch (e) {
            console.log(`error ${e}`)
        }
    }
}

