import * as React from "react";
import { Image, View, StyleSheet, Text, Alert, Pressable, } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { API } from "../api";
import { AppContext } from "../App";
import Input from "../components/Input";
import Logo from "../assets/logo/logo-1.png"

const Login = ({ navigation }) => {
    const isFocused = useIsFocused()
    const { setToken, setIdUser } = React.useContext(AppContext)

    const [isLoad, setIsLoad] = React.useState(false)
    const [form, setForm] = React.useState({
        Email: {
            value: "",
            errMessage: "",
        },

        Password: {
            value: "",
            errMessage: "",
        },
    })

    React.useEffect(() => {
        setForm({
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

    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => <></>
      })    
    }, [navigation])

    const handleSubmit = async() => {
        setForm((prev) => {
            const dataObj = {...prev}

            dataObj.Email.errMessage = "";
            dataObj.Password.errMessage = "";

            return dataObj
        })

        if(form.Email.value === ''){
            return setForm(prev => {
                return {
                    ...prev,
                    Email:{
                        value:prev.Email.value,
                        errMessage:"Email can't be empty"
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
                        value:prev.Password.value,
                        errMessage:"Password can't be less than 4 characters"
                    }
                }})
        };

        try {
            setIsLoad(true)

            const response = await API.post("/auth/login", {
                email: form.Email.value,
                password: form.Password.value,
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
            <View>
                <Image source={Logo} style={styles.img} resizeMode='contain'/>
            </View>
            <Text style={styles.heading}>Welcome</Text>
            <Text style={styles.subHeading}> Please login to continue </Text>
            <View style={styles.form}>
                <Input name="Email" value={form.Email.value} error={form.Email.errMessage} onChangeText={setForm}/>
                <Input name="Password" value={form.Password.value} error={form.Password.errMessage} onChangeText={setForm}/>
                <Pressable style={styles.btn} onPress={handleSubmit}>
                    {
                        isLoad ? <Text style={styles.txtBtn}>Loading...</Text> : <Text style={styles.txtBtn}>Login</Text>
                    }
                </Pressable>
            </View>
            <Text style={{textAlign: "center"}}>Or</Text>
            <Pressable style={[styles.btn, {marginTop: 0, backgroundColor: '#354259'}]} onPress={() => {navigation.navigate("SignUp")}}>
                <Text style={[styles.txtBtn, {color: '#FFFFFF'}]}>SignUp</Text>
            </Pressable>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        backgroundColor: "#ffffff"
    },

    img: {
        height: 120,
        width: 'auto',
        marginTop: 0,
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