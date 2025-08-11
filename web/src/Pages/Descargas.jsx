import React from 'react';
import "../pages/Descargas.css"
import { FaDownload } from "react-icons/fa";


const data = [
  {
    modelo: 'LK21B',
    kva: 21,
    kilovatios: 17,
    tipoMotor: 'Diésel',
    dimension: '1970 x 800 x 1075',
    descarga: 'Ficha Tecnica',
    descarga2: 'Manual de usuario',
    ficha: 'LK21B.pdf',
    manual: 'LK21B-m.pdf',
  },
  {
    modelo: 'LK25B',
    kva: 25,
    kilovatios: 20,
    tipoMotor: 'Diésel',
    dimension: '1970 x 800 x 1075',
    descarga: 'Ficha Tecnica',
    descarga2: 'Manual de usuario',
    ficha: 'LK25B.pdf',
    manual: 'LK25B-m.pdf',
  },
  {
    modelo: 'LK36B',
    kva: 36,
    kilovatios: 29,
    tipoMotor: 'Diésel',
    dimension: '2170 x 850 x 1075',
    descarga: 'Ficha Tecnica',
    descarga2: 'Manual de usuario',
    ficha: 'LK36B.pdf',
    manual: 'LK36B-m.pdf',
  },
  {
    modelo: 'LK44B',
    kva: 44,
    kilovatios: 35,
    tipoMotor: 'Diésel',
    dimension: '2170 x 850 x 1075',
    descarga: 'Ficha Tecnica',
    descarga2: 'Manual de usuario',
    ficha: 'LK44B.pdf',
    manual: 'LK44B-m.pdf',
  },
  {
    modelo: 'LK50B',
    kva: 50,
    kilovatios: 40,
    tipoMotor: 'Diésel',
    dimension: '2270 xx 960 x 1200',
    descarga: 'Ficha Tecnica',
    descarga2: 'Manual de usuario',
    ficha: 'LK50B.pdf',
    manual: 'LK50B-m.pdf',
  },
    {
    modelo: 'LK72B',
    kva: 72,
    kilovatios: 57,
    tipoMotor: 'Diésel',
    dimension: '2470 x 1010 x 1250',
    descarga: 'Ficha Tecnica',
    descarga2: 'Manual de usuario',
    ficha: 'LK72B.pdf',
    manual: 'LK72B-m.pdf',
  },
    {
    modelo: 'LK88B',
    kva: 88,
    kilovatios: 70,
    tipoMotor: 'Diésel',
    dimension: '2470 x 1010 x 1250',
    descarga: 'Ficha Tecnica',
    descarga2: 'Manual de usuario',
    ficha: 'LK88B.pdf',
    manual: 'LK88B-m.pdf',
  },
    {
    modelo: 'LK110B',
    kva: 110,
    kilovatios: 88,
    tipoMotor: 'Diésel',
    dimension: '2770 x 1080 x 1250',
    descarga: 'Ficha Tecnica',
    descarga2: 'Manual de usuario',
    ficha: 'LK110B.pdf',
    manual: 'LK110B-m.pdf',
  },
    {
    modelo: 'LK150B',
    kva: 150,
    kilovatios: 120,
    tipoMotor: 'Diésel',
    dimension: '3070 x 1080 x 1450',
    descarga: 'Ficha Tecnica',
    descarga2: 'Manual de usuario',
    ficha: 'LK150B.pdf',
    manual: 'LK150B-m.pdf',
  },
    {
    modelo: 'LK165B',
    kva: 165,
    kilovatios: 132,
    tipoMotor: 'Diésel',
    dimension: '3270 x 1130 x 1650',
    descarga: 'Ficha Tecnica',
    descarga2: 'Manual de usuario',
    ficha: 'LK165B.pdf',
    manual: 'LK165B-m.pdf',
  },
    {
    modelo: 'LK188B',
    kva: 188,
    kilovatios: 150,
    tipoMotor: 'Diésel',
    dimension: '3270 x 1130 x 1650',
    descarga: 'Ficha Tecnica',
    descarga2: 'Manual de usuario',
    ficha: 'LK188B.pdf',
    manual: 'LK188B-m.pdf',
  },
    {
    modelo: 'LK250B',
    kva: 250,
    kilovatios: 200,
    tipoMotor: 'Diésel',
    dimension: '3920 x 1180 x 1900',
    descarga: 'Ficha Tecnica',
    descarga2: 'Manual de usuario',
    ficha: 'LK250B.pdf',
    manual: 'LK250B-m.pdf',
  },
];

const Descargas = () => {
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
  <tr>
    <th>MODELO</th>
    <th className="hide-mobile">KVA</th>
    <th className="hide-mobile">Kilovatios</th>
    <th className="hide-mobile">Tipo de motor</th>
    <th className="hide-mobile">Dimensión</th>
    <th>Descarga</th>
    <th>Descarga</th>
  </tr>
</thead>
<tbody>
  {data.map((item, index) => (
    <tr key={index}>
      <td>{item.modelo}</td>
      <td className="hide-mobile">{item.kva}</td>
      <td className="hide-mobile">{item.kilovatios}</td>
      <td className="hide-mobile">{item.tipoMotor}</td>
      <td className="hide-mobile">{item.dimension}</td>
     <td className="descarga">
  <a href={`/docs/${item.ficha}`} target="_blank" rel="noreferrer">
    <FaDownload /><span className='space'>Ficha técnica</span>
  </a>
</td>
<td className="descarga">
  <a href={`/docs/${item.manual}`} target="_blank" rel="noreferrer">
    <FaDownload /><span className='space'>Manual de usuario</span>
  </a>
</td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
};

export default Descargas;
