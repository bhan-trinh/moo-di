import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import styles from "../styles/styles"

export const NewNote = () => {
    return (
        <SafeAreaView>
            <Text style={styles.welcomeText}>create a note!</Text>
        </SafeAreaView>
    )
}