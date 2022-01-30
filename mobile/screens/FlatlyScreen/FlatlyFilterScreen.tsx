import React, { useState } from "react"
import { StyleSheet, TextInput, View } from "react-native"
import { Button, Input, Text } from "react-native-elements"


export interface FlatlyFilters {
    text: string;
    city: string;
    street: string;
}

interface FlatlyFilterScreenProps {
    onChange: (filters: FlatlyFilters) => void,
    filters: FlatlyFilters;
}

export const FlatlyFilterScreen = (props: FlatlyFilterScreenProps) => {

    const [text, setText] = useState(props.filters.text);
    const [city, setCity] = useState(props.filters.city);
    const [street, setStreet] = useState(props.filters.street);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 24, fontWeight: "700", marginHorizontal: 10, marginVertical: 20 }}>Select filters:</Text>
                <View style={{ flex: 1, marginLeft: 60, marginRight: 20 }}>
                    <Button title="Clear filters" type="outline" onPress={() => {
                        setText("");
                        setCity("");
                        setStreet("");
                    }}></Button>
                </View>
            </View>

            <View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingHorizontal: 60 }}>
                    <Text style={{ fontSize: 16 }}>Search: </Text>

                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <TextInput
                            onChangeText={setText}
                            style={styles.input}
                            value={text}
                            clearButtonMode="while-editing"
                        />
                    </View>
                </View>

                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingHorizontal: 60 }}>
                    <Text style={{ fontSize: 16 }}>City: </Text>

                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <TextInput
                            onChangeText={setCity}
                            style={styles.input}
                            value={city}
                        />
                    </View>
                </View>

                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingHorizontal: 60 }}>
                    <Text style={{ fontSize: 16 }}>Street: </Text>

                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <TextInput
                            onChangeText={setStreet}
                            style={styles.input}
                            value={street}
                        />
                    </View>
                </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", flex: 1, alignItems: "flex-end", margin: 6, marginBottom: 40 }}>
                <View style={{ flex: 1, marginHorizontal: 4 }}>
                    <Button title="Cancel" type="outline" onPress={() => {
                        props.onChange({ city: props.filters.city, street: props.filters.street, text: props.filters.text });
                    }}></Button>
                </View>
                <View style={{ flex: 1, marginHorizontal: 4 }}>
                    <Button title="Apply" onPress={() => {
                        props.onChange({ city: city, street: street, text: text });
                    }}></Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 200,
        borderRadius: 4
    },
});