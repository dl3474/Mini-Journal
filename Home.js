import React from 'react';
import { StyleSheet, Text, View, Button, Image, FlatList, SectionList } from 'react-native';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import types from './Types'


class Home extends React.Component {

  render() {
    //let arrayOfNotes = Object.keys(this.props.friends.notes).map(key => this.props.friends.notes[key])

    return (
      
      <View style={styles.container}>
        <SectionList
          sections={this.props.friends.notes}
          renderItem={({ item }) =>          
           (
           <View style={styles.item}>
              <Text>Time: {item.time}</Text>

              {item.note === '' ? false : true && 
                <Text>Note: {item.note}</Text> }

              {item.image === types.EMPTY_IMAGE ? false : true &&
                <Image source={{ uri: item.image }} style={{ width: 200, height: 200 }} />}

            </View>
            )}
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
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: 'pink',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 20,
  },
  title: {
    fontSize: 24,
  },
});


const mapStateToProps = (state) => {
  const { friends } = state
  return { friends }
};


export default connect(mapStateToProps)(Home);