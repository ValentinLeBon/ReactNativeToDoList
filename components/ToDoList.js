import React from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ToDoList extends React.Component {
    state= {
        showListVisible: false
    }

    togListModal() {
        this.setState({showListVisible: !this.state.showListVisible})
    }

    render() {
        const list = this.props.list


    return (
        
        <TouchableOpacity>
            <View>
                <Text>
                    {list.name}
                </Text>
            </View>
        </TouchableOpacity>
    )}
}