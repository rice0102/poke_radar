import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectPokemon, fetchPokemon , fakeDataEnable} from '../actions/index';

class PokemonSelect extends Component{
    constructor (props){
		super(props);   
 	}

    componentDidMount() {
        // Every 10s refresh markers         
        // setInterval(function() {              
        //     this.refreshMap(this.props.selected,this.props.center);
        // }.bind(this), 10*1000);          
    }

    refreshMap(selectId,center){            
        console.log('Every 10s refresh pokemonId: ',selectId); 

        if(this.props.fakedata== false)
            this.props.fetchPokemon(selectId,center);       
    }

    renderPokemonList(){
		return this.props.pokemonList.map((pokemon)=>{
			return (
			   <option 
                    value = {pokemon.id} 
                    key = {pokemon.id} >
                    {pokemon.id}. {pokemon.name}
               </option>
			);
		});
	}

    onSelectChange(term) {       
		this.props.selectPokemon(term);
        this.props.fetchPokemon(term,this.props.center);
	}

    render(){      
        return(
            <div className="form-group col-md-4 pull-right" >
                <label>Select a Pokemon:</label>
                <select className="form-control" onChange = {(event)=> this.onSelectChange(event.target.value)}>
                    {this.renderPokemonList()}
                </select>
            </div>
        );
    }
}
function mapStateToProps(state) {
	return{
		pokemonList: state.pokemonList,
        center: state.center,
        selected: state.selected,
        fakedata: state.fakeData
	};
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({ selectPokemon,fetchPokemon ,fakeDataEnable}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(PokemonSelect);