import React ,{ Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GoogleMapWithPokemons from './google_map';
import { fetchPokemon, setCenter, fakeDataEnable } from '../actions/index';

const geolocation = (
        navigator.geolocation || {
                getCurrentPosition: (success, failure) => {
                failure(`Your browser doesn't support geolocation.`);
                },
            }
        );

class PokemomMap extends Component{
    componentWillMount(){
        if (this.props.fakedata == true){
            const lat = 25.0648;
            const lng = 121.5465;
            this.props.setCenter(lat,lng);  
        }else{
            geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                this.props.setCenter(lat,lng);               
                this.props.fetchPokemon('0',{lat,lng});                   
            }); 
        }             
    }      

    render(){
        return (
            <div className="col-md-12">
                <GoogleMapWithPokemons />
            </div>       
        );
    }
}

function mapStateToProps(state){
    return { pokemon: state.pokemon, center:state.center, fakedata:state.fakeData }; 
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({fetchPokemon,setCenter, fakeDataEnable}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(PokemomMap);
