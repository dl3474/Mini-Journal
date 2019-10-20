import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import types from './Types'


class addConfirmation extends React.Component {

  render() {
    //let arrayOfNotes = Object.keys(this.props.friends.notes).map(key => this.props.friends.notes[key])

    return (
      
      <View style={styles.container}>
        <TouchableOpacity
            onPress={() =>this.props.navigation.navigate('Input')}
        ><Text>Successfully Added!</Text></TouchableOpacity>
        

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


export default connect(mapStateToProps)(addConfirmation);