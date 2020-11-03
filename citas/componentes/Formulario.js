import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';

const Formulario = ({citas, setCitas, setMostrarForm}) => {

    const [paciente, setPaciente] = useState('');
    const [propietario, setPropietario] = useState('');
    const [telefono, setTelefono] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const confirmarFecha = date => {
        const opciones = { year: 'numeric', month: 'long', day: "2-digit"}
        setFecha(date.toLocaleDateString('es-ES', opciones))
        hideDatePicker();
    };

    //muestra u oculta el time picker
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const confirmarHora = hora => {
        const opciones = { hour: 'numeric', minute: '2-digit', hour12: false }
        setHora(hora.toLocaleString('en-US', opciones))
        hideTimePicker();
    };

    //crear nueva cita
    const crearNuevaCita = () => {
        //validar 
        if(paciente.trim() === '' || 
        propietario.trim() === '' || 
        telefono.trim() === '' || 
        fecha.trim() === '' ||
         hora.trim() === '' ||
         sintomas.trim() === '') 
         {
            mostrarAlerta();
            return;
         }

         //crear nueva cita
         const cita = { paciente, propietario, telefono, fecha, hora, sintomas };

         cita.id = shortid.generate();

         //agregar al state
         const citasNuevo = [...citas, cita];
         setCitas(citasNuevo);


         //ocultar el formulario
         setMostrarForm(false);

         //resetear el formulario
    };

    //mostrar la alerta si falla la validacion
    const mostrarAlerta = () => {
        Alert.alert(
            'Error', //titulo
            'Todos los campos son obligatorios', //mensaje
            [{
                text: 'OK' //arreglo de botones
            }]
        )
    };

    return (

        <>
            <ScrollView style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Paciente:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(texto) => setPaciente(texto)}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Dueño:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(texto) => setPropietario(texto)}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Teléfono contacto:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(texto) => setTelefono(texto)}
                        keyboardType='numeric'
                    />
                </View>

                <View>
                <Text style={styles.label}>Fecha: </Text>
                    <Button title="Seleccionar Fecha" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={confirmarFecha}
                        onCancel={hideDatePicker}
                        locale='es_ES'
                    />
                    <Text>{fecha}</Text>
                </View>


                <View>
                    <Text style={styles.label}>Hora: </Text>
                    <Button title="Seleccionar Hora" onPress={showTimePicker} />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={confirmarHora}
                        onCancel={hideTimePicker}
                        locale='es_ES'
                    />
                   <Text>{hora}</Text>
                </View>

                <View>
                    <Text style={styles.label}>Síntomas:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(texto) => setSintomas(texto)}
                    />
                </View>
                <View>
            <TouchableHighlight onPress={ () => crearNuevaCita() } style={styles.btnSubmit}>
                <Text style={styles.textoSubmit}>Agendar Cita</Text>
            </TouchableHighlight>
        </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    formulario: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: '2.5%'
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: '#03a9f4',
        marginVertical: 10
    },
    textoSubmit: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default Formulario;