import React, { useState } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight, Platform } from 'react-native';
import Cita from './componentes/cita';
import Formulario from './componentes/Formulario';


const App = () => {

  const [mostrarform, setMostrarForm] = useState(false);

  //definir state de citas
  const [citas, setCitas] = useState([
    { id: "1", paciente: "Hook", propietario: "Jordi", sintomas: "No Come" },
    { id: "2", paciente: "Redux", propietario: "Jose", sintomas: "No Duerme" },
    { id: "3", paciente: "React", propietario: "Pepe", sintomas: "No Hace Nada" }
  ]);

  //eliminar pacientes del state
  const eliminarPaciente = id => {
    setCitas((citasActuales) => {
      return citasActuales.filter(cita => cita.id !== id)
    })
  };

  //muestra u oculta formulario
  const mostrarFormulario = () => {
    setMostrarForm(!mostrarform)
  };


  return (
    <View style={Styles.contenedor}>

      <Text style={Styles.titulo}>Administrador de Citas</Text>

      <View>
            <TouchableHighlight onPress={ () => mostrarFormulario() } style={Styles.btnForm}>
                <Text style={Styles.textoForm}>Crear nueva cita</Text>
            </TouchableHighlight>
        </View>

      <View style={Styles.contenido}>
        {mostrarform ? (
          <>
          <Text style={Styles.titulo}>Crear Nueva Cita</Text>
          <Formulario 
            citas={citas}
            setCitas={setCitas}
            setMostrarForm={setMostrarForm}
          />
          </>
        ) : (
            <>
              <Text style={Styles.titulo}>{citas.length > 0 ? 'Administa tus citas' : 'No hay citas'}</Text>

              <FlatList
                style={Styles.listado}
                data={citas}
                renderItem={({ item }) => <Cita cita={item} eliminarPaciente={eliminarPaciente} />}
                keyExtractor={cita => cita.id}
              />
            </>
          )}
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#03a9f4',
    flex: 1
  },
  titulo: {
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: Platform === 'ios' ? 40 : 20,
    fontSize: 24,
    fontWeight: "bold"
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  listado: {
    flex: 1,

  },
  btnForm: {
    padding: 10,
    backgroundColor: '#03a9f4',
    marginVertical: 10
},
textoForm: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
}
});

export default App;
