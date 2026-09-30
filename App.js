import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import Form from './Components/Form';

export default function App() {
  const [ modalVisible, setModalVisible]  = useState(false)

  return (
    <SafeAreaProvider >
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}>Appointment Administrator {''}<Text style={styles.tituloBold}>Vet</Text></Text>
        <Pressable style={styles.btnNuevaCita} onPress={() => setModalVisible(true)}>
          <Text style={styles.btnTextoNuevaCita}>New Appointment</Text>
        </Pressable>
        <Form visible={modalVisible} setModalVisible={setModalVisible} />
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
    fontSize: 30,
    color: '#374151',
    fontWeight: '600'
  },
  tituloBold: {
    fontWeight: '900',
    color: '#6d28d9'
  },
  btnNuevaCita: {
    backgroundColor: '#6d28d9',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase'
  }
});

