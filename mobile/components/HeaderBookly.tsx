import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Header } from 'react-native-elements';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5';



export const HeaderBookly = ({ navigation }: NativeStackHeaderProps) => {
    return (
        <View>
            <Header
                rightComponent={
                    <View style={styles.headerRight}>
                        <TouchableOpacity onPress={() => { navigation.navigate("AccountScreen") }}>
                            <IconFontAwesome name="user-alt" color="white" size={24} />
                        </TouchableOpacity>
                    </View>
                }
                leftComponent={{ text: 'Bookly', style: styles.heading }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    headerRight: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
    },
});
