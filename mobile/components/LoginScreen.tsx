import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from 'react-native-vector-icons/FontAwesome';
import { CreateAccountScreen } from "./CreateAccountScreen";
import * as yup from "yup";


type FormData = {
    login: string,
    password: string
}

const schema: yup.SchemaOf<FormData> = yup.object({
    login: yup.string().email("Must be a valid email").required("Email is required").max(30, "Email must have at most 30 characters."),
    password: yup.string().required("Password is required")
}).required();

export const LoginScreen = () => {
    const [registerUserMode, setRegisterUserMode] = useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
    }

    return (
        <>
            {registerUserMode ? <CreateAccountScreen registerCallback={() => setRegisterUserMode(false)}></CreateAccountScreen> :
                <KeyboardAwareScrollView>
                    <View style={styles.container}>
                        <Text h1 style={styles.header}>Bookly</Text>

                        <View style={styles.loginForm}>
                            {errors.login && <Text style={styles.error}>{errors.login.message}</Text>}
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        autoCompleteType={"email"}
                                        placeholder='Login...'
                                        autoCapitalize={"none"}
                                        leftIcon={{ type: 'font-awesome', name: 'user' }}
                                        leftIconContainerStyle={{ marginRight: 10 }}
                                    />
                                )}
                                name="login"
                            />

                            {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        autoCompleteType={"password"}
                                        leftIconContainerStyle={{ marginRight: 10 }}
                                        leftIcon={{ type: 'font-awesome', name: 'lock' }}
                                        secureTextEntry={true}
                                        placeholder='Password...'
                                    />
                                )}
                                name="password"
                            />

                            <View style={styles.button}>
                                <Button title="Log in" onPress={handleSubmit(onSubmit)}></Button>
                            </View>
                            <View style={styles.button}>
                                <Button title="Create new account" type="outline" onPress={() => setRegisterUserMode(true)}></Button>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            }
        </>

    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    loginForm: {
        alignSelf: "stretch",
        justifyContent: "center",
        flex: 1,
        marginHorizontal: 20
    },
    header: {
        paddingTop: 100,
        paddingBottom: 100
    },
    button: {
        paddingVertical: 10,
    },
    error: {
        color: "red",
        marginHorizontal: 10,
    }
});
