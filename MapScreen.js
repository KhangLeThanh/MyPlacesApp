import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import {StackNavigator} from 'react-navigation';
import Expo from 'expo';
import { MapView } from 'expo';
import Geocoder from 'react-native-geocoding';

export default class MapScreen extends React.Component {
    static navigationOptions = {title: 'Maps',};
    constructor(props){
        super(props);
        this.state = {
            latitude:0,
            longitude:0
          }   
    }  
   componentWillMount(){
        const { params } = this.props.navigation.state;
        Geocoder.setApiKey('AIzaSyBsnNcbg6N2MfMa1F9eBKhH_LIBwnE72WE'); // use a valid API key 
        Geocoder.getFromLocation(params.yourplaces).then(
          json => {
            var location = json.results[0].geometry.location;
            this.setState({
              latitude: location.lat,
              longitude:location.lng,
            })
          },
          error => {
            alert(error);
          }
          
        );  
   } 
    render() {
        const { params } = this.props.navigation.state;
        return(
            <View style={styles.container}>
            <MapView
                style={styles.map}
                region={{
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    latitudeDelta: 0.0322,
                    longitudeDelta: 0.0221,
                }}>
                    <MapView.Marker
                    coordinate={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                    }}
                    title={params.yourplaces}
                    />
            </MapView>   
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
      },
      map: {
        flex: 80,
      },
});
