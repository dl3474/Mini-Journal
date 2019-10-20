import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addNote, setNote } from './Actions';


const styles = StyleSheet.create( {
  container: {
      flex: 1, 
      backgroundColor: 'pink',
      justifyContent: 'center',
  },

  input: {
      flex: 1,
      backgroundColor: 'white',
      fontSize: 18,
      padding: 9,
      margin: 5,
      justifyContent: 'center',

  },

  inputRow: {
      flexDirection: 'row',
      padding: 5
  },

  todos: {
      flexDirection: 'column', 
  },

  button: {
      flex: 1
  },

  spacing: {
      flex: 10
  }

})

class Input extends React.Component {

  render() {
    // console.log('STATE\n\n', this.props);
    // const {addNote, setNote, note,} = this.props;
    return (
      <View style={styles.container}>
        <TextInput 
            style={styles.input} 
            onChangeText={this.props.setNote} 
            value={this.props.friends.note}
            placeholder="Note"
        />
        {/* <TextInput 
            style={styles.input}
            onChangeText={text => this.setState({location: text})} 
            value={this.state.location}          
            placeholder="Location (Optional)"
        /> */}
        <Button 
            style={styles.button}
            title="Add Todo"
            onPress={this.props.addNote}
            disabled={!this.props.friends.note}
        />
      <View style={styles.spacing}/>
    </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { friends } = state
  return { friends }
};


const mapDispatchToProps = dispatch => (
    bindActionCreators({
      addNote,
      setNote
    }, dispatch)
  );
  
export default connect(mapStateToProps, mapDispatchToProps)(Input);