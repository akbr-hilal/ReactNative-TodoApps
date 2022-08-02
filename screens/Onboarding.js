import { StatusBar } from 'expo-status-bar';
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";

// Import img
import Design1 from '../assets/icon/design-1.png'
import Design2 from '../assets/icon/design-2.png'

export default function OnBoarding({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar />
            <Text style={styles.title}>Welcome to TodoApps</Text>
            <View style={styles.fitur}>
                <Image source={Design1} style={styles.icon} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.subTitle} >Manage your daily tasks</Text>
                    <Text style={styles.subHeadline} >TodoApps is a very simple application that helps you to increase your daily productivity.</Text>
                </View>
            </View>
            <View style={styles.fitur}>
                <Image source={Design2} style={styles.icon} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.subTitle} >Minimalis Design</Text>
                    <Text style={styles.subHeadline} >Enjoy a simple design that allows you to focus only on what you have to do.</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.btn}>
                <Text style={styles.txtBtn}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 70,
        marginTop: 100,
        textAlign: 'center',
    },

    fitur: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 30
    },

    subTitle: {
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 22
    },

    subHeadline: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 20,
        color: '#757575',
    },

    btn: {
        backgroundColor: '#CDC2AE',
        height: 40,
        width: '100%',
        borderRadius: 5,
        justifyContent: 'center',
        marginTop: 24
    },

    txtBtn: {
        color: '#354259',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center'
    },

    icon: {
        width: 42,
        height: 42,
        marginRight: 20,
        resizeMode: 'contain',
    },
})