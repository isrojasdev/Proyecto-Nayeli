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
            datos: ['Nombre', 'Director', 'Escritor', 'Estrellas', 'Estreno', 'Palabra clave', 'Clasificacion', 'Pais', 'Productora', 'Duracion', 'Idioma', 'Descripcion'],
            datosGuardar: ['nombre', 'director', 'escritor', 'estrellas', 'estreno', 'clave', 'clasificacion', 'pais', 'productora', 'duracion', 'idioma', 'descripcion'],
            datosBC: [],
            posicion: 0,
            posicionPelicula: 1,
            posicionPeliculaSecundaria: 1,
            tiene: [],
            tieneString: [],
            noTiene: [],
            noTieneString: [],
            actual: '',
            actualString: '',
        }
    }

    componentDidMount = () => {
        var datosBC = localStorage.getItem('datosBC');
        var nombreBC = localStorage.getItem('nombreBC');
        var datosBCarray, datosBDjson = [], datojson = [];
        if (datosBC === null) {
            this.error();
        } else {
            datosBCarray = datosBC.split('*.*');
            for (let i = 0; i < datosBCarray.length; i++) {
                var jsonDatos = JSON.parse(datosBCarray[i]);
                for (const dato in jsonDatos) {
                    if (jsonDatos.hasOwnProperty(dato)) {
                        switch (dato) {
                            case 'nombre':
                                datojson[0] = jsonDatos[dato];
                                break;
                            case 'director':
                                datojson[1] = jsonDatos[dato];
                                break;
                            case 'escritor':
                                datojson[2] = jsonDatos[dato];
                                break;
                            case 'estrellas':
                                datojson[3] = jsonDatos[dato];
                                break;
                            case 'estreno':
                                datojson[4] = jsonDatos[dato];
                                break;
                            case 'clave':
                                datojson[5] = jsonDatos[dato];
                                break;
                            case 'clasificacion':
                                datojson[6] = jsonDatos[dato];
                                break;
                            case 'pais':
                                datojson[7] = jsonDatos[dato];
                                break;
                            case 'productora':
                                datojson[8] = jsonDatos[dato];
                                break;
                            case 'duracion':
                                datojson[9] = jsonDatos[dato];
                                break;
                            case 'idioma':
                                datojson[10] = jsonDatos[dato];
                                break;
                            case 'descripcion':
                                datojson[11] = jsonDatos[dato];
                                break;
                            default:
                                break;
                        }
                    }
                }
                datosBDjson.push(datojson);
                datojson = [];
                if (i === (datosBCarray.length - 1)) {
        
                    this.setState({
                        titulo: datosBDjson[this.props.match.params.posicion][0],
                        director: datosBDjson[this.props.match.params.posicion][1],
                        escritor: datosBDjson[this.props.match.params.posicion][2],
                        estrellas: datosBDjson[this.props.match.params.posicion][3],
                        estreno: datosBDjson[this.props.match.params.posicion][4],
                        clave: datosBDjson[this.props.match.params.posicion][5],
                        clasificacion: datosBDjson[this.props.match.params.posicion][6],
                        pais: datosBDjson[this.props.match.params.posicion][7],
                        productora: datosBDjson[this.props.match.params.posicion][8],
                        duracion: datosBDjson[this.props.match.params.posicion][9],
                        idioma: datosBDjson[this.props.match.params.posicion][10],
                        descripcion: datosBDjson[this.props.match.params.posicion][11],
                        datosBC: datosBDjson
                    }, () => {
                        console.log(this.state);
                        console.log(this.props);
                        console.log(this.state.datosBC[this.props.match.params.posicion][0]);
                    });
                }
            }
        }
    }


    render(){
        if (!this.state.datosBC) {
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
                    <div id="font" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                        <h2>La pelicula ganadora es: "{this.state.titulo}"</h2>

                        <h4>Director: "{this.state.titulo}"</h4>
                        <h4>Escritor: "{this.state.escritor}"</h4>
                        <h4>Estrellas: "{this.state.estrellas}"</h4>
                        <h4>Estreno: "{this.state.estreno}"</h4>
                        <h4>Clave: "{this.state.clave}"</h4>
                        <h4>Clasificacion: "{this.state.clasificacion}"</h4>
                        <h4>Pais: "{this.state.pais}"</h4>
                        <h4>Productora: "{this.state.productora}"</h4>
                        <h4>Duracion: "{this.state.duracion}"</h4>
                        <h4>Idioma: "{this.state.idioma}"</h4>
                        <h4>Descripcion: "{this.state.descripcion}"</h4>
                    </div>
                    <div style={{display:'flex', alignContent:'center', alignItems:'center', flexDirection:'column'}}>
                            <a href="/" className="waves-effect waves-light btn" style={{background:'#2b87ff', marginTop:'15px'}}>Regresar</a>
                        </div>
                </Fragment>
            );
        }
    }
}

export default App;