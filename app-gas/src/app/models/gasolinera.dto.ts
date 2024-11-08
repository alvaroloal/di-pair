export class Gasolinera {

    constructor(
    public CP /*C.P. */: string,
    public Direccion: string,
    public Horario: string,
    public Latitud: string,
    public Localidad: string,
    public Longitud /*(WGS84)*/: string,
    public Municipio: string,
    public PrecioBiodiesel: string,
    public PrecioBioetanol: string,
    public PrecioGasNaturalComprimido: string,
    public PrecioGasNaturalLicuado: string,
    public PrecioGaseslicuadosdelpetróleo: string,
    public PrecioGasoleoA: string,
    public PrecioGasoleoB: string,
    public PrecioGasoleoPremium: string,
    public PrecioGasolina95E10: string,
    public PrecioGasolina95E5: string,
    public PrecioGasolina95E5Premium: string,
    public PrecioGasolina98E10: string,
    public PrecioGasolina98E5: string,
    public PrecioHidrogen: string,
    public Provincia: string,
    public Remision: string,
    public Rotulo: string,
    public IDEESS: string,
    ){}
  }

  export interface GasolineraResponse {
    ListaEESSPrecio: Gasolinera[];
  }