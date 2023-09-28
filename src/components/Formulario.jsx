import {useState, useEffect} from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'
 
const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 110%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    margin-top: 30px;
    &:hover {
        background-color: #7a7dfe;
        cursor: pointer;
    };
    @media (max-width: 992px) {
    width: 100%;
  }
`
const Formulario = ({setMonedas}) => {

    const [criptos,setCriptos] = useState([])
    const [error,setError] = useState(false)
    //Custom Hooks (Para los Select) //Como una destructuración tambien puede verse
    const [ moneda, SelectMonedas ] = useSelectMonedas("Elige tu moneda", monedas)
    const [ criptomoneda, SelectCriptoMoneda ] = useSelectMonedas("Elige tu Criptomoneda", criptos)
    //useEffect que hará consulta a la API cuando esté cargado el componente, una sola vez
    useEffect(() => {
        const consultarAPI = async () => {
            const URL = "https://min-api-v2.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
            const respuesta = await fetch(URL);
            const resultado = await respuesta.json()

            const arrayCriptos = resultado.Data.map( cripto => {
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                return objeto
            })
            setCriptos(arrayCriptos)
        }
        consultarAPI();
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        if([moneda, criptomoneda].includes("")){
            setError(true)
            return
        }

        setError(false)
        setMonedas({
            moneda,
            criptomoneda
        })
    }

  return (
    <>
    {error && <Error>Todos los campos son obligatorios</Error>}
    <form onSubmit={handleSubmit}>

        <SelectMonedas />
        <SelectCriptoMoneda />
        

        <InputSubmit 
            type="submit" 
            value="Cotizar"    
        />
    </form>
    </>
  )
}

export default Formulario