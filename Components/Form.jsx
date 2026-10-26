import { Modal, Text, View, StyleSheet, Pressable, TextInput, ScrollView, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState, useEffect } from 'react';

const Form = ({ visible, setModalVisible, pacientes, setPacientes, edicion, setEdicion }) => {

    const [id, setId] = useState(''); 
    const [paciente, setPaciente] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fechaAlta, setFechaAlta] = useState(new Date());
    const [mostrarPicker, setMostrarPicker] = useState(false);
    const [sintomas, setSintomas] = useState('');

    // 2. Escuchar cuando cambie la prop `edicion`
    useEffect(() => {
        if (edicion && Object.keys(edicion).length > 0) {
            setId(edicion.id);
            setPaciente(edicion.paciente);
            setPropietario(edicion.propietario);
            setEmail(edicion.email);
            setTelefono(edicion.telefono);
            setFechaAlta(new Date(edicion.fechaAlta));
            setSintomas(edicion.sintomas);
        }
    }, [edicion]); // Se ejecuta cada vez que cambia 'edicion'

    const onChangeFecha = (e, selectedDate) => {
        setMostrarPicker(Platform.OS === 'ios');
        if (selectedDate) {
            setFechaAlta(selectedDate);
        }
    };

    const resetFormulario = () => {
        setId('');
        setPaciente('');
        setPropietario('');
        setEmail('');
        setTelefono('');
        setFechaAlta(new Date());
        setSintomas('');
    };

    const cleanFormulario = () => {
        resetFormulario();
        if (setEdicion) setEdicion({});
        setModalVisible(false);
    };

    const handleCancelar = () => {
        cleanFormulario();
    };

    const handleCita = () => {
        if ([paciente.trim(), propietario.trim(), email.trim(), telefono.trim(), sintomas.trim()].includes('')) {
            Alert.alert('Campos obligatorios', 'Todos los campos son obligatorios');
            return;
        }

        const objetoPaciente = {
            paciente,
            propietario,
            email,
            telefono,
            fechaAlta,
            sintomas
        };

        if (id) {
    
            objetoPaciente.id = id;
            const pacientesActualizados = pacientes.map(pacienteState => 
                pacienteState.id === id ? objetoPaciente : pacienteState
            );
            setPacientes(pacientesActualizados);
        } else {
            
            objetoPaciente.id = Date.now();
            setPacientes([...pacientes, objetoPaciente]);
        }

        cleanFormulario();
    };

    return (
        <Modal visible={visible} animationType='slide'>
            <ScrollView style={styles.container}>
                <Text style={styles.titulo}>
                    {id ? 'Edit' : 'New'} <Text style={styles.tituloBold}>Appointment</Text>
                </Text>
                
                <Pressable style={styles.btnCancelar} onPress={handleCancelar}>
                    <Text style={styles.btnTextoCancelar}>Cancel</Text>
                </Pressable>

                <View style={styles.campo}>
                    <Text style={styles.label}>Pacient Name:</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder='New Pacient' 
                        placeholderTextColor={'#666'} 
                        value={paciente} 
                        onChangeText={setPaciente}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Owner:</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder='Owner' 
                        placeholderTextColor={'#666'} 
                        value={propietario} 
                        onChangeText={setPropietario}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>E-Mail:</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder='email@dominio.com' 
                        placeholderTextColor={'#666'} 
                        keyboardType='email-address'
                        value={email} 
                        onChangeText={setEmail}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Phone Number:</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder='4493651872' 
                        placeholderTextColor={'#666'} 
                        keyboardType='phone-pad'
                        value={telefono} 
                        onChangeText={setTelefono}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Discharge date:</Text>
                    <Pressable 
                        style={styles.input}
                        onPress={() => setMostrarPicker(true)}
                    >
                        <Text style={styles.fechaTexto}>
                            {fechaAlta.toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </Text>
                    </Pressable>

                    {mostrarPicker && (
                        <DateTimePicker
                            value={fechaAlta}
                            mode='date'
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={onChangeFecha}
                            locale={'es-ES'}
                        />
                    )}
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Symptoms:</Text>
                    <TextInput 
                        style={[styles.input, styles.sintomasInput]} 
                        placeholder='Fiebre' 
                        placeholderTextColor={'#666'} 
                        value={sintomas}
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={setSintomas}
                    />
                </View>

                <Pressable style={styles.btnAgregar} onPress={handleCita}>
                    <Text style={styles.btnTextoCancelar}>
                        {id ? 'Save Changes' : 'Add Appointment'}
                    </Text>
                </Pressable>
            </ScrollView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6'
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
        marginTop: 20,
        marginHorizontal: 30,
        borderRadius: 10
    },
    btnTextoCancelar: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: '900',
        textTransform: 'uppercase'
    },
    campo: {
        marginTop: 10,
        marginHorizontal: 30
    },
    label: {
        marginBottom: 8,
        marginTop: 15,
        fontSize: 16,
        fontWeight: '600',
        color: '#374151'
    },
    input: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        color: '#000'
    },
    fechaTexto: {
        color: '#374151',
        fontSize: 15
    },
    sintomasInput: {
        height: 100,
        textAlignVertical: 'top'
    },
    btnAgregar: {
        backgroundColor: '#6d28d9',
        padding: 15,
        marginVertical: 30,
        marginHorizontal: 30,
        borderRadius: 10
    }
});

export default Form;