import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, SectionList } from 'react-native';
import { connect } from 'react-redux';


class Home extends React.Component {

  render() {
    //let arrayOfNotes = Object.keys(this.props.friends.notes).map(key => this.props.friends.notes[key])

    return (
      
      <View style={styles.container}>
        <Text>Testing!</Text>
        <SectionList
          sections={this.props.friends.notes}
          renderItem={({ item }) => <Text>{item.time}----{item.note}</Text>}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

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

const mapStateToProps = (state) => {
  const { friends } = state
  return { friends }
};


export default connect(mapStateToProps)(Home);