import { Modal, Text, View, StyleSheet, Pressable, TextInput, ScrollView} from 'react-native'
import {useState} from 'react'

const Form = ({ visible, setModalVisible, pacientes, setPacientes}) => {

    const [paciente, setPaciente] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [fechaAlta, setFechaAlta] = useState('')
    const [sintomas, setSintomas] = useState('')

    const handleCita = ()=>{
        //validations
        if ([paciente.trim(),propietario.trim(),email.trim(),telefono.trim(), sintomas.trim()].includes('')){
        return;
        }
        //create an object with all values in the form
        const nuevoPaciente = {
        paciente,
        propietario,
        email,
        telefono,
        sintomas
        };
        nuevoPaciente.id = Date.now();

        console.log(nuevoPaciente)
        setPacientes([...pacientes, nuevoPaciente])
        setModalVisible(false)
    }

    return (
        <Modal visible={visible} animationType='slide'>
            <ScrollView style={styles.container}>
                <Text style={styles.titulo}>New <Text style={styles.tituloBold}>Appointment</Text></Text>
                <Pressable style={styles.btnCancelar} onPress={() => setModalVisible(false)}>
                    <Text style={styles.btnTextoCancelar}>Cancel</Text>
                </Pressable>
                <View style={styles.campo}>
                    <Text style={styles.label}>Pacient Name:</Text>
                    <TextInput style={styles.input} 
                    placeholder='New Pacient' 
                    placeholderTextColor={'#666'} 
                    value ={paciente} 
                    onChangeText ={setPaciente}/>
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Owner:</Text>
                    <TextInput style={styles.input} 
                    placeholder='Owner' 
                    placeholderTextColor={'#666'} 
                    value ={propietario} 
                    onChangeText ={setPropietario}/>
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>E-Mail</Text>
                    <TextInput style={styles.input} placeholder='email@dominio.com' 
                    placeholderTextColor={'#666'} 
                    value ={email} 
                    onChangeText ={setEmail}/>
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Phone Number:</Text>
                    <TextInput style={styles.input} placeholder='4493651872' 
                    placeholderTextColor={'#666'} 
                    value ={telefono} 
                    onChangeText ={setTelefono}/>
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Syntoms</Text>
                    <TextInput style={styles.input} 
                    placeholder='fiebre' 
                    placeholderTextColor={'#666'} 
                    value ={sintomas}
                    multiline={true}
                    numberOfLines ={4}
                    onChangeText ={setSintomas}/>
                </View>
                <Pressable style={styles.btnAgregar} onPress={() => handleCita()}>
                    <Text style={styles.btnTextoCancelar}>Add Appointment</Text>
                </Pressable>
            </ScrollView>
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
    },
    campo:{
        marginTop: 10,
        marginHorizontal:30
    },
    label:{
        marginBottom: 10,
        marginTop: 15,
        fontSize:20,
        fontWeight:'600'
    },
    input:{
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10
    },
    btnAgregar: {
        backgroundColor: '#6d28d9',
        padding: 15,
        marginTop: 30,
        marginHorizontal: 20,
        borderRadius: 10
    }
})
export default Form