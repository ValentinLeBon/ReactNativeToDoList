import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal, Alert, SafeAreaView, TextInput } from 'react-native';

export default class ToDoListModal extends React.Component {
    state = {
        name: "",
    };

    createToDo = () => {
        const { name } = this.state

        const list = { name }

        this.props.addList(list);

        this.setState({name: "" });
        //this.props.closeModal();
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Créer ToDo List
                </Text>
                <View style={styles.content}>
                    <TextInput
                    onChangeText={text => this.setState({ name: text })}
                    placeholder="Nom de la liste"
                    ></TextInput>
                    <TouchableOpacity style={styles.create} onPress={this.createToDo}>
                        <Text style={styles.createText}>
                            Créer !
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const colors = {
    black: "#2D3436",
    blue: "#24A6D9",
    lightBlue: "#A7CBD9",
    white: "#FFFFFF",
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 2,
    },
    title: {
        marginTop: 20,
        flex: 2,
        fontSize: 30,
    },
    input: {
        fontSize: 20,
        borderWidth: 2,
        borderBottomColor: colors.black,
    },
    create: {
        borderWidth: 2,
        borderColor: colors.lightBlue,
        borderRadius: 12,
        padding: 16,
    },
    createText: {
        color: colors.blue,
        fontWeight: "bold",
        marginTop: 4,
        textAlign: "center",
    }

})