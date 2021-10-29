import React,{Component, useState, useEffect} from 'react';
import './App.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
//import {makeStyles} from '@material-ui/core/styles';
//import MaterialTable from 'material-table';


function App(){
  const url="https://localhost:44314/api/clientes"
  const[data, setData]=useState([]);
  const[modalInsertar, setModalInsertar]=useState(false);
  const[modalEditar, setModalEditar]=useState(false);
  const[modalEliminar, setModalEliminar]=useState(false);
  const[gestorSeleccionado, setGestorSeleccionado]=useState({
    código: ' ',
    nombre: ' ',
    teléfono:' ',
    email:' '
  })
  
  const handleChange=e=>{
    const {name, value}=e.target;
    setGestorSeleccionado({
      ...gestorSeleccionado,
      [name]:value
    });
    console.log(gestorSeleccionado);
  }

  const abrircerrarModal=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrircerrarEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrircerrarEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }
  
  const peticionGet=async()=>{
    await axios.get(url)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }


  const peticionPost=async()=>{
    delete gestorSeleccionado.código;
    gestorSeleccionado.teléfono=parseInt(gestorSeleccionado.teléfono);
    await axios.post(url,gestorSeleccionado)
    .then(response=>{
      setData(data.concat(response.data));
      abrircerrarModal();
    }) .catch(error=>{
      console.log(error);
    })
  }

  const peticionPut=async()=>{
    gestorSeleccionado.teléfono=parseInt(gestorSeleccionado.teléfono);
    await axios.put(url+"/"+gestorSeleccionado.código, gestorSeleccionado)
    .then(response=>{
      var respuesta=response.data;
      var dataAuxiliar=data;
      dataAuxiliar.map(gestor=>{
        if(gestor.código===gestorSeleccionado.código){
          gestor.nombre=respuesta.nombre;
          gestor.teléfono=respuesta.teléfono;
          gestor.email=respuesta.email;
        }
      });
      abrircerrarEditar();
    }) .catch(error=>{
      console.log(error);
    })
  }



  const peticionDelete=async()=>{
    await axios.delete(url+"/"+gestorSeleccionado.código)
    .then(response=>{
      setData(data.filter(gestor=>gestor.código!==response.data));
      abrircerrarEliminar();
    }) .catch(error=>{
      console.log(error);
    })
  }

  const seleccionarGestor=(gestor, caso)=>{
    setGestorSeleccionado(gestor);
    (caso==="Editar")?
    abrircerrarEditar(): abrircerrarEliminar();
  }

  useEffect(()=>{
    peticionGet();
  },[])


  return (
    <div className="App" style={{
      alignContent:'center'
    }}>
      <br></br>
      <button onClick={()=>abrircerrarModal()} className= "btn btn-success" style={{display:'flex', alignItems:'left', justifyContent:'left'}}>Nuevo Cliente</button>
      <br></br>
      <br></br>
      <br></br>
      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th>Código</th>
            <br></br>
            <br></br>
            <th>Nombre</th>
            <br></br>
            <th>Teléfono</th>
            <br></br>
            <br></br>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(gestor=>(
            <tr key={gestor.código}>
              <td>{gestor.código}</td>
              <br></br>
              <td>{gestor.nombre}</td>
              <br></br>
              <td>{gestor.teléfono}</td>
              <br></br>
              <td>{gestor.email}</td>
              <td>
                <button className="btn btn-primary" onClick={()=>seleccionarGestor(gestor, "Editar")}>Editar</button>{" "}
                <button className="btn btn-danger" onClick={()=>seleccionarGestor(gestor, "Eliminar")}>Eliminar</button>
              </td>
              </tr>
          ))}
        </tbody>

      </table>
      <Modal isOpen={modalInsertar}>
      <ModalHeader>Insertar Nuevo Cliente</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Nombre:</label>
          <br></br>
          <input type="text" className="form-control"  name="nombre" onChange={handleChange}/>
          <br></br>
          <label>Teléfono:</label>
          <br></br>
          <input type="text" className="form-control"  name="teléfono" onChange={handleChange}/>
          <br></br>
          <label>Email:</label>
          <br></br>
          <input type="text" className="form-control"  name="email" onChange={handleChange}/>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{" "}
        <button className="btn btn-danger" onClick={()=>abrircerrarModal()}>Cancelar</button>
      </ModalFooter>
      </Modal>


      <Modal isOpen={modalEditar}>
      <ModalHeader> Editar Cliente</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Código:</label>
          <br></br>
          <input type="text" className="form-control"  readOnly value={gestorSeleccionado && gestorSeleccionado.código}/>
          <label>Nombre:</label>
          <br></br>
          <input type="text" className="form-control"  name="nombre" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.nombre}/>
          <br></br>
          <label>Teléfono:</label>
          <br></br>
          <input type="text" className="form-control"  name="teléfono" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.teléfono}/>
          <br></br>
          <label>Email:</label>
          <br></br>
          <input type="text" className="form-control"  name="email" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.email}/>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button>{" "}
        <button className="btn btn-danger" onClick={()=>abrircerrarEditar()}>Cancelar</button>
      </ModalFooter>
      </Modal> 

      <Modal isOpen={modalEliminar}>
      <ModalBody>
      ¿Estas seguro que deseas eliminar los datos del cliente {gestorSeleccionado && gestorSeleccionado.nombre}?
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-danger" onClick={()=>peticionDelete()}>Sí</button>{" "}
        <button className="btn btn-secondary" onClick={()=>abrircerrarEliminar()}>No</button>
      </ModalFooter>
      </Modal>  
    </div>
  );
}

export default App;
