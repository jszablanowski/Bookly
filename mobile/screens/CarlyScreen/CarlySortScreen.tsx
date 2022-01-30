import React, { useState } from "react"
import { View } from "react-native"
import { Button, ButtonGroup, CheckBox } from "react-native-elements"


export enum SortMode {
    dateSortAsc,
    dateSortDesc,
    priceSortAsc,
    priceSortDesc
}

interface CarlySortScreenProps {
    sortMode: SortMode | undefined;
    onChange: (value: SortMode | undefined) => void;
}

export const CarlySortScreen = (props: CarlySortScreenProps) => {


    const [sortMode, setSortMode] = useState<SortMode | undefined>(props.sortMode);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ marginTop: 20, marginHorizontal: 15 }}>
                <View style={{ marginBottom: 16 }}>
                    <Button title="Sort by date ascending" type={sortMode === SortMode.dateSortAsc ? "solid" : "outline"} onPress={() => {
                        if (sortMode !== SortMode.dateSortAsc) {
                            setSortMode(SortMode.dateSortAsc);
                        } else {
                            setSortMode(undefined);
                        }
                    }}></Button>
                </View>
                <View style={{ marginBottom: 16 }}>
                    <Button title="Sort by date descending" type={sortMode === SortMode.dateSortDesc ? "solid" : "outline"} onPress={() => {
                        if (sortMode !== SortMode.dateSortDesc) {
                            setSortMode(SortMode.dateSortDesc);
                        } else {
                            setSortMode(undefined);
                        }
                    }}></Button>
                </View>
                <View style={{ marginBottom: 16 }}>
                    <Button title="Sort by price ascending" type={sortMode === SortMode.priceSortAsc ? "solid" : "outline"} onPress={() => {
                        if (sortMode !== SortMode.priceSortAsc) {
                            setSortMode(SortMode.priceSortAsc);
                        } else {
                            setSortMode(undefined);
                        }
                    }}></Button>
                </View>
                <View>
                    <Button title="Sort by price descending" type={sortMode === SortMode.priceSortDesc ? "solid" : "outline"} onPress={() => {
                        if (sortMode !== SortMode.priceSortDesc) {
                            setSortMode(SortMode.priceSortDesc);
                        } else {
                            setSortMode(undefined);
                        }
                    }}></Button>
                </View>
            </View>
            <View style={{
                flex: 1, marginBottom: 40, marginHorizontal: 16,
                display: "flex", flexDirection: "row", alignItems: "flex-end"
            }}>
                <View style={{ flex: 1, marginHorizontal: 4 }}>
                    <Button title="Cancel" type="outline" onPress={() => {
                        props.onChange(props.sortMode);
                    }}></Button>
                </View>
                <View style={{ flex: 1, marginHorizontal: 4 }}>
                    <Button title="Apply" onPress={() => {
                        props.onChange(sortMode);
                    }}></Button>
                </View>
            </View >
        </View>
    )
}