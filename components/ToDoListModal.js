import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal, Alert, SafeAreaView, TextInput } from 'react-native';
import fire from '../Fire.js'

export default class ToDoListModal extends React.Component {
    state = {
        name: "",
    };

    /*createToDo = () => {
        const { name } = this.state

        const list = { name }

        this.props.addList(list);

        this.setState({name: ""})
        this.props.closeModal();
    }*/

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Créer ToDo List
                </Text>
                <TextInput 
                placeholder="Nom de la liste"
                ></TextInput>
                <TouchableOpacity onPress={this.createToDo}>
                    <Text>
                        Créer !
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        
    }
})