import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Fire from './Fire.js';

const firebase = new Fire((error) => {
                  if(error) {
                      return alert(
                          "Erreur",
                          "Une erreur est survenue",
                          [{ text: "OK", onPress: () => console.log("OK Pressed")}]
                          );
                  }
                  });

function App() {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            firebase.getLists(lists => {
                setLists(lists);
                setLoading(false);
            });
            return function unsubscribe() {
                firebase.detach();
            };
        },
    []);

    if(loading) {
        return (
            <ActivityIndicator size="large" style={styles.primary} />
        );
    };

  const renderItem = ( list ) => {
    return (
      <TouchableOpacity /*onPress={ }*/ style={styles.list}>
          <Text style={styles.name}>{list.item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>To Do List</Text>
        <View style={styles.gallery}>
          <FlatList data={lists}
                  renderItem={renderItem}
                  keyExtractor={(list) => list.id}
                />
        <TouchableOpacity style={styles.addButton} /*onPress={navigation}*/>
            <Text>+</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gallery: {
    flex: 2,
  },
  list: {
    backgroundColor: 'indianred',
    borderRadius: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'teal',
    borderRadius: 100,
    padding: 20,
  },
  primary: {
    color: 'teal',
  },
  title: {
    fontSize: 'larger',
  }
});

export default App;
