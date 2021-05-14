import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import Fire from './Fire.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ToDoList from './components/ToDoList';
import AddButton from './components/AddButton';
import ToDoListModal from './components/ToDoListModal';
import ToDoModal from './components/ToDoModal';

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
            <View style={styles.container}>
                <ActivityIndicator size="large" style={styles.primary} />
            </View>
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
  <>
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
        </View>
    </View>
    <View style={{marginVertical: 48}}>
        <TouchableOpacity style={styles.addList} onPress= {() => togToDoListModal()} >
            <Text style={{ fontSize: 25, color: colors.blue }}>
                +
            </Text>
        </TouchableOpacity>
    </View>
    </>
  );
};

const colors = {
    black: "#2D3436",
    blue: "#24A6D9",
    lightBlue: "#A7CBD9",
    white: "#FFFFFF",
}

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
    backgroundColor: colors.blue,
    borderRadius: 20,
  },
  addList: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 12,
    padding: 16,
  },
  add: {
    color: colors.blue,
    fontWeight: "bold",
    fontSize: 12,
    marginTop: 4,
  },
  primary: {
    color: 'teal',
  },
  title: {
    fontSize: 60,
    marginTop: 20
  }
});