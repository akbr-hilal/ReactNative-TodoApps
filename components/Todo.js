import * as React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { API } from "../api";
import { AppContext } from "../App";

const Todo = ({ item, navigation, showModal, setId }) => {
    const { token } = React.useContext(AppContext)

    const onCheck = async(isChecked, id) => {
        try {
            await API.patch(`/Todos/${id}`,{
                isDone: `${isChecked}`,
           },{
             headers: {'Authorization':`Bearer ${token}`}
             });
        } catch(err) {
            console.log(err)
        }
  };


  const isCheck = item.isDone === "false" ? false : true;


    return (
        <Pressable style={styles.containerTodo} onPress={() => {navigation.navigate("Detail", {id: item._id})}}>
            <View style={{ flexDirection: "row"}}>
                <BouncyCheckbox isChecked={isCheck} size={20} fillColor="#CDC2AE" unfillColor="#C2DED1" text="" iconStyle={{ borderColor: "#898989" }} onPress={(isChecked) => {onCheck(isChecked, item._id)}} />
                <Text style={styles.titleTodo}>{item.title.slice(0,12) + "... "}</Text>
            </View>

            <View style={{ flexDirection: "row"}}>
                <Pressable style={styles.editBtn} onPress={() => {navigation.navigate("Edit",{id: item._id})}}>
                    <MaterialCommunityIcons name="note-edit" size={20} color="#CDC2AE" style={{marginEnd: 4}}/>
                </Pressable>
                <Pressable style={styles.delBtn} onPress={() => {setId(item._id); showModal(true)}}>
                    <MaterialCommunityIcons name="delete" size={20} color="black" style={{marginStart: 2}}/>
                </Pressable>
            </View>

        </Pressable>
    )
}

export default Todo

const styles = StyleSheet.create({
    containerTodo: {
        flexDirection: 'row',
        backgroundColor: '#E7F6F2',
        padding: 14,
        width: 400,
        height: 58,
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 10,
        marginBottom: 16
    },

    titleTodo: {
        fontSize: 18,
        fontWeight: 700,
        color: "#354259",
        marginRight: 80,
    },

    delBtn: {
        backgroundColor: "#EB4747",
        borderRadius: 4,
        padding: 8,
        alignItems: "center",
        justifyContent: "center"
    },

    editBtn: {
        backgroundColor: "#354259",
        borderRadius: 4,
        padding: 8,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12
    }
})