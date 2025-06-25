import { View, Text, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { TouchableOpacity as TouchableOpacityB } from 'react-native-gesture-handler'
TouchableOpacity

const DynamicTouchableOpacity = (props) => {
    if (Platform.OS === 'android') {
        return (
            <TouchableOpacity {...props}>
                {props.children}
            </TouchableOpacity>
        )
    }
    else {
        return (
            <TouchableOpacityB {...props}>
                {props.children}
            </TouchableOpacityB>
        )
    }

}

export default DynamicTouchableOpacity