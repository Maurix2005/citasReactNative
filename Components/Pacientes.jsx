import React from 'react';
import { View, Pressable, StyleSheet, Text } from "react-native";

const Pacientes = ({ setVisible, pacientes, paciente, eliminar, editar }) => {

    const handleEditar = () => {
        setVisible(true);
        editar(paciente.id);
    };

    const handleEliminar = () => {
        eliminar(paciente.id);
    };

    // Función para formatear la fecha correctamente
    const formatearFecha = (fecha) => {
        if (!fecha) return 'sin registro de fecha';
        
        // Si fecha es un objeto Date, la formateamos directamente
        if (fecha instanceof Date) {
            return fecha.toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }

        // Si la fecha viene como string, creamos un Date primero
        const nuevaFecha = new Date(fecha);
        return nuevaFecha.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <View style={PatStyles.card}>
            <Text style={PatStyles.patLabel}>
                Paciente: {' '}
                <Text style={PatStyles.patName}>
                    {paciente?.paciente || 'Anonimo'}
                </Text>
            </Text>

            <Text style={PatStyles.patFecha}>
                {formatearFecha(paciente?.fechaAlta)}
            </Text>

            <View style={PatStyles.patContBtns}>
                <Pressable 
                    style={[PatStyles.btnBase, PatStyles.editBtn]}
                    onPress={handleEditar}
                >
                    <Text style={PatStyles.patBtn}>Edit</Text>
                </Pressable>

                <Pressable 
                    style={[PatStyles.btnBase, PatStyles.deleteBtn]}
                    onPress={handleEliminar}
                >
                    <Text style={PatStyles.patBtn}>Delete</Text>
                </Pressable>
            </View>
        </View>
    );
};

const PatStyles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 8,
        marginHorizontal: 20,
        marginTop: 10
    },
    patLabel: {
        color: '#374151',
        textTransform: 'uppercase',
        fontWeight: '700',
        marginBottom: 10,
        fontSize: 14
    },
    patName: {
        color: '#6d28d9',
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 10
    },
    patFecha: {
        color: '#374151',
        margin: 0,
        fontSize: 14
    },
    patContBtns: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        gap: 10,
        marginTop: 20
    },
    btnBase: {
        paddingVertical: 12,    
        paddingHorizontal: 20,
        borderRadius: 5,
        flex: 1,                
        alignItems: 'center',   
        justifyContent: 'center'
    },
    patBtn: {
        textTransform: 'uppercase',
        fontWeight: '700',
        fontSize: 12,
        color: '#ffffff',
        textAlign: 'center'
    },
    editBtn: {
        backgroundColor: '#f59e0b'
    },
    deleteBtn: {
        backgroundColor: '#ef4444'
    }
});

export default Pacientes;