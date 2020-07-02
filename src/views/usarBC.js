import React, {Fragment, Component}  from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Table } from 'react-bootstrap';
import Swal from 'sweetalert2';


class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            datosBC: []
        }
    }

    eliminar = (id) => {
        const { firestore } = this.props;
        
        Swal.fire({
            title: '¿Esta seguro de eliminar este campo?',
            text: "No se podra recuperar!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#2DCD22',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    title: 'Eliminado con exito',
                    text:'El campo fue eliminado exitosamente',
                    confirmButtonColor: '#2DCD22',
                    confirmButtonText: 'Continuar',
                    icon:'success'
                })
                //eliminar frase
                firestore.delete({
                    collection: 'basesConocimiento',
                    doc: id
                })
            } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire({
                    title: 'Cancelado',
                    text: 'El campo sigue intacto :)',
                    confirmButtonColor: '#2DCD22',
                    confirmButtonText: 'Continuar',
                    icon: 'error'
                })
            }
        })
    }

    seleccionarBC = (id, datos, nombre) => {
        console.log(id);
        console.log(datos);
        console.log(nombre);
        var datosBC = datos;

        var datosString = [];

        for (let i = 0; i < datosBC.length; i++) {
            datosString.push(JSON.stringify(datosBC[i]));
        }

        localStorage.datosBC = datosString.join('*.*');
        localStorage.nombreBC = nombre;
        localStorage.idBC = id;
        this.seleccionada(nombre);
    }

    seleccionada = (nombre) => {
        const { history } = this.props;
        Swal.fire(
            'Seleccion exitosa!',
            nombre + ' ha sido seleccionado',
            'success'
        ).then(() => {
            history.push('/');
        })
    }

    render(){
        if (!this.props.basesConocimiento) {
            return (
                <Fragment>
                    <div className="container center-align" style={{marginTop:'20%', marginBottom:'20%'}}>
                        <div class="preloader-wrapper big active">
                            <div class="spinner-layer spinner-blue darken-4-only">
                                <div class="circle-clipper left">
                                    <div class="circle"></div>
                                </div>
                                <div class="gap-patch">
                                    <div class="circle"></div>
                                </div>
                                <div class="circle-clipper right">
                                    <div class="circle"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>  
                        <div id="font" style={{display:'flex', alignContent:'center', alignItems:'center', flexDirection:'column', marginTop:'5%'}}>
                            <h3>Bases de conocimiento disponibles</h3>
                            <a className="waves-effect waves-light btn" style={{background:'#2b87ff'}} href="/">Regresar</a>
                        </div>
                        <div className="container center" style={{marginTop:'50px'}}>
                            <Table striped bordered hover >
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="font">
                                    {this.props.basesConocimiento.map(dato => (
                                        <tr key={dato.id}>
                                            <td>{dato.nombreBC}</td>
                                            <td>
                                                <a href="#!" onClick={ () => this.eliminar(dato.id)}  style={{marginLeft:'5%'}}><i class="material-icons" style={{color:'#2b87ff'}}>delete</i></a>
                                                <a href="#!" onClick={ () => this.seleccionarBC(dato.id, dato.datos, dato.nombreBC)}  style={{marginLeft:'5%'}}><i class="material-icons" style={{color:'#2b87ff'}}>check</i></a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Fragment>
            );
        }
    }
}

export default compose(
    firestoreConnect(props => [ 
        {
            collection: 'basesConocimiento'
        }
    ]),
    connect(({ firestore: { ordered }}, props ) => ({
        basesConocimiento: ordered.basesConocimiento
    }))
)(App);