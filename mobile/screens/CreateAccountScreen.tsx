import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native"
import { Button, Input, Text } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { UserService } from "../app/services/JwtUserService";


type FormData = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
};

interface CreateAccountScreenProps {
    registerCallback: () => void,
    userService: UserService
}


const schema: yup.SchemaOf<FormData> = yup.object({
    email: yup.string().email("Must be a valid email").required("Email is required").max(30, "Email must have at most 30 characters."),
    firstName: yup.string().required("First name is required").max(30, "First name must have at most 30 characters."),
    lastName: yup.string().required("Last name is required").max(30, "Last name must have at most 30 characters."),
    password: yup.string().required("Password is required").matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase and One Number"
    ),
    confirmPassword: yup
        .string()
        .required("Confirm password")
        .oneOf([yup.ref("password")], "Passwords do not match"),
}).required();


export const CreateAccountScreen = (props: CreateAccountScreenProps) => {
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: FormData) => {
        props.userService.createUser({
            username: data.email,
            password: data.password,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName
        }).then(response => console.log(response))
            .catch(error => console.error(error));

        props.registerCallback();
    }

    return (
        <KeyboardAwareScrollView>
            <View style={styles.container}>
                <View style={styles.registerForm}>
                    {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                autoCompleteType={"email"}
                                placeholder='Email...'
                                autoCapitalize={"none"}
                            />
                        )}
                        name="email"
                    />

                    {errors.firstName && <Text style={styles.error}>{errors.firstName.message}</Text>}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                autoCompleteType={"name"}
                                placeholder='First name...'
                            />
                        )}
                        name="firstName"
                    />

                    {errors.lastName && <Text style={styles.error}>{errors.lastName.message}</Text>}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                autoCompleteType={"name"}
                                placeholder='Last name...'
                            />
                        )}
                        name="lastName"
                    />

                    {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder='Password...'
                                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                                secureTextEntry={true}
                                leftIconContainerStyle={{ marginRight: 10 }}
                                autoCompleteType={"password"}
                                autoCapitalize={"none"}
                            />
                        )}
                        name="password"
                    />

                    {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder='Confirm password...'
                                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                                secureTextEntry={true}
                                leftIconContainerStyle={{ marginRight: 10 }}
                                autoCompleteType={"password"}
                                autoCapitalize={"none"}
                            />
                        )}
                        name="confirmPassword"
                    />

                    <View style={styles.button}>
                        <Button title="Create account" onPress={handleSubmit(onSubmit)} ></Button>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center",
        alignItems: 'center',
        marginHorizontal: 10,
    },
    button: {
        paddingVertical: 20,
    },

    registerForm: {
        alignSelf: "stretch",
        justifyContent: "center",
        flex: 1,
        marginHorizontal: 20,
        paddingTop: 100
    },
    error: {
        color: "red",
        marginHorizontal: 10,
    }
});