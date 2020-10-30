import React, {Component} from 'react'
import './App.css'
import './Prokemon_Card'
import SearchPokemon from './search_pokemon_page'
import PokemonCard from "./Prokemon_Card";

const COLORS = {
    Psychic: "#f8a5c2",
    Fighting: "#f0932b",
    Fairy: "#c44569",
    Normal: "#f6e58d",
    Grass: "#badc58",
    Metal: "#95afc0",
    Water: "#3dc1d3",
    Lightning: "#f9ca24",
    Darkness: "#574b90",
    Colorless: "#FFF",
    Fire: "#eb4d4b"
}

class App extends Component {

    state = {
        showPopup: false,
        dexList: []
    };

    constructor() {
        super();
    }

    togglePopup = e => {
        if (!this.state.showPopup)
            document.addEventListener("click", this.handleOutsideClick, false);
        else
            document.removeEventListener("click", this.handleOutsideClick, false);

        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    handleOutsideClick = e => {
        if (!this.node.contains(e.target)) this.togglePopup();
    };

    onAddToDex = (pokemon) => {
        let newDex = this.state.dexList.concat(pokemon)
        this.setState({
            dexList: newDex
        })
    }

    onDeleteDex = (pokemons) => {
        let newDex = this.state.dexList
        let index = newDex.findIndex((pokemon) =>
            pokemon?.id === pokemons?.id
        )
        console.log(index)
        if (index !== -1) {
            delete newDex[index]
            // newDex.splice(1, 1);
            this.setState({dexList: newDex});
        }
    }

    buildPokemonCard(pokemonCardItems) {
        return <PokemonCard onClick={this.onDeleteDex} btnText='X' pokeMonItem={pokemonCardItems}/>
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    <div className='header'>
                        <h1>My PokeDex</h1>
                    </div>

                    <div className='footer'>
                        <button className="btnOpenPokeMonList" onClick={this.togglePopup}>+</button>
                    </div>
                </div>

                <div className='cardWrapperMainPage'>
                    {this.state.dexList.map(res => this.buildPokemonCard(res))}
                </div>

                {this.state.showPopup ? <div ref={node => {
                    this.node = node
                }} className="serachContainer">
                    <div className="serachWarapper">
                        <SearchPokemon dexList={this.state.dexList} onAddPokeMon={this.onAddToDex} show={this.state.showPopup}/>
                    </div>

                </div> : null
                }


            </div>
        )
    }
}

export default App
