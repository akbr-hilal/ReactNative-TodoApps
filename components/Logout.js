import { useNavigation } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from "react"
import { AppContext } from "../App"
import { Pressable, Text, StyleSheet } from "react-native";


const Logout = () => {
    const navigation = useNavigation()
    const {setIdUser, setToken} = useContext(AppContext)

    const handleLogout = async() => {
        try {
            await AsyncStorage.removeItem('token')
            setToken(null)
            setIdUser(null)
            navigation.navigate("Onboarding")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Pressable style={styles.btn} onPress={handleLogout}>
            <Text style={styles.btnTxt}>Logout</Text>
        </Pressable>
    )
}

export default Logout

const styles = StyleSheet.create({
    btn: {
        backgroundColor: "#EB4747",
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderRadius: 6,
        marginRight: 18,
    },
    btnTxt: {
        color: "#ffffff"
    }
})