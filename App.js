import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import Fire from './Fire.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ToDoList from './components/ToDoList';
import AddButton from './components/AddButton';
import ToDoListModal from './components/ToDoListModal';
import ToDoModal from './components/ToDoModal'

export default function App() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ToDoVisible, setToDoVisible] = useState(false);
  const [ListVisible, setListVisible] = useState(false);

const firebase = new Fire((error) => {
                  if(error) {
                      return alert(
                          "Erreur",
                          "Une erreur est survenue",
                          [{ text: "OK", onPress: () => console.log("OK Pressed")}]
                          );
                  }
                  });

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

  function togToDoListModal() {
    setToDoVisible(!ToDoVisible);
  }

  function togToDoModal() {
    setListVisible(!ListVisible);
  }

  const renderItem = ( list ) => {
    return (
      <TouchableOpacity onPress={ (togToDoModal)} style={styles.list}>
          <Text style={styles.name}>{list.item.name}</Text>
      </TouchableOpacity>
    );
  };

  addList = list => {
    firebase.addList({
      name: list.name,
      todos: []
    })
  }

  updateList = list => {
    firebase.updateList(list);
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={ToDoVisible}
        onRequestClose={() => togToDoListModal()}
        style={{ backgroundColor: ToDoVisible ? 'red' : 'blue' }}
      >
        <ToDoListModal onClose={() => togToDoListModal()} addList={this.addList}/>
      </Modal>
        <Text style={styles.title}>To Do List</Text>
        <View style={styles.gallery}>
          <FlatList data={lists}
                  renderItem={renderItem}
                  keyExtractor={(list) => list.id}
                />
        <TouchableOpacity 
        style={styles.addButton} 
        onPress= {() => togToDoListModal()} >
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
    fontSize: 60,
    marginTop: 20
  }
});