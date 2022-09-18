import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const SocialButtons = ({onPress, text, bgColor, fgColor}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[StyleSheet.container,
            bgColor ? {backgroundColor: bgColor} : {}]} />
            <Text style={[styles.Text,
            fgColor ? {color: fgColor} : {}]}>{text}</Text>
        </TouchableOpacity>
    );

};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'blue',
        width: '100%',
        padding: 15,
        marginVertical: 8,
        alignItems: 'center',
        borderRadius: 5,
    },
    Text : {
        fontWeight : 'bold',
    },
});

export default SocialButtons;
