import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../Colors'


export default function AddButton (props) {
    return (
        <View style={{marginVertical: 48}}>
            <TouchableOpacity style={styles.addList}>
                <Text 
                style={{ fontSize: 25, color: colors.blue }}
                >+</Text>
                
            </TouchableOpacity>
            <Text style={styles.add}>{props.content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    addList: {
        borderWidth: 2,
        borderColor: colors.lightBlue,
        borderRadius: 12,
        padding: 16,
        alignItems: "center",
        justifyContent: "center"
    },
    add: {
        color: colors.blue,
        fontWeight: "bold",
        fontSize: 12,
        marginTop: 4,
    },
});