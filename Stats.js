import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import types from './Types'
import { auth } from './firebase'
import { Card, Title, Paragraph } from 'react-native-paper';
import Image from './imagePicker'

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
      /*
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
          <View style={{alignSelf: 'center', padding: 30}}>
            <Button
              style={{margin: 20}}
              title="Logout"
              onPress={() => logout()}
            />
          </View>
          
        </View>
      </View>*/
      <View style={styles.container}>
      
      <Card style={{marginTop: 20}}>
        <Card.Content>
          <Title>Name: {this.props.reducer.name}</Title>
          <Paragraph> </Paragraph>
          <Image/>
          <View style={{alignSelf: 'center'}}>
            <Button 
                style={{margin: 15}}
                title="Add Avatar"
                onPress={this.props.addImage}
                disabled={this.props.reducer.image == types.EMPTY_IMAGE}
            />
          </View>
        </Card.Content>
      </Card>

      <Card style={{marginTop: 20}}>
        <Card.Content>
          <Title>Days of Journaling: {this.props.reducer.notes.length}!!</Title>
          <Title>Total Notes: {totalNotes}!!</Title>
          <View style={{marginLeft: 10}}>{dateNotes}</View>
        </Card.Content>
      </Card>


      <View style={{alignSelf: 'center', padding: 30}}>
        <Button
          style={{margin: 20}}
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
    padding: 20
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