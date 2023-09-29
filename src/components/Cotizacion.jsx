import styled from "@emotion/styled"

const Contenedor = styled.div`
    width: 110%;
    color: white;
    font-family: "Lato", sans-serif;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-top: 30px;
    @media (max-width: 992px) {
    width: 100%;
    justify-content: space-evenly;
  }
`
const Precio = styled.p`
    font-size: 24px;
    span{
        font-weight: 700;
    }
    @media (max-width: 510px) {
    font-size: 18px;
  }
`
const Texto = styled.p`
    font-size: 18px;
    span{
        font-weight: 700;
    }
    @media (max-width: 545px) {
    font-size: 18px;
  }
`
const Imagen = styled.img`
    width: 120px;
    display: block;
    @media (max-width: 545px) {
    width: 100px;
  }
`


const Cotizacion = ({cotizacion}) => {
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = cotizacion;
    return (
    <Contenedor> {/* Buscar la imagen con la url de la página de la api ya que no la tenemos descargada */}
        {/* <Imagen 
            src={`https://cryptocompare.com/${IMAGEURL}`} 
            alt="Imagen Cripto"       
        />  */}
        <Imagen 
        src={`https://cryptocompare.com/${IMAGEURL}`} 
        alt="Imagen Cripto"  
        fetchpriority="high"
        />
        <div>            
       <Precio>El precio es de: <span>{PRICE}</span></Precio>
       <Texto>El precio más alto del día: <span>{HIGHDAY}</span></Texto>
       <Texto>El precio más bajo del día:  <span>{LOWDAY}</span></Texto>
       <Texto>Variación en las últimas 24 horas: <span>{CHANGEPCT24HOUR}</span></Texto>
       <Texto>Última Actualización: <span>{LASTUPDATE}</span></Texto>
        </div>
    </Contenedor>
  )
}

export default Cotizacion