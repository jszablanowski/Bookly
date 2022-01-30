import React, { useState } from "react"
import { StyleSheet, TextInput, View } from "react-native"
import { Button, Input, Text } from "react-native-elements"


export interface CarlyFilters {
    model: string;
    location: string;
    text: string;
}

interface CarlyFilterScreenProps {
    onChange: (filters: CarlyFilters) => void,
    filters: CarlyFilters;
}

export const CarlyFilterScreen = (props: CarlyFilterScreenProps) => {

    const [text, setText] = useState(props.filters.text);
    const [model, setModel] = useState(props.filters.model);
    const [location, setLocation] = useState(props.filters.location);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 24, fontWeight: "700", marginHorizontal: 10, marginVertical: 20 }}>Select filters:</Text>
                <View style={{ flex: 1, marginLeft: 60, marginRight: 20 }}>
                    <Button title="Clear filters" type="outline" onPress={() => {
                        setText("");
                        setModel("");
                        setLocation("");
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
                            onChangeText={setModel}
                            style={styles.input}
                            value={model}
                        />
                    </View>
                </View>

                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingHorizontal: 60 }}>
                    <Text style={{ fontSize: 16 }}>Street: </Text>

                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <TextInput
                            onChangeText={setLocation}
                            style={styles.input}
                            value={location}
                        />
                    </View>
                </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", flex: 1, alignItems: "flex-end", margin: 6, marginBottom: 40 }}>
                <View style={{ flex: 1, marginHorizontal: 4 }}>
                    <Button title="Cancel" type="outline" onPress={() => {
                        props.onChange({ model: props.filters.model, location: props.filters.location, text: props.filters.text });
                    }}></Button>
                </View>
                <View style={{ flex: 1, marginHorizontal: 4 }}>
                    <Button title="Apply" onPress={() => {
                        props.onChange({ location: location, model: model, text: text });
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