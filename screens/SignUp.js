import * as React from "react";
import { View, Alert, Text, Pressable, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { API } from "../api";
import { AppContext } from "../App";
import Input from "../components/Input";

const SignUp = ({ navigation }) => {
    const isFocused = useIsFocused()
    const { token, setToken, setIdUser } = React.useContext(AppContext)
    const [isLoad, setIsLoad] = React.useState(false)
    const [form, setForm] = React.useState({
        Firstname: {
            value: "",
            errMessage: "",
        },

        Lastname: {
            value: "",
            errMessage: "",
        },

        Email: {
            value: "",
            errMessage: "",
        },

        Password: {
            value: "",
            errMessage: "",
        },
    })

    React.useLayoutEffect(() => {
        if(token) {
            navigation.navigate("Home")
        }
    }, [isFocused, token])

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <></>
        })
    }, [navigation])

    React.useEffect(() => {
        setForm({
            Firstname: {
                value: "",
                errMessage: "",
            },
    
            Lastname: {
                value: "",
                errMessage: "",
            },
    
            Email: {
                value: "",
                errMessage: "",
            },
    
            Password: {
                value: "",
                errMessage: "",
            },
        })
    }, [isFocused])

    const handleRegister = async() => {
        setForm((prev) => {
            const dataObj = {...prev}

            dataObj.Firstname.errMessage = "";
            dataObj.Lastname.errMessage = "";
            dataObj.Email.errMessage = "";
            dataObj.Password.errMessage = "";

            return dataObj
        })

        if(form.Firstname.value === ''){
            return setForm(prev => {
                return {
                    ...prev,
                    FirstName:{
                        value: prev.Firstname.value,
                        errMessage:"First name can't be empty"
                    }
                }
            })
        } else if(form.Firstname.value.length < 2){
            return setForm(prev => {
                return {
                    ...prev,
                    Firstname: {
                        value: prev.Firstname.value,
                        errMessage: "First name can't be less than 2 characters"
                    }
                }
            })
        }

        if(form.Lastname.value === ''){
            return setForm(prev => {
                return {
                    ...prev,
                    LastName:{
                        value: prev.Lastname.value,
                        errMessage:"Last name can't be empty"
                    }
                }
            })
        } else if(form.Lastname.value.length < 2){
            return setForm(prev => {
                return {
                    ...prev,
                    Lastname: {
                        value: prev.Lastname.value,
                        errMessage: "Last name can't be less than 2 characters"
                    }
                }
            })
        }

        if(form.Email.value === ''){
            return setForm(prev => {
                return {
                    ...prev,
                    Email: {
                        value: prev.Email.value,
                        errMessage: "Email can't be empty"
                    }
                }
            })
        } else if( !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.Email.value)) ){
            return setForm(prev => {
                return {
                    ...prev,
                    Email:{
                        value: prev.Email.value,
                        errMessage: "Email format incorrect"
                    }
                }
            })
        };

        if(form.Password.value === ''){
            return setForm(prev => {
                return {
                    ...prev,
                    Password: {
                        value: prev.Password.value,
                        errMessage: "Password can't be empty"
                    }
                }
            })
        } else if(form.Password.value.length < 4){
            return setForm(prev => {
                return {
                    ...prev,
                    Password:{
                        value: prev.Password.value,
                        errMessage: "Password can't be less than 4 characters"
                    }
                }})
        };

        
        try {
            setIsLoad(true)

            const response = await API.post("/auth/register", {
                email: form.Email.value,
                password: form.Password.value,
                firstName: form.Firstname.value,
                lastName: form.Lastname.value,
            })

            
            const data = response.data
            
            const token = data.token
            const id = data.userId
            
            setIdUser(id)
            setToken(token)
            navigation.navigate("Home")
            setIsLoad(false)
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
            Alert.alert(
                'An error occured',
                'Make sure password match the register email',
                [
                    {
                        text: "OK",
                        onPress: () => {}
                    }
                ]
            )
            setIsLoad(false)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Create Account</Text>
            <Text style={styles.subHeading}> Please create account to continue </Text>
            <View style={styles.form}>
                <Input name="Firstname" value={form.Firstname.value} error={form.Firstname.errMessage} onChangeText={setForm}/>
                <Input name="Lastname" value={form.Lastname.value} error={form.Lastname.errMessage} onChangeText={setForm}/>
                <Input name="Email" value={form.Email.value} error={form.Email.errMessage} onChangeText={setForm}/>
                <Input name="Password" value={form.Password.value} error={form.Password.errMessage} onChangeText={setForm}/>
                <Pressable style={styles.btn} onPress={handleRegister}>
                    {
                        isLoad ? <Text style={styles.txtBtn}>Loading...</Text> : <Text style={styles.txtBtn}>SignUp</Text>
                    }
                </Pressable>
            </View>
            <Text style={{textAlign: "center"}}>Or</Text>
            <Pressable style={[styles.btn, {marginTop: 0, backgroundColor: '#354259'}]} onPress={() => {navigation.navigate("Login")}}>
                <Text style={[styles.txtBtn, {color: '#FFFFFF'}]}>Login</Text>
            </Pressable>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        backgroundColor: "#ffffff"
    },

    heading: {
        fontSize: 40,
        textAlign: "center",
        marginTop: 25,
        color: "#354259",
        fontWeight: 700,
    },

    subHeading: {
        textAlign: "center",
        color: "#2C3333"
    },

    form: {
        marginTop: 12,
    },

    txtBtn: {
        color: '#354259',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center'
    },

    btn: {
        backgroundColor: '#CDC2AE',
        height: 40,
        width: '100%',
        borderRadius: 5,
        justifyContent: 'center',
        marginTop: 24
    }
})