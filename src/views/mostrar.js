import React, {Fragment, Component}  from 'react';
import ReactDOM from 'react-dom';
import Swal from 'sweetalert2';


class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            datosBC: []
        }
    }

    componentDidMount = () => {
        console.log('guardar BC');
        var datosBC = localStorage.getItem('datosBC');
        var nombreBC = localStorage.getItem('nombreBC');
        var datosBCarray, datosBDjson = [];
        if (datosBC === null) {
            this.error();
        } else {
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

    error = () => {
        const { history } = this.props;
        Swal.fire(
            'Error!',
            'No hay BC seleccionada o creada',
            'error'
        ).then(() => {
            history.push('/');
        })
    }

    render(){
        return (
            <Fragment>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>    
                        <div id="font" style={{display:'flex', alignContent:'center', alignItems:'center', flexDirection:'column', marginTop:'5%'}}>
                            <h3>{this.state.nombreBC}</h3>
                            <a className="waves-effect waves-light btn" style={{background:'#2b87ff'}} href="/">Regresar</a>
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