import React, {Fragment, Component}  from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import Swal from 'sweetalert2';

class App extends Component {

  constructor(props){
      super(props);
    this.state = {
      nombreBC: ''
    }
  }

  componentDidMount = () => {
    var nombreBC = localStorage.getItem('nombreBC');

    if (nombreBC !== null) {
      this.setState({
        nombreBC: nombreBC
      });
    }
  }

  guardarBC = () => {
    console.log('guardar BC');
    //extraer firestor de props
    const { firestore } = this.props;

    var datosBC = localStorage.getItem('datosBC');
    var nombreBC = localStorage.getItem('nombreBC');
    var idBC = localStorage.getItem('idBC');
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
      if (idBC === null) {
    
        //guardado en la base de datos
        firestore.add({ collection: 'basesConocimiento' }, {
            nombreBC: nombreBC,
            datos: datosBDjson
        }).then((datos) => {
          console.log(datos.id);
          localStorage.idBC = datos.id;
          this.agregado();
        });
      } else {
        console.log(idBC);
        
        //actualizacion en la base de datos
        firestore.update({
            collection: 'basesConocimiento',
            doc: idBC
        }, {
          nombreBC: nombreBC,
          datos: datosBDjson
        }).then(() => this.editado());
      }
    }
  }

  agregado = () => {
    const { history } = this.props;
    Swal.fire(
        'Inserción exitosa!',
        'BC guardada correctamente',
        'success'
    )
    history.push('/');
  }

  editado = () => {
    const { history } = this.props;
    Swal.fire(
        'Actualización exitosa!',
        'BC guardada correctamente',
        'success'
    )
    history.push('/');
  }

  error = () => {
    const { history } = this.props;
    Swal.fire(
        'Error!',
        'No hay BC seleccionada o creada',
        'error'
    )
    history.push('/');
  }

  empezar = () => {
    var datosBC = localStorage.getItem('datosBC');
    if (datosBC === null) {
      Swal.fire(
        'Ya estas listo!',
        'Ya estas listo para la nueva BC',
        'success'
      )
    } else {
      localStorage.clear();
      Swal.fire(
        'Listo!',
        'Ya se puede agregar nueva BC',
        'success'
      )
    }
  }

  render(){
      return (
        <Fragment>
          <div  id="font" style={{display:'flex', alignContent:'center', alignItems:'center', flexDirection:'column', marginTop:'3%'}}>
            <h3 style={{fontWeight:'bold'}}>Sistema Experto Recomendación de Peliculas</h3>
            <h3 style={{margin:'0 0 0 50px'}}>{this.state.nombreBC}</h3>
            <div style={{display:'flex', alignContent:'center', flexDirection:'column', alignItems:'center', marginTop:'2%', borderRadius:'54px', height:'800px', width:'500px', border:'solid 1px #2b87ff'}}>
                <h4 style={{marginTop:'17%'}}>1. Introducir pelicula a la BC</h4>
                <a className="waves-effect waves-light btn" href="/introducir-bc" style={{background:'#2b87ff'}}>Introducir</a>
                <h4>2. Consultar al SE</h4>
                <a className="waves-effect waves-light btn" href="/consultar-bc" style={{background:'#2b87ff'}}>Consultar</a>
                <h4>3. Guardar la BC</h4>
                <a className="waves-effect waves-light btn" onClick={this.guardarBC} style={{background:'#2b87ff'}}>Guardar</a>
                <h4>4. Usar una BC existente</h4>
                <a className="waves-effect waves-light btn" href="/usar-bc" style={{background:'#2b87ff'}}>Usar</a>
                <h4>5. Mostrar BC</h4>
                <a className="waves-effect waves-light btn" href="/mostrar-bc" style={{background:'#2b87ff'}}>Mostrar</a>
                <h4>6. Empezar BC</h4>
                <a className="waves-effect waves-light btn" onClick={this.empezar} style={{background:'#2b87ff'}}>Empezar</a>
            </div>
          </div>
        </Fragment>
      );
    }
}

export default firestoreConnect() (App);