import { useState,useEffect } from 'react'
import styled from '@emotion/styled'
import Formulario from './components/Formulario'
import Cotizacion from './components/Cotizacion'
import Spinner from './components/Spinner'
import ImagenCripto from './img/imagen-criptos.png' 

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2,1fr);
    column-gap: 2rem;
  }
`
const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;  
`
const Heading = styled.h1`
  width: 110%;
  font-family: "Lato", sans-serif;
  color: white;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;
  //Para crear la linea debajo del texto
  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
  @media (max-width: 992px) {
    width: 100%;
  }
`

function App() {
  //State que tendra un objeto con la cripto y tambien la moneda
  const [monedas, setMonedas] = useState({})
  //State que tendra un objeto con la info de la moneda cotizada
  const [cotizacion, setCotizacion] = useState({})
  //State para el Spinner
  const [cargando,setCargando] = useState(false)
  //useEffect que escuche por los cambios en monedas
  useEffect(() => {
    if(Object.keys(monedas).length>0) {//Para prevenir la primera ejecución
    const cotizarCripto = async () => {
      setCargando(true)
      setCotizacion({}) //Para que no se quede la cotización anterior al cargar la siguiente

      const {moneda, criptomoneda} = monedas
        const URL = `https://min-api-v2.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

        const respuesta = await fetch(URL)
        const resultado = await respuesta.json()
        //Una sintaxis diferente para hacer que en el objeto resultado.display busque una propiedad que tenga el mismo nombre que la criptomoneda y luego que busque una con el mismo nombre de la moneda
        setCotizacion(resultado.DISPLAY[criptomoneda][moneda])
      setCargando(false)
    }
    cotizarCripto()
    }
  }, [monedas])
  

  return (
    <Contenedor>
      <Imagen 
        src={ImagenCripto}
        alt='Imagenes Criptomonedas'
      />
      <div>
       <Heading>Cotiza Criptomonedas al instante</Heading>
       <Formulario
        setMonedas={setMonedas}
       />
       { cargando && <Spinner />}
       { cotizacion.PRICE &&<Cotizacion cotizacion={cotizacion}/> }
      </div>
    </Contenedor>
  )
}

export default App
