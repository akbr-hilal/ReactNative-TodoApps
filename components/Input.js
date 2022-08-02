import { View, Text, TextInput, StyleSheet } from "react-native";

const Input = ({ name, value, error, onChangeText }) => {
    const passwordInput = name === "Password" ? true : false;
    const isErr = error !== "" ? true : false;

    const handleChange = (content) => {
        onChangeText((prev) => {
            return {
                ...prev,
                [name]: {
                    value: content,
                    errMessage: prev[name].errMessage
                }
            }
        })
    }

    return (
        <View>
            <Text style={styles.label}>{name}</Text>
            <TextInput style={isErr ? styles.alertInput : styles.txtInput} value={value} name={name} onChangeText={handleChange} secureTextEntry={passwordInput} /> 
            <Text style={styles.txtErr}>{error}</Text>
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    label: {
        color: "#354259",
        fontSize: 16,
        fontWeight: 600
    },

    txtInput:{
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 12,
        color: 'grey',
        padding: 10,
        borderColor: 'grey'
    },

    alertInput : {
        width: '100%',
        backgroundColor: '#EF9F9F',
        padding: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#EB1D36'
    },

    txtErr: {
        color: '#990000'
    }
})