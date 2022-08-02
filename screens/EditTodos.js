import * as React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { API } from '../api';
import { AppContext } from '../App';
import Input from '../components/Input';

const EditTodo = ({ navigation, route }) => {
    const id = route.params.id
    const { token } = React.useContext(AppContext)
    const [form, setForm] = React.useState({
        Title: {
            value: "",
            errMessage: "",
        },
        Desc: {
            value: "",
            errMessage: ""
        }
    })

    React.useEffect(() => {
        getTodo()
    }, [])

    const getTodo = async() => {
        try {
            const response = await API.get(`/Todos/${id}`, {
                headers: {'Authorization' : `Bearer ${token}`}
            })
            const data = response.data
            setForm({
                Title: {
                    value: data.title,
                    errMessage: "",
                },
                Desc: {
                    value: data.desc,
                    errMessage: "",
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async() => {
        setForm(prev => {
            const dataObj = {...prev}

            dataObj.Title.errMessage = "";
            dataObj.Desc.errMessage = "";

            return dataObj
        })

        if(form.Title.value === ""){
            return setForm(prev => {
                return {
                    ...prev,
                    Title: {
                        value: prev.Title.value,
                        errMsg:"Title can't be empty"
                    }
                }
            })
        };

        if(form.Desc.value === ""){
            return setForm(prev => {
                return {
                    ...prev,
                    Desc: {
                        value: prev.Desc.value,
                        errMsg:"Description can't be empty"
                    }
                }
            })
        };

        try {
            await API.patch(`/Todos/${id}`, 
                {
                    title: form.Title.value,
                    desc: form.Desc.value,
                },
                {
                    headers: {'Authorization':`Bearer ${token}`}
                }
            )
            navigation.navigate("Home")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Edit Your Todo</Text>
            <Input name="Title" value={form.Title.value} error={form.Desc.errMessage} onChangeText={setForm} />
            <Input name="Desc" value={form.Desc.value} error={form.Desc.errMessage} onChangeText={setForm} />
            <Pressable onPress={handleSubmit} style={styles.btnSubmit}>
                <Text style={styles.txtSubmit}>Save Edit</Text>
            </Pressable>
        </View>
    )
}

export default EditTodo

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height : '100vh',
    },

    title: {
        marginTop: 8,
        marginBottom: 12,
        fontSize: 28,
        fontWeight: "700",
        color: "#354259",
    },

    btnSubmit: {
        backgroundColor: "#354259",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4
    },

    txtSubmit:{
        color: "#FFFFFF",
        fontSize: 20,
        textAlign: 'center'
    }
})
