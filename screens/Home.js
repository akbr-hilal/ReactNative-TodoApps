import * as React from "react";
import { useIsFocused } from "@react-navigation/native";
import { View, Text, FlatList, TextInput, Modal, Pressable, StyleSheet } from "react-native";

import { AppContext } from "../App";
import { API } from "../api";
import Todo from "../components/Todo";

const Home = ({ navigation }) => {
    const isFocused = useIsFocused()
    const { token, idUser } = React.useContext(AppContext)
    console.log(idUser)

    const [todos, setTodos] = React.useState([])
    const [search, setSearch] = React.useState("")

    const [id, setId] = React.useState(null)
    const [visible, setVisible] = React.useState(false)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft : () => <></>
        })
    }, [navigation])

    React.useEffect(() => {
        getTodos()
    }, [search, isFocused])

    const getTodos = async() => {
        try {
            const response = await API.get("/Todos", {
                headers: {'Authorization':`Bearer ${token}`}
            })

            const data = response.data

            const todoData = data.filter((item) => {
                return item.title.toLowerCase().trim().startsWith(search.toLowerCase()) === true
            })

            const filterTodo = todoData.filter((item) => item.author_id._id === idUser)
            
            setTodos(filterTodo)
        } catch (error) {
            console.log(error)
        }
    }
    console.log(todos)

    const delTodos = async(id) => {
        try {
            await API.delete(`/Todos/${id}`, {
                headers: {'Authorization':`Bearer ${token}`}
            })
            getTodos()
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <View style={styles.container}>
            <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={() => {setVisible(false)}}>
                <View style={styles.modalContainer}>
                    <Text style={styles.titleModal}>Delete Data</Text>
                    <Text style={styles.subtitleModal}>Are you sure to delete this data?</Text>
                    <View style={styles.modalBtn}>
                        <Pressable style={styles.delBtn} onPress={() => {setVisible(false); delTodos(id)}}>
                            <Text style={styles.delTxt}>Yes</Text>
                        </Pressable>
                        <Pressable style={styles.cancelBtn} onPress={() => {setVisible(false)}}>
                            <Text style={styles.cancelTxt}>No</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Text style={styles.title}>My Todo List</Text>
            <View>
                <TextInput style={styles.searchInput} value={search} onChangeText={(item) => {setSearch(item)}} />
            </View>
            <View>
                {todos.length === 0 ? (
                    <>
                        <Text style={{color: "#232323", height: 340}}>No data todos ...</Text>
                    </>
                ) : (
                    <>
                        <FlatList data={todos} style={{height: 340}} keyExtractor={(item) => item._id} renderItem={(todosData) => <Todo item={todosData.item} navigation={navigation} showModal={setVisible} setId={setId} /> } />
                    </>
                )}
            </View>
            <View>
                <Pressable style={styles.btnAdd} onPress={() => {navigation.navigate("Add")}}>
                    <Text style={styles.txtAdd}>+ Add Todo</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },

    title: {
        marginVertical:24,
        fontSize: 40,
        fontWeight: "700",
        color: "#354259"
    },

    searchInput: {
        width: 200,
        height: 40,
        borderColor:"#354259",
        borderRadius:4,
        borderWidth : 1,
        padding: 14,
        marginBottom:32
    },

    btnAdd: {
        backgroundColor: "#354259",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4
    },

    txtAdd: {
        color: "#FFFFFF",
        fontSize: 20,
        textAlign: 'center'
    },

    modalContainer: {
        backgroundColor: "#E7F6F2",
        height: '100%',
        marginTop: 72,
        padding: 32,
        alignItems: "center"
    },

    titleModal: {
        fontSize: 32,
        fontWeight: 700,
        textAlign: "center",
    },

    subtitleModal: {
        fontSize: 20,
        fontWeight: 500,
        textAlign: 12,
        marginBottom: 20,
    },

    modalBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    delBtn: {
        backgroundColor: "#EB4747",
        paddingVertical: 8, 
        paddingHorizontal: 12,
        width: 100,
        borderRadius: 8,
        marginRight: 8
    },

    cancelBtn: {
        backgroundColor: "#91C788",
        paddingVertical: 8, 
        paddingHorizontal: 12,
        width: 100,
        borderRadius: 8,
    },

    delTxt: {
        color: "#FFFFFF",
        fontSize: 20,
        textAlign: "center",
        fontWeight: 700
    },

    cancelTxt: {
        color: "#FFFFFF",
        fontSize: 20,
        textAlign: "center",
        fontWeight: 700
    }
})