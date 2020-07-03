import React, {Fragment, Component}  from 'react';
import ReactDOM from 'react-dom';
import Swal from 'sweetalert2';


class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            datos: ['Nombre de la pelicual', 'Director', 'Escritor', 'Estrellas', 'Estreno', 'Palabra clave', 'Clasificacion', 'Pais', 'Productora', 'Duracion', 'Idioma', 'Descripcion'],
            datosGuardar: ['nombre', 'director', 'escritor', 'estrellas', 'estreno', 'clave', 'clasificacion', 'pais', 'productora', 'duracion', 'idioma', 'descripcion'],
            datosBC: [],
            nombreBC:'',
            nombre: '',
            director: '',
            escritor: '',
            estrellas: '',
            estreno: '',
            clave: '',
            clasificacion: '',
            pais: '',
            productora: '',
            duracion: '',
            idioma: '',
            descripcion: '',
            dato: 0
        }
    }

    componentDidMount = () => {
        console.log('guardar BC');
        var datosBC = localStorage.getItem('datosBC');
        var nombreBC = localStorage.getItem('nombreBC');
        var datosBCarray, datosBDjson = [];
        if (datosBC !== null) {
            console.log(datosBC);
            datosBCarray = datosBC.split('*.*');
            console.log(datosBCarray);
            for (let i = 0; i < datosBCarray.length; i++) {
                datosBDjson.push(JSON.parse(datosBCarray[i]));
            }
            console.log(datosBDjson);
            this.setState({
                nombreBC:nombreBC,
                datosBC: datosBDjson
            }, () => {
                console.log(this.state);
                var pelicuals = <div style={{marginBottom:'5%', marginTop:'2%', display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
                    {this.state.datosBC.map(dato => (
                        <div style={{display:'flex', alignContent:'center', width:'600px', flexDirection:'column', alignItems:'center', margin:'25px', borderRadius:'54px', width:'500px', padding:'50px', border:'solid 1px #2b87ff'}}>
                            <h6><span id="font-blod" >Nombre: </span>{dato.nombre}</h6>
                            <h6><span id="font-blod" >Director: </span>{dato.director}</h6>
                            <h6><span id="font-blod" >Escritor: </span>{dato.escritor}</h6>
                            <h6><span id="font-blod" >Estrellas: </span>{dato.estrellas}</h6>
                            <h6><span id="font-blod" >Estreno: </span>{dato.estreno}</h6>
                            <h6><span id="font-blod" >Palabra clave: </span>{dato.clave}</h6>
                            <h6><span id="font-blod" >Clasificacion: </span>{dato.clasificacion}</h6>
                            <h6><span id="font-blod" >Pais: </span>{dato.pais}</h6>
                            <h6><span id="font-blod" >Productora: </span>{dato.productora}</h6>
                            <h6><span id="font-blod" >Duracion: </span>{dato.duracion}</h6>
                            <h6><span id="font-blod" >Idioma: </span>{dato.idioma}</h6>
                            <h6><span id="font-blod" >Descripcion: </span>{dato.descripcion}</h6>
                        </div>
                    ))}
                </div>;

                ReactDOM.render(pelicuals, document.getElementById('pelicuals'));
            });
        }
    }

    agregar = () => {
        const guardar = <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
            <a onClick={this.guardarPelicula} className="waves-effect waves-light btn" style={{background:'#2b87ff', margin:'10px 0 5px 0'}}>Guarda Pelicula</a>
            <a onClick={this.guardar} className="waves-effect waves-light btn" style={{background:'#2b87ff', margin:'10px 0 5px 0'}}>Guarda BC</a>
        </div>;
        const datoNumero = this.state.dato + 1;
        this.setState({
            dato: datoNumero
        }, () => {
            if (this.state.dato === 11) {
                ReactDOM.render(guardar, document.getElementById('botones'));
            }
        });
    }

    leerDato = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    guardarPelicula = () => {
        var datosBC = this.state.datosBC;

        //extraer valores del state
        const datos = {
            nombre: this.state.nombre,
            director: this.state.director,
            escritor: this.state.escritor,
            estrellas: this.state.estrellas,
            estreno: this.state.estreno,
            clave: this.state.clave,
            clasificacion: this.state.clasificacion,
            pais: this.state.pais,
            productora: this.state.productora,
            duracion: this.state.duracion,
            idioma: this.state.idioma,
            descripcion: this.state.descripcion
        };

        datosBC.push(datos);

        this.setState({
            datosBC: datosBC,
            nombre: '',
            director: '',
            escritor: '',
            estrellas: '',
            estreno: '',
            clave: '',
            clasificacion: '',
            pais: '',
            productora: '',
            duracion: '',
            idioma: '',
            descripcion: '',
            dato: 0
        }, () => {
            console.log(this.state);
            const guardar = <a onClick={this.agregar} className="waves-effect waves-light btn" style={{background:'#2b87ff', margin:'10px 0 5px 0'}}>Agregar Objeto</a>;
            var pelicuals = <div style={{marginBottom:'5%', marginTop:'2%', display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
                {this.state.datosBC.map(dato => (
                    <div style={{display:'flex', alignContent:'center', width:'600px', flexDirection:'column', alignItems:'center', margin:'25px', borderRadius:'54px', width:'500px', padding:'50px', border:'solid 1px #2b87ff'}}>
                        <h6><span id="font-blod" >Nombre: </span>{dato.nombre}</h6>
                        <h6><span id="font-blod" >Director: </span>{dato.director}</h6>
                        <h6><span id="font-blod" >Escritor: </span>{dato.escritor}</h6>
                        <h6><span id="font-blod" >Estrellas: </span>{dato.estrellas}</h6>
                        <h6><span id="font-blod" >Estreno: </span>{dato.estreno}</h6>
                        <h6><span id="font-blod" >Palabra clave: </span>{dato.clave}</h6>
                        <h6><span id="font-blod" >Clasificacion: </span>{dato.clasificacion}</h6>
                        <h6><span id="font-blod" >Pais: </span>{dato.pais}</h6>
                        <h6><span id="font-blod" >Productora: </span>{dato.productora}</h6>
                        <h6><span id="font-blod" >Duracion: </span>{dato.duracion}</h6>
                        <h6><span id="font-blod" >Idioma: </span>{dato.idioma}</h6>
                        <h6><span id="font-blod" >Descripcion: </span>{dato.descripcion}</h6>
                    </div>
                ))}
            </div>;

            ReactDOM.render(guardar, document.getElementById('botones'));
            ReactDOM.render(pelicuals, document.getElementById('pelicuals'));
        });
    }

    guardar = () => {
        console.log('guardar en database');
        var datosBC = this.state.datosBC;
        
        //extraer valores del state
        const datos = {
            nombre: this.state.nombre,
            director: this.state.director,
            escritor: this.state.escritor,
            estrellas: this.state.estrellas,
            estreno: this.state.estreno,
            clave: this.state.clave,
            clasificacion: this.state.clasificacion,
            pais: this.state.pais,
            productora: this.state.productora,
            duracion: this.state.duracion,
            idioma: this.state.idioma,
            descripcion: this.state.descripcion
        };

        datosBC.push(datos);

        console.log(datosBC);
        var datosString = [];

        for (let i = 0; i < datosBC.length; i++) {
            datosString.push(JSON.stringify(datosBC[i]));
        }

        localStorage.datosBC = datosString.join('*.*');
        localStorage.nombreBC = this.state.nombreBC;
        this.agregado();


    }

    agregado = () => {
        const { history } = this.props;
        Swal.fire(
            'Inserción exitosa!',
            'Campo agregado correctamente',
            'success'
        )
        history.push('/');
    }

    render(){
        return (
            <Fragment>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>    
                        <div id="font" style={{display:'flex', alignContent:'center', alignItems:'center', flexDirection:'column', marginTop:'5%'}}>
                            <h3>Insrtar elemento a BC</h3>
                            <a className="waves-effect waves-light btn" style={{background:'#2b87ff'}} href="/">Regresar</a>
                            <div style={{display:'flex', alignContent:'center', flexDirection:'column', alignItems:'center', marginTop:'2%', borderRadius:'54px', padding:'50px', border:'solid 1px #2b87ff'}}>

                                <div className="nombreBC" id="nombreBC" style={{marginTop:'30px'}}>
                                    <label for='nombreBC'>Nombre de la BC</label>
                                    <input onChange={this.leerDato} defaultValue={this.state.nombreBC} required name='nombreBC' id='nombreBC' type="text"/>
                                </div>

                                <div className="nuevoObjeto" id="nuevoObjeto" style={{marginTop:'10px'}}>
                                    <label for={this.state.datosGuardar[this.state.dato]}>{this.state.datos[this.state.dato]}</label>
                                    <input onChange={this.leerDato} required name={this.state.datosGuardar[this.state.dato]} id={this.state.datosGuardar[this.state.dato]} type="text"/>
                                </div>

                                <div id="botones">
                                    <a onClick={this.agregar} className="waves-effect waves-light btn" style={{background:'#2b87ff', margin:'10px 0 5px 0'}}>Agregar Objeto</a>
                                </div>

                            </div>
                        </div>

                        <div  id="font" style={{display:'flex', alignContent:'center', alignItems:'center', flexDirection:'column', marginTop:'5%', marginBottom:'5%'}}>
                            <h3>Datos de la pelicula:</h3>
                            <div style={{display:'flex', alignContent:'center', flexDirection:'column', alignItems:'center', marginTop:'2%', borderRadius:'54px', width:'500px', padding:'50px', border:'solid 1px #2b87ff'}}>
                                <h6><span id="font-blod" >Nombre: </span>{this.state.nombre}</h6>
                                <h6><span id="font-blod" >Director: </span>{this.state.director}</h6>
                                <h6><span id="font-blod" >Escritor: </span>{this.state.escritor}</h6>
                                <h6><span id="font-blod" >Estrellas: </span>{this.state.estrellas}</h6>
                                <h6><span id="font-blod" >Estreno: </span>{this.state.estreno}</h6>
                                <h6><span id="font-blod" >Palabra clave: </span>{this.state.clave}</h6>
                                <h6><span id="font-blod" >Clasificacion: </span>{this.state.clasificacion}</h6>
                                <h6><span id="font-blod" >Pais: </span>{this.state.pais}</h6>
                                <h6><span id="font-blod" >Productora: </span>{this.state.productora}</h6>
                                <h6><span id="font-blod" >Duracion: </span>{this.state.duracion}</h6>
                                <h6><span id="font-blod" >Idioma: </span>{this.state.idioma}</h6>
                                <h6><span id="font-blod" >Descripcion: </span>{this.state.descripcion}</h6>
                            </div>
                        </div>
                    </div>

                    <div id="pelicuals">
                        
                    </div>

                </div>
            </Fragment>
        );
    }
}


export default App;