import React from "react";
import "./Mappy.scss";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import LocateControl from './geolocations';
import Control from '@skyeer/react-leaflet-custom-control'




const DEFAULT_VIEWPORT = { // for rest-button//
  center: [50.62925, 3.057256],// for rest-button//
  zoom: 16,// for rest-button//
};


export default class Mappy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: [],
      viewport: DEFAULT_VIEWPORT,// for rest-button//
    };
  }
  

  componentDidMount() {
    this.getVlilleLocalisation();
  }

  getVlilleLocalisation = () => {
    axios
      .get(
        "https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=vlille-realtime&rows=244&facet=libelle&facet=nom&facet=commune&facet=etat&facet=type&facet=etatconnexion"
      )
      .then((response) => response.data)
      .then((data) => {
        this.setState({ stations: data.records });
      });
  };

  handleClick = () => { // for rest-button//
    this.setState({ viewport: DEFAULT_VIEWPORT })
  }

  onViewportChanged = viewport => { // for rest-button//
    this.setState({ viewport })
  }

  render() {

    const locateOptions = { // for geo-locater//
      position: 'topleft', // for geo-locater//
      strings: {
          title: 'your location' // for geo-locater//
      },
      onActivate: () => {} // for geo-locater//
  }
  
    return (
      <Map  center={[50.62925, 3.057256]} zoom={16} maxZoom={18} 
      /* for rest-button*/ onViewportChanged={this.onViewportChanged} viewport={this.state.viewport}> 
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        
        

        {this.state.stations.map((station) => {
          console.log(station);
          return (
            <Marker
              key={station.fields.libelle}
              position={[
                station.fields.localisation[0],
                station.fields.localisation[1],
              ]}
            />
          );
        })}
        <LocateControl options={locateOptions} />
        <Control position="topleft"> 
            <button onClick={this.handleClick} >Reset View </button>
        </Control> 
         
      </Map>
    );
  }
}
