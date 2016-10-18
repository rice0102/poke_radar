import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow} from 'react-google-maps';
import { connect } from 'react-redux';
import { clickMarker, setCenter, fetchPokemon, fakeDataEnable } from '../actions/index';
import { bindActionCreators } from 'redux';
import {pokemonsLocation as PokemonFakeData}  from '../data/samplePokemonData';

class GoogleMapWithPokemons extends Component{
    constructor(props){
        super(props);
        this.state = { 
			zoomLevel: 15,
            now: Date()
		};
    }
    componentDidMount() {
        // // Every 1s refresh Now         
        setInterval(function() {              
            this.setState({
                now: Date()
            });     
        }.bind(this), 1*1000);          
    }
    livetime(CreateTime){
        let count ;
        if (this.props.fakeData==true){
            count = CreateTime;
        }else{
            count = new Date();
        }
        const Now = new Date();
        const dispear = new Date(( CreateTime + 900)*1000);
        const Date_C = new Date(dispear - Now);
        if (Date_C > 0 )
        {
            return Date_C.getUTCMinutes() + ":" + Date_C.getUTCSeconds() ;
        }else{
            return 'TimeOut';
        }           
    }

    renderInfoWindows(id,lat,lng){  
        const offest={width:50,height:50};
        return(
            <InfoWindow position={{lat:lat,lng:lng}} pixelOffset= {offest}>
                <div>
                    Pokemon ID: {this.props.marker.pokemonId}<br/>                                          
                    剩下時間: {this.livetime(this.props.marker.created)}                
                </div>
            </InfoWindow>
        );     
    }
    
    renderMarkers(pokemondata){
        if ( pokemondata ){       
            return pokemondata.data.map((pokemon)=>{
                const url = `../../image/pokemon/${pokemon.pokemonId}.jpg`;
                const image = { url:url, scaledSize:{width:50,height:50} };
                const position = { lat:pokemon.latitude, lng:pokemon.longitude };              
                return (
                    <Marker  
                        key={pokemon.id} 
                        position={position}
                        onClick={()=> this.props.clickMarker(pokemon)}                                       
                        icon={image}      
                        >                                          
                    </Marker>
                );
            });
        }
        return '';   
    }

    handleZoomChanged() {
        const zoomLevel = this.refs.map.getZoom();
        if (zoomLevel !== this.state.zoomLevel) {
        this.setState({
                zoomLevel,
            });
        }      
        console.log('zoom',this.state.zoomLevel);

    }

    handleCenterChanged(){
        const CenterChanged = {lat:this.refs.map.getCenter().lat(),lng:this.refs.map.getCenter().lng()};
        this.props.setCenter(this.refs.map.getCenter().lat(),this.refs.map.getCenter().lng());
        console.log('setcenter');
    }

    render(){
        let pokemondata = {};

        if(this.props.fakedata==true){
            pokemondata = PokemonFakeData;
        }else{
            pokemondata = this.props.pokemon;
        }

      return (
            <div>
                <GoogleMapLoader
                    containerElement = { <div className="embed-responsive embed-responsive-16by9" />}
                    googleMapElement = {
                        <GoogleMap
                            ref = "map" 
                            options = {{
                                        disableDefaultUI: true,
                                        zoomControl:true,
                                        clickableLabels:false,
                                        clickableIcons:false 
                                      }}                                                                     
                            center = {this.props.center}                           
                            defaultZoom = {this.state.zoomLevel}
                            onDragend = {this.handleCenterChanged.bind(this)}
                            onZoomChanged = {this.handleZoomChanged.bind(this)}
                            >                        
                                {this.renderMarkers(pokemondata)}
                                {this.props.marker ? this.renderInfoWindows(this.props.marker.id,this.props.marker.latitude,this.props.marker.longitude): null}       
                        </GoogleMap>    
                    }
                />
            </div>     
        );
    }   
}

function mapStateToProps(state){
    return { pokemon: state.pokemon, marker:state.marker, center: state.center, selected: state.selected, fakedata:state.fakeData }; 
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ clickMarker, setCenter, fetchPokemon, fakeDataEnable}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(GoogleMapWithPokemons);
