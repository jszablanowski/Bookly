import React, { useState } from "react"
import { View } from "react-native"
import { Button, CheckBox } from "react-native-elements"


interface FlatlySortScreenProps {
    sorted: boolean;
    onChange: (value: boolean) => void;
}

export const FlatlySortScreen = (props: FlatlySortScreenProps) => {

    const [sorted, setSorted] = useState(props.sorted);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ marginTop: 20, marginHorizontal: 15 }}>
                <CheckBox
                    title="Sorting"
                    checked={sorted}
                    onPress={() => setSorted(!sorted)}
                    size={40}
                />
            </View>
            <View style={{
                flex: 1, marginBottom: 40, marginHorizontal: 16,
                display: "flex", flexDirection: "row", alignItems: "flex-end"
            }}>
                <View style={{ flex: 1, marginHorizontal: 4 }}>
                    <Button title="Cancel" type="outline" onPress={() => {
                        props.onChange(props.sorted);
                    }}></Button>
                </View>
                <View style={{ flex: 1, marginHorizontal: 4 }}>
                    <Button title="Apply" onPress={() => {
                        props.onChange(sorted);
                    }}></Button>
                </View>
            </View >
        </View>
    )
}