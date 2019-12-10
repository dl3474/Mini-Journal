import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import types from './Types'
import { auth } from './firebase'

logout = async () => {
  try {
      await auth.signOut();
      console.log('logout')
  } catch(err) {
    console.log('ERROR IN LOGGING OUT\n\n', err);
  }
}

class Stats extends React.Component {
  calculateStats() {
    let totalNotes = 0;
    const lst = []
    const notes = this.props.reducer.notes;
    for (let i = 0; i < notes.length; i++){
      lst.push(<Text key={i} style={{margin: 5}}>{notes[i].title}: {notes[i].data.length}</Text>)
      totalNotes+= notes[i].data.length
    }
    return [lst, totalNotes];
  }

  render() {
    const [dateNotes, totalNotes] = this.calculateStats();
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.one}>
            <Text>Days of Journaling:</Text>
            <Text>{this.props.reducer.notes.length}!!</Text>
          </View>
          <View style={styles.one}>
            <Text>Total Notes:</Text>
            <Text>{totalNotes}!!</Text>
          </View>
         
        </View>
        <View style={styles.bottom}>
          <View style={styles.one}>
            {dateNotes}
          </View>
          <Button
            title="Back to Input"
            onPress={() =>this.props.navigation.navigate('Input')}
          />
          <Button
            title="Logout"
            onPress={() => logout()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    
  },
  top: {
    flex: 1, 
    backgroundColor: 'white',
    flexDirection: 'row',
    margin: 5
  },

  one: {
    flex: 1,
    padding: 10

  },
  
  bottom: {
    flex: 10,
    backgroundColor: 'white', 
    margin: 5
  },

});

const mapStateToProps = (state) => {
  const { reducer } = state
  return { reducer }
};


export default connect(mapStateToProps)(Stats);