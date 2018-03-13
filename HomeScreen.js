import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert,FlatList } from 'react-native';
import {StackNavigator} from 'react-navigation';
import { FormLabel, Button, FormInput, List, ListItem } from 'react-native-elements';
import Expo, { SQLite } from 'expo';
import { MapView } from 'expo';

const db = SQLite.openDatabase('placesdb.db');

export default class HomeScreen extends React.Component {
    static navigationOptions = {title: 'Home',};
    constructor(props) {
        super(props);
        this.state = {
            yourplaces:'',
            data:[]
        }
    } 
    componentDidMount() {
        // Create course table
        db.transaction(tx => {
          tx.executeSql('create table if not exists position (id integer primary key not null, yourplaces text);');
        });
        this.updateList();
      }
      // Add List
      buttonSave = () => {
        db.transaction(tx => {
          tx.executeSql('insert into position ( yourplaces) values (?)', [this.state.yourplaces]);    
        }, null, this.updateList)
     
      }  
    
      // Update List
      updateList = () => {
        db.transaction(tx => {
          tx.executeSql('select * from position', [], (_, { rows }) =>
            this.setState({data: rows._array})
          ); 
        });
      }
    
      // Delete List
      deleteItem = (id) => {
        db.transaction(
          tx => {
            tx.executeSql(`delete from position where id = ?;`, [id]);
          }, null, this.updateList
        )    
      }
      
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <FormLabel>PLACEFINDER</FormLabel>            
                <FormInput placeholder='Type in address' style={{ marginTop: 5, marginBottom: 5,  fontSize:18, width: 200,      borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(yourplaces) => this.setState({yourplaces})} value={this.state.yourplaces}/>
                <Button onPress={this.buttonSave} title="Save"/>  
                <List>
                 <FlatList 
                  keyExtractor={item => item.id}
                  renderItem={({item}) => 
                    <ListItem
                      onPress={() => navigate('Maps',{yourplaces:item.yourplaces,id:item.id})}
                      onLongPress={() => this.deleteItem(item.id)}
                      title={item.yourplaces}
                      rightTitle={'show on map'}
                      />
                  
                    } data={this.state.data}  

                />   
                </List> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
