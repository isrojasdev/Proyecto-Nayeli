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
            }
            var actual = datosBDjson[this.state.posicion][1];
            var actualString = this.state.datos[this.state.posicionPelicula];
            var tituloActual = datosBDjson[this.state.posicion][0];

            this.setState({
                nombreBC:nombreBC,
                tituloActual: tituloActual,
                datosBC: datosBDjson,
                actual: actual,
                actualString: actualString
            }, () => {
                console.log(this.state);
            });
        }
    }

    tiene = () => {
        console.log('tiene');
        var tiene = this.state.tiene;
        var tieneString = this.state.tieneString;
        tieneString.push(this.state.datosGuardar[this.state.posicionPeliculaSecundaria]);
        tiene.push(this.state.actual);
        var posicionPelicula = this.state.posicionPelicula + 1;
        var posicionSecundaria = this.state.posicionPeliculaSecundaria + 1;
        this.setState({
            tiene: tiene,
            tieneString: tieneString,
            posicionPelicula: posicionPelicula,
            posicionPeliculaSecundaria: posicionSecundaria
        },() => {
            console.log('entro aqui');
            console.log(this.state);
            this.evalucacionNoTiene();
        });
    }

    noTiene = () => {
        console.log('no tiene');
        var noTiene = this.state.noTiene;
        var noTieneString = this.state.noTieneString;
        noTieneString.push(this.state.datosGuardar[this.state.posicionPeliculaSecundaria]);
        noTiene.push(this.state.actual);
        var posicion = this.state.posicion + 1;
        this.setState({
            noTiene: noTiene,
            noTieneString: noTieneString,
            posicion:posicion,
            posicionPelicula: 1
        }, () => {
            console.log('entro aqui');
            console.log(this.state);
            this.evalucacionNoTiene();
        });
    }

    evalucacionNoTiene = () => {
        console.log('****** NO TIENE ******');
        var noTiene = this.state.noTiene;
        var noTieneString = this.state.noTieneString;
        var posicion = this.state.posicion;
        var posicionSecundaria = this.state.posicionPeliculaSecundaria; 
        var candado = true;
        var datosBC = this.state.datosBC;
        if (noTiene.length === 0) {
            this.evaluacionTiene(posicion);
        } else {
            while (candado) {
                if (posicion > (datosBC.length - 1)) {
                    Swal.fire(
                        'Error!',
                        'la pelicula que busca no se encuentra',
                        'error'
                    ).then(() => {
                        window.location.replace('');
                    })
                    candado = false;
                } else {
                    for (let i = 0; i < noTiene.length; i++) {
                        switch (noTieneString[i]) {
                            case 'nombre':
                                posicionSecundaria = 0;
                                break;
                            case 'director':
                                posicionSecundaria = 1;
                                break;
                            case 'escritor':
                                posicionSecundaria = 2;
                                break;
                            case 'estrellas':
                                posicionSecundaria = 3;
                                break;
                            case 'estreno':
                                posicionSecundaria = 4;
                                break;
                            case 'clave':
                                posicionSecundaria = 5;
                                break;
                            case 'clasificacion':
                                posicionSecundaria = 6;
                                break;
                            case 'pais':
                                posicionSecundaria = 7;
                                break;
                            case 'productora':
                                posicionSecundaria = 8;
                                break;
                            case 'duracion':
                                posicionSecundaria = 9;
                                break;
                            case 'idioma':
                                posicionSecundaria = 10;
                                break;
                            case 'descripcion':
                                posicionSecundaria = 11;
                                break;
                            default:
                                break;
                        }
                        console.log(datosBC[posicion][posicionSecundaria] +'==='+ noTiene[i]);
                        if (datosBC[posicion][posicionSecundaria] === noTiene[i]) {
                            console.log('la pelicula no es valida, incrementa posicion');
                            posicion = posicion + 1;
                            /*this.setState({
                                posicion: posicion
                            }, () => {
                                console.log('posicion => ' + posicion);
                                console.log(this.state);
                            });*/
                        } else {
                            console.log('la pelicula es valida, se continua evaluando');
                            //candado = false;
                            console.log(i + '===' + (noTiene.length -1));
                            if (i === noTiene.length - 1) {
                                console.log('fin de evaluacion, no tiene');
                                candado = false;
                                this.evaluacionTiene(posicion);
                            }
                        }
                    }
                }
            }
        }
    }

    evaluacionTiene = (posicion) => {
        console.log('****** TIENE ******');
        var tiene = this.state.tiene;
        var tieneString = this.state.tieneString;
        //var posicion = this.state.posicion;
        var posicionSecundaria, posicionPeliculaSecundaria = this.state.posicionPeliculaSecundaria;
        var datosBC = this.state.datosBC;
        var candado = true;
        console.log('posicion: ' + posicion);

        var actual = this.state.datosBC[posicion][posicionPeliculaSecundaria];
        var actualString = this.state.datos[posicion];
        var tituloActual = this.state.datosBC[posicion][0];
        if (tiene.length === 0) {
            console.log('no hay valores a evaluar en tiene');
            this.setState({
                actual: actual,
                actualString: actualString,
                tituloActual: tituloActual
            }, () => {
                console.log(this.state);
            });
        } else {
            console.log('evaluando valores en tiene');
            while (candado) {
                if (posicion > (datosBC.length - 1)) {
                    Swal.fire(
                        'Error!',
                        'la pelicula que busca no se encuentra',
                        'error'
                    ).then(() => {
                        window.location.replace('');
                    })
                    candado = false;
                } else {
                    for (let i = 0; i < tiene.length; i++) {
                        switch (tieneString[i]) {
                            case 'nombre':
                                posicionSecundaria = 0;
                                break;
                            case 'director':
                                posicionSecundaria = 1;
                                break;
                            case 'escritor':
                                posicionSecundaria = 2;
                                break;
                            case 'estrellas':
                                posicionSecundaria = 3;
                                break;
                            case 'estreno':
                                posicionSecundaria = 4;
                                break;
                            case 'clave':
                                posicionSecundaria = 5;
                                break;
                            case 'clasificacion':
                                posicionSecundaria = 6;
                                break;
                            case 'pais':
                                posicionSecundaria = 7;
                                break;
                            case 'productora':
                                posicionSecundaria = 8;
                                break;
                            case 'duracion':
                                posicionSecundaria = 9;
                                break;
                            case 'idioma':
                                posicionSecundaria = 10;
                                break;
                            case 'descripcion':
                                posicionSecundaria = 11;
                                break;
                            default:
                                break;
                        }
                        console.log(datosBC[posicion][posicionSecundaria] +'==='+ tiene[i]);
                        if (datosBC[posicion][posicionSecundaria] === tiene[i]) {
                            console.log('la pelicula es valida, se continua evaluando');
                            console.log(i + '===' + (tiene.length -1));
                            if (i === tiene.length - 1) {
                                console.log('fin de evaluacion, tiene');
                                actual = this.state.datosBC[this.state.posicion][this.state.posicionPelicula];
                                actualString = this.state.datos[this.state.posicionPelicula];
                                tituloActual = this.state.datosBC[this.state.posicion][0];
                                this.setState({
                                    actual: actual,
                                    actualString: actualString,
                                    tituloActual: tituloActual
                                });
                                candado = false;
                            }
                        } else {
                            console.log('la pelicula no es valida, incrementa posicion');
                            posicion = posicion + 1;
                        }
                    }
                }
            }
        }
    }

    evaluacionFinal = () => {
        console.log('es igual final');
        var posicionPeliculaSecundaria = this.state.posicionPeliculaSecundaria;
        var actual = this.state.datosBC[this.state.posicion][posicionPeliculaSecundaria];
        var actualString = this.state.datos[posicionPeliculaSecundaria];
        posicionPeliculaSecundaria = posicionPeliculaSecundaria + 1;
        this.setState({
            actual: actual,
            actualString: actualString,
            posicionPeliculaSecundaria: posicionPeliculaSecundaria
        }, () => {
            console.log(this.state);
        });
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
                        <h2>Se esta evaluando para la pelicula de "{this.state.tituloActual}"</h2>
                        <div style={{display:'flex', alignContent:'center', alignItems:'center', flexDirection:'column', marginTop:'5%'}}>
                            <h3>Consultando {this.state.nombreBC}</h3>
                            <a className="waves-effect waves-light btn" style={{background:'#2b87ff'}} href="/">Regresar</a>
                        </div>
                        <div style={{display:'flex', alignContent:'center', alignItems:'center', flexDirection:'column'}}>
                            { this.state.tiene.map(dato => (
                                dato === this.state.actual ? (
                                    this.evaluacionFinal()
                                ) : (
                                    console.log('no es igual')
                                )
                            ))}
                            <h5>¿EL {this.state.actualString} de la pelicula es "{this.state.actual}"?</h5>
                            <a onClick={this.tiene} className="waves-effect waves-light btn" style={{background:'#2b87ff', marginTop:'15px'}}>Si</a>
                            <a onClick={this.noTiene} className="waves-effect waves-light btn" style={{background:'#2b87ff', marginTop:'15px'}}>No</a>
                        </div>
                    </div>
                </Fragment>
            );
        }
    }
}

export default App;