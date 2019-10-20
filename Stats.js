import React from 'react';
import { StyleSheet, Text, View, Button, Image, FlatList, SectionList } from 'react-native';
import { connect } from 'react-redux';
import types from './Types'


class Stats extends React.Component {
  calculateStats() {
    let totalNotes = 0;
    const lst = []
    const notes = this.props.friends.notes;
    for (let i = 0; i < notes.length; i++){
      lst.push(<Text key={i}>{notes[i].title}: {notes[i].data.length}</Text>)
      totalNotes+= notes[i].data.length
    }
    return [lst, totalNotes];
  }

  render() {
    //let arrayOfNotes = Object.keys(this.props.friends.notes).map(key => this.props.friends.notes[key])
    const [dateNotes, totalNotes] = this.calculateStats();
    console.log(dateNotes, totalNotes)
    return (
      
      <View style={styles.container}>
        <Text>Days of Journaling: {this.props.friends.notes.length}!!</Text>
        <Text>Total Notes: {totalNotes}!!</Text>
        {dateNotes}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const mapStateToProps = (state) => {
  const { friends } = state
  return { friends }
};


export default connect(mapStateToProps)(Stats);