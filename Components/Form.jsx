import { Modal, Text, View, StyleSheet, Pressable } from 'react-native'

const Form = ({ visible, setModalVisible }) => {
    return (
        <Modal visible={visible} animationType='slide'>
            <View style={styles.container}>
                <Text style={styles.titulo}>New <Text style={styles.tituloBold}>Appointment</Text></Text>
                <Pressable style={styles.btnCancelar} onPress={() => setModalVisible(false)}>
                    <Text style={styles.btnTextoCancelar}>Cancel</Text>
                </Pressable>
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titulo: {
        textAlign: 'center',
        fontSize: 30,
        color: '#374151',
        marginTop: 30,
        fontWeight: '600'
    },
    tituloBold: {
        fontWeight: '900',
        color: '#6d28d9'
    },
    btnCancelar: {
        backgroundColor: '#6d28d9',
        padding: 15,
        marginTop: 30,
        marginHorizontal: 20,
        borderRadius: 10
    },
    btnTextoCancelar: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: '900',
        textTransform: 'uppercase'
    }
})
export default Form