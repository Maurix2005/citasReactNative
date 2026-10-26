import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import Form from './Components/Form';
import Pacientes from './Components/Pacientes';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [edicionPaciente, setEdicionPaciente] = useState({});

  // Función para seleccionar el paciente a editar
  const editarPaciente = (id) => {
    const pacienteEncontrado = pacientes.find(item => item.id === id);
    setEdicionPaciente(pacienteEncontrado);
  };

  // Función para eliminar cita con confirmación nativa
  const eliminarPaciente = (id) => {
    Alert.alert(
      '¿Deseas eliminar este paciente?',
      'Un paciente eliminado no se puede recuperar',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sí, Eliminar', 
          onPress: () => {
            const pacientesActualizados = pacientes.filter(item => item.id !== id);
            setPacientes(pacientesActualizados);
          } 
        }
      ]
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}>
          Appointment Administrator {''}<Text style={styles.tituloBold}>Vet</Text>
        </Text>

        <Pressable 
          style={styles.btnNuevaCita} 
          onPress={() => {
            setEdicionPaciente({}); // Limpia la edición previa al crear nuevo
            setModalVisible(true);
          }}
        >
          <Text style={styles.btnTextoNuevaCita}>New Appointment</Text>
        </Pressable>

        <Form 
          visible={modalVisible} 
          setModalVisible={setModalVisible}
          pacientes={pacientes}
          setPacientes={setPacientes}
          edicion={edicionPaciente}
          setEdicion={setEdicionPaciente}
        /> 

        {pacientes.length === 0 ? (
          <Text style={styles.noPacientes}>No hay pacientes aún</Text>
        ) : (
          <FlatList
            style={styles.listado}
            data={pacientes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Pacientes 
                paciente={item}
                setVisible={setModalVisible}
                editar={editarPaciente}
                eliminar={eliminarPaciente}
                pacientes={pacientes}
              />
            )}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 24,
    color: '#374151',
    fontWeight: '600',
    marginTop: 10
  },
  tituloBold: {
    fontWeight: '900',
    color: '#6d28d9'
  },
  btnNuevaCita: {
    backgroundColor: '#6d28d9',
    padding: 15,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 10
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#374151'
  },
  listado: {
    marginTop: 20,
    marginBottom: 10
  }
});