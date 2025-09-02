import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import "../pages/Productos.css";

import generador from "../assets/4x1-1.png";
import GHD2000 from "../assets/ghd2000.png";
import GHD3000 from "../assets/ghd3000.png";
import GHD6000 from "../assets/ghd6000.png";
import GHD8000 from "../assets/ghd8000.png";
import GHD12000 from "../assets/ghd12000.png";
import GHD10000 from "../assets/ghd10000.png";
import GHD13000 from "../assets/ghd13000.png";
import GHD13500 from "../assets/ghd13500.png";
import GHD14000 from "../assets/ghd14000.png";
import GHG2500E from "../assets/GHG2500E.png";
import GHG3000E from "../assets/GHG3000E.png";
import GHG3500E from "../assets/GHG3500E.png";
import GHG3800E from "../assets/GHG3800E.png";
import GHG6000E from "../assets/GHG6000E.png";
import GHG7000E from "../assets/GHG7000E.png";
import GHG7500E from "../assets/GHG7500E.png";
import GHG9000E from "../assets/GHG9000E.png";
import GHG10000E from "../assets/GHG10000E.png";
import GHPOWER from "../assets/gh-power.png";

const products = [
  { name: "4x1", powerKVA: "", powerValueKVA: 21, powerKW: "16.8kW", powerValueKW: 16.8, powerW: "5500W", powerValueW: 5500, type: "Monofásico", fuel: "Gasolina", frequencies: ["50", "60"], voltage: ["220V"], phase: "Monofásico", image: generador },
  { name: "GHD2000", powerKVA: "", powerValueKVA: 25, powerKW: "2.0/2.2kW", powerValueKW: 2.2, powerW: "", powerValueW: 20000, type: "Monofásico", fuel: "Diesel", frequencies: ["50", "60"], voltage: ["230/400V"], phase: "Monofásico", image: GHD2000 },
  { name: "GHD3000", powerKVA: "", powerValueKVA: 36, powerKW: "3.0/3.3", powerValueKW: 3.3, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Diesel", frequencies: ["50", "60"], voltage: ["110/240V"], phase: "Monofásico", image: GHD3000 },
  { name: "GHD6000", powerKVA: "", powerValueKVA: 36, powerKW: "5.0/5.5", powerValueKW: 5.5, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Diesel", frequencies: ["50", "60"], voltage: ["110/240V"], phase: "Monofásico", image: GHD6000 },
  { name: "GHD8000", powerKVA: "", powerValueKVA: 36, powerKW: "5.5/6.0", powerValueKW: 6.0, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Diesel", frequencies: ["50", "60"], voltage: ["230/400V"], phase: "Monofásico", image: GHD8000 },
  { name: "GHD10000", powerKVA: "", powerValueKVA: 36, powerKW: "7.0/7.7", powerValueKW: 7.7, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Diesel", frequencies: ["50", "60"], voltage: ["230/400V"], phase: "Monofásico", image: GHD10000 },
  { name: "GHD12000",  powerKVA: "", powerValueKVA: 36, powerKW: "8.0/8.8", powerValueKW: 8.8, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Diesel", frequencies: ["50", "60"], voltage: ["230/400V"], phase: "Monofásico", image: GHD12000 },
  { name: "GHD13000", powerKVA: "", powerValueKVA: 36, powerKW: "9.0/10", powerValueKW: 10, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Diesel", frequencies: ["50", "60"], voltage: ["230/400V"], phase: "Monofásico", image: GHD13000 },
  { name: "GHD13500", ppowerKVA: "", powerValueKVA: 36, powerKW: "10/11", powerValueKW: 11, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Diesel", frequencies: ["50", "60"], voltage: ["230/400V"], phase: "Monofásico", image: GHD13500 },
  { name: "GHD14000", powerKVA: "", powerValueKVA: 36, powerKW: "11/12", powerValueKW: 12, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Diesel", frequencies: ["50", "60"], voltage: ["230/400V"], phase: "Monofásico", image: GHD14000 },
  { name: "GHG2500E", powerKVA: "", powerValueKVA: 36, powerKW: "2/2.2", powerValueKW: 2.2, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Gasolina", frequencies: ["50", "60"], voltage: ["230V"], phase: "Monofásico", image: GHG2500E },
  { name: "GHG3000E", powerKVA: "", powerValueKVA: 36, powerKW: "2.5/2.8", powerValueKW: 2.8, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Gasolina", frequencies: ["50", "60"], voltage: ["230V"], phase: "Monofásico", image: GHG3000E },
  { name: "GHG3500E", powerKVA: "", powerValueKVA: 36, powerKW: "3/3.3", powerValueKW: 3.3, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Gasolina", frequencies: ["50", "60"], voltage: ["230V"], phase: "Monofásico", image: GHG3500E },
  { name: "GHG3800E", powerKVA: "", powerValueKVA: 36, powerKW: "3.2/3.6", powerValueKW: 3.6, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Gasolina", frequencies: ["50", "60"], voltage: ["230V"], phase: "Monofásico", image: GHG3800E },
  { name: "GHG6000E", powerKVA: "", powerValueKVA: 36, powerKW: "5/5.5", powerValueKW: 5.5, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Gasolina", frequencies: ["50", "60"], voltage: ["230V"], phase: "Monofásico", image: GHG6000E },
  { name: "GHG7000E", powerKVA: "", powerValueKVA: 36, powerKW: "6/6.5", powerValueKW: 6.5, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Gasolina", frequencies: ["50", "60"], voltage: ["230V"], phase: "Monofásico", image: GHG7000E },
  { name: "GHG7500E", powerKVA: "", powerValueKVA: 36, powerKW: "6/6.5", powerValueKW: 6.5, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Gasolina", frequencies: ["50", "60"], voltage: ["230V"], phase: "Monofásico", image: GHG7500E },
  { name: "GHG9000E", powerKVA: "", powerValueKVA: 36, powerKW: "7/7.5", powerValueKW: 7.5, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Gasolina", frequencies: ["50", "60"], voltage: ["230V"], phase: "Monofásico", image: GHG9000E },
  { name: "GHG10000E", powerKVA: "", powerValueKVA: 36, powerKW: "8/8.5", powerValueKW: 8.5, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Gasolina", frequencies: ["50", "60"], voltage: ["230V"], phase: "Monofásico", image: GHG10000E },
  { name: "GH10GSX", powerKVA: "", powerValueKVA: 10, powerKW: "8", powerValueKW: 8, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH380D" },
  { name: "GH11GSX", powerKVA: "", powerValueKVA: 11, powerKW: "9", powerValueKW: 9, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH385D" },
  { name: "GH14GSX", powerKVA: "", powerValueKVA: 14, powerKW: "11", powerValueKW: 11, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH480D" },
  { name: "GH18GSX", powerKVA: "", powerValueKVA: 18, powerKW: "14", powerValueKW: 14, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH485D" },
  { name: "GH21GSX", powerKVA: "", powerValueKVA: 21, powerKW: "17", powerValueKW: 17, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH490D" },
  { name: "GH22GSX", powerKVA: "", powerValueKVA: 22, powerKW: "18", powerValueKW: 18, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH490D" },
  { name: "GH26GSX", powerKVA: "", powerValueKVA: 26, powerKW: "21", powerValueKW: 21, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH490D" },
  { name: "GH28GSX", powerKVA: "", powerValueKVA: 28, powerKW: "22", powerValueKW: 22, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH495D" },
  { name: "GH28GSX2", powerKVA: "", powerValueKVA: 22, powerKW: "18", powerValueKW: 18, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH4100D" },
  { name: "GH28GSX3", powerKVA: "", powerValueKVA: 22, powerKW: "18", powerValueKW: 18, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH4040-23N" },
  { name: "GH36GSX", powerKVA: "", powerValueKVA: 36, powerKW: "29", powerValueKW: 29, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH4044-23N" },
  { name: "GH41GSX", powerKVA: "", powerValueKVA: 41, powerKW: "33", powerValueKW: 33, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH4054-23N" },
  { name: "GH44GSX", powerKVA: "", powerValueKVA: 44, powerKW: "35", powerValueKW: 35, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH4054-23N" },
  { name: "GH55GSX", powerKVA: "", powerValueKVA: 55, powerKW: "44", powerValueKW: 44, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH4068-23N" }, 
  { name: "GH69GSX", powerKVA: "", powerValueKVA: 76, powerKW: "55", powerValueKW: 69, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH4088-23T" },
  { name: "GH76GSX", powerKVA: "", powerValueKVA: 76, powerKW: "61", powerValueKW: 61, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH4092-23T" },
  { name: "GH83GSX", powerKVA: "", powerValueKVA: 83, powerKW: "66", powerValueKW: 66, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH4A3L-D" },
  { name: "GH88GSX", powerKVA: "", powerValueKVA: 88, powerKW: "70", powerValueKW: 70, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH4A3L-D" },
  { name: "GH100GSX", powerKVA: "", powerValueKVA: 100, powerKW: "80", powerValueKW: 80, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH4M3L-D" },
  { name: "GH103GSX", powerKVA: "", powerValueKVA: 103, powerKW: "83", powerValueKW: 83, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH4M3L-D" },
  { name: "GH124GSX", powerKVA: "", powerValueKVA: 124, powerKW: "99", powerValueKW: 99, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH4M3L-DA" },
  { name: "GH138GSX", powerKVA: "", powerValueKVA: 138, powerKW: "110", powerValueKW: 110, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH4M3L-D88" },
  { name: "GH165GSX", powerKVA: "", powerValueKVA: 165, powerKW: "132", powerValueKW: 132, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH6B3L-D" },
  { name: "GH179GSX", powerKVA: "", powerValueKVA: 179, powerKW: "143", powerValueKW: 143, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH6M3L-D" },
  { name: "GH198GSX", powerKVA: "", powerValueKVA: 198, powerKW: "158", powerValueKW: 158, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH6M3L-D" },
  { name: "GH206GSX", powerKVA: "", powerValueKVA: 206, powerKW: "165", powerValueKW: 165, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH6M3L-15-196A" },
  { name: "GH220GSX", powerKVA: "", powerValueKVA: 220, powerKW: "176", powerValueKW: 176, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH6M3L-15-196A" },
  { name: "GH220GSX2", powerKVA: "", powerValueKVA: 220, powerKW: "176", powerValueKW: 176, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH6H4L-D" },
  { name: "GH248GSX", powerKVA: "", powerValueKVA: 248, powerKW: "198", powerValueKW: 198, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH6S4LF-D" },
  { name: "GH275GSX", powerKVA: "", powerValueKVA: 275, powerKW: "220", powerValueKW: 220, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH6S4L-D" },
  { name: "GH303GSX", powerKVA: "", powerValueKVA: 303, powerKW: "242", powerValueKW: 242, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH6S4LF-D" },
  { name: "GH344GSX", powerKVA: "", powerValueKVA: 344, powerKW: "275", powerValueKW: 275, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH6S9L-D" },
  { name: "GH385GSX", powerKVA: "", powerValueKVA: 385, powerKW: "308", powerValueKW: 308, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH6S9L-DB" },
  { name: "GH413GSX", powerKVA: "", powerValueKVA: 413, powerKW: "330", powerValueKW: 330, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH6S9LF-D"},
  { name: "GH440GSX", powerKVA: "", powerValueKVA: 440, powerKW: "352", powerValueKW: 352, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "GH-Power", engineModel: "GH6S9LF-DA" },
  { name: "GH23CSX", powerKVA: "", powerValueKVA: 23, powerKW: "19", powerValueKW: 19, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "4B3.9-G11" },
  { name: "GH30CSX", powerKVA: "", powerValueKVA: 30, powerKW: "24", powerValueKW: 24, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "4B3.9-G1" },
  { name: "GH30CSX2", powerKVA: "", powerValueKVA: 30, powerKW: "24", powerValueKW: 24, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "4B3.9-G2" },
  { name: "GH34CSX", powerKVA: "", powerValueKVA: 34, powerKW: "28", powerValueKW: 28, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "4B3.9-G12" },
  { name: "GH44CSX", powerKVA: "", powerValueKVA: 66, powerKW: "35", powerValueKW: 35, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "4BT3.9-G1" },
  { name: "GH44CSX2", powerKVA: "", powerValueKVA: 44, powerKW: "35", powerValueKW: 35, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "4BT3.9-G2" },
  { name: "GH66CSX", powerKVA: "", powerValueKVA: 66, powerKW: "53", powerValueKW: 53, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "QSB3.9-G2" },
  { name: "GH69CSX", powerKVA: "", powerValueKVA: 69, powerKW: "55", powerValueKW: 55, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "4BTA3.9-G2" },
  { name: "GH69CSX2", powerKVA: "", powerValueKVA: 69, powerKW: "55", powerValueKW: 55, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "4BTA3.9-G11" },
  { name: "GH83CSX", powerKVA: "", powerValueKVA: 83, powerKW: "66", powerValueKW: 66, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "4BTA3.9-G11" },
  { name: "GH88CSX", powerKVA: "", powerValueKVA: 88, powerKW: "70", powerValueKW: 70, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "QSB3.9-G3" },
  { name: "GH94CSX", powerKVA: "", powerValueKVA: 94, powerKW: "75", powerValueKW: 75, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "4BTA3.9-G13" },
{ name: "GH103CSX", powerKVA: "", powerValueKVA: 103, powerKW: "83", powerValueKW: 83, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "4BTA3.9-G13" },
{ name: "GH110CSX", powerKVA: "", powerValueKVA: 110, powerKW: "88", powerValueKW: 88, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "QSB5.9-G2" },
{ name: "GH110CSX2", powerKVA: "", powerValueKVA: 110, powerKW: "88", powerValueKW: 88, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "6BT5.9-G1" },
{ name: "GH118CSX", powerKVA: "", powerValueKVA: 118, powerKW: "95", powerValueKW: 95, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "6BT5.9-G2" },
{ name: "GH124CSX", powerKVA: "", powerValueKVA: 124, powerKW: "99", powerValueKW: 99, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "6BTA5.9-G2" },
{ name: "GH132CSX", powerKVA: "", powerValueKVA: 132, powerKW: "106", powerValueKW: 106, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "6BT5.9-G2" },
{ name: "GH138CSX", powerKVA: "", powerValueKVA: 138, powerKW: "110", powerValueKW: 110, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "6BTAA5.9-G2" },
{ name: "GH138CSX2", powerKVA: "", powerValueKVA: 138, powerKW: "110", powerValueKW: 110, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "QSB5.9-G3" },
{ name: "GH151CSX", powerKVA: "", powerValueKVA: 151, powerKW: "121", powerValueKW: 121, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "6BTAA5.9-G2" },
{ name: "GH165CSX", powerKVA: "", powerValueKVA: 165, powerKW: "132", powerValueKW: 132, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "6BTAA5.9-G12" },
{ name: "GH165CSX", powerKVA: "", powerValueKVA: 165, powerKW: "132", powerValueKW: 132, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "QSB6.7-G3" },
{ name: "GH198CSX", powerKVA: "", powerValueKVA: 198, powerKW: "158", powerValueKW: 158, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "QSB6.7-G4" },
{ name: "GH198CSX", powerKVA: "", powerValueKVA: 198, powerKW: "158", powerValueKW: 158, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "QSB6.7-G4" },
{ name: "GH200CSX", powerKVA: "", powerValueKVA: 200, powerKW: "160", powerValueKW: 160, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "6CTA8.3-G1" },
{ name: "GH200CSX2", powerKVA: "", powerValueKVA: 200, powerKW: "160", powerValueKW: 160, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "6CTA8.3-G2" },
{ name: "GH220CSX", powerKVA: "", powerValueKVA: 220, powerKW: "176", powerValueKW: 176, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "6CTAA8.3-G2" },
{ name: "GH220CSX2", powerKVA: "", powerValueKVA: 220, powerKW: "176", powerValueKW: 176, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "QSL8.9-G2" },
{ name: "GH250CSX", powerKVA: "", powerValueKVA: 250, powerKW: "198", powerValueKW: 198, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "6CTAA8.3-G9" },
{ name: "GH275CSX", powerKVA: "", powerValueKVA: 275, powerKW: "220", powerValueKW: 220, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "MTA11-G2" },
{ name: "GH275CSX2", powerKVA: "", powerValueKVA: 275, powerKW: "220", powerValueKW: 220, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "6LTAA8.9-G2" },
{ name: "GH275CSX3", powerKVA: "", powerValueKVA: 275, powerKW: "220", powerValueKW: 220, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "6LTAA8.9-G3" },
{ name: "GH275CSX4", powerKVA: "", powerValueKVA: 275, powerKW: "220", powerValueKW: 220, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "QSNT-G6" },
{ name: "GH303CSX", powerKVA: "", powerValueKVA: 303, powerKW: "242", powerValueKW: 242, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "QSNT-G7" },
{ name: "GH303CSX2", powerKVA: "", powerValueKVA: 303, powerKW: "242", powerValueKW: 242, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "6LTAA9.5-G3" },
{ name: "GH344CSX2", powerKVA: "", powerValueKVA: 344, powerKW: "275", powerValueKW: 275, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "NTA855-G2" },
{ name: "GH360CSX", powerKVA: "", powerValueKVA: 360, powerKW: "286", powerValueKW: 286, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "6LTAA9.5-G1" },
{ name: "GH385CSX", powerKVA: "", powerValueKVA: 385, powerKW: "308", powerValueKW: 308, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "QSNT-G2" },
{ name: "GH400CSX", powerKVA: "", powerValueKVA: 400, powerKW: "317", powerValueKW: 317, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "QSM11-G2" },
{ name: "GH400CSX2", powerKVA: "", powerValueKVA: 400, powerKW: "317", powerValueKW: 317, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "QSZ13-G6" },
{ name: "GH426CSX", powerKVA: "", powerValueKVA: 426, powerKW: "341", powerValueKW: 341, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "6ZTAA13-G3" },
{ name: "GH440CSX", powerKVA: "", powerValueKVA: 440, powerKW: "352", powerValueKW: 352, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "QSZ13-G7" },
{ name: "GH440CSX2", powerKVA: "", powerValueKVA: 440, powerKW: "352", powerValueKW: 352, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "QSNT-G3" },
{ name: "GH481CSX", powerKVA: "", powerValueKVA: 481, powerKW: "385", powerValueKW: 385, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "6ZTAA13-G2" },
{ name: "GH500CSX", powerKVA: "", powerValueKVA: 500, powerKW: "400", powerValueKW: 400, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "6ZTAA13-G4" },
{ name: "GH500CSX2", powerKVA: "", powerValueKVA: 500, powerKW: "400", powerValueKW: 400, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "QSZ13-G2" },
{ name: "GH500CSX3", powerKVA: "", powerValueKVA: 500, powerKW: "400", powerValueKW: 400, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "QSNT-G4X" },
{ name: "GH500CSX4", powerKVA: "", powerValueKVA: 500, powerKW: "400", powerValueKW: 400, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "QSK19-G14" },
{ name: "GH500CSX5", powerKVA: "", powerValueKVA: 500, powerKW: "400", powerValueKW: 400, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "QSZ13-G5" },
{ name: "GH525CSX", powerKVA: "", powerValueKVA: 525, powerKW: "420", powerValueKW: 420, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "QSZ13-G3" },
{ name: "GH550CSX", powerKVA: "", powerValueKVA: 550, powerKW: "440", powerValueKW: 440, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "QSZ13-G10" },
{ name: "GH550CSX2", powerKVA: "", powerValueKVA: 550, powerKW: "440", powerValueKW: 440, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "QSK19-G13" },
{ name: "GH605CSX", powerKVA: "", powerValueKVA: 605, powerKW: "484", powerValueKW: 484, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "KTAA19-G5" },
{ name: "GH633CSX", powerKVA: "", powerValueKVA: 633, powerKW: "506", powerValueKW: 506, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "KTAA19-G6" },
{ name: "GH633CSX2", powerKVA: "", powerValueKVA: 633, powerKW: "506", powerValueKW: 506, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "QSK19-G12" },
{ name: "GH633CSX3", powerKVA: "", powerValueKVA: 633, powerKW: "506", powerValueKW: 506, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "KTA19-G8" },
{ name: "GH633CSX4", powerKVA: "", powerValueKVA: 633, powerKW: "506", powerValueKW: 506, type: "Trifásico", fuel: "Diesel", frequencies: ["50"], voltage: ["400V"], phase: "Trifásico", image: GHPOWER, engineBrand: "Cummins", engineModel: "QSK19-G6" },
];

function ProductGrid() {
  const [selectedFuel, setSelectedFuel] = useState("All");
  const [selectedFrequency, setSelectedFrequency] = useState("All");
  const [selectedVoltage, setSelectedVoltage] = useState("All");
  const [selectedPhase, setSelectedPhase] = useState("All");
  const [selectedPower, setSelectedPower] = useState("All");
  const [selectedPowerUnit, setSelectedPowerUnit] = useState("kVA"); 
  const [applyFilters, setApplyFilters] = useState(false);
  const [selectedEngineBrand, setSelectedEngineBrand] = useState("All");
const [selectedEngineModel, setSelectedEngineModel] = useState("All");

  const handleSearch = () => setApplyFilters(true);

  // Unique power values based on selected unit
  const powerValues = {
    kVA: [...new Set(products.map(p => p.powerValueKVA))].sort((a, b) => a - b),
    kW: [...new Set(products.map(p => p.powerValueKW))].sort((a, b) => a - b),
    W: [...new Set(products.map(p => p.powerValueW))].sort((a, b) => a - b),
  };

  const filteredProducts = products.filter((product) => {
    if (!applyFilters) return true;

    const matchesFuel = selectedFuel === "All" || product.fuel === selectedFuel;
    const matchesFrequency = selectedFrequency === "All" || product.frequencies.includes(selectedFrequency);
    const matchesVoltage = selectedVoltage === "All" || product.voltage.includes(selectedVoltage);
    const matchesPhase = selectedPhase === "All" || product.phase === selectedPhase;
    const matchesPower = selectedPower === "All" || (
      selectedPowerUnit === "kVA" ? product.powerValueKVA === parseFloat(selectedPower) :
      selectedPowerUnit === "kW" ? product.powerValueKW === parseFloat(selectedPower) :
      product.powerValueW === parseFloat(selectedPower)
      
    );
     const matchesEngineBrand = selectedEngineBrand === "All" || product.engineBrand === selectedEngineBrand;
  const matchesEngineModel = selectedEngineModel === "All" || product.engineModel === selectedEngineModel;

    return matchesFuel && matchesFrequency && matchesVoltage && matchesPhase && matchesPower && matchesEngineBrand && matchesEngineModel;
  });

  return (
    <div className="product-wrapper">
      <div className="product-container">
        <h2>GENERADORES INDUSTRIALES</h2>
        <p className="product-description">
          Especializados en motores de alta gama, generadores de combustible alternativo y diésel. Nuestros motores entran al mercado a competir gracias a su eficiencia y prestaciones de alto rendimiento.
        </p>

        {/* FILTROS */}
        <div className="filter-panel">
          <div className="filter-group">
            <span>Combustible:</span>
            <button onClick={() => setSelectedFuel("Diesel")} className={selectedFuel === "Diesel" ? "active" : ""}>Diesel</button>
            <button onClick={() => setSelectedFuel("Gas")} className={selectedFuel === "Gas" ? "active" : ""}>Gas</button>
            <button onClick={() => setSelectedFuel("Gasolina")} className={selectedFuel === "Gasolina" ? "active" : ""}>Gasolina</button>
            <button onClick={() => setSelectedFuel("All")} className={selectedFuel === "All" ? "active" : ""}>Todos</button>
          </div>

          <div className="filter-group">
            <span>Frecuencia:</span>
            <button onClick={() => setSelectedFrequency("50")} className={selectedFrequency === "50" ? "active" : ""}>50 Hz</button>
            <button onClick={() => setSelectedFrequency("60")} className={selectedFrequency === "60" ? "active" : ""}>60 Hz</button>
            <button onClick={() => setSelectedFrequency("All")} className={selectedFrequency === "All" ? "active" : ""}>Todas</button>
          </div>

          <div className="filter-group">
            <label>Voltaje:</label>
            <select value={selectedVoltage} onChange={(e) => setSelectedVoltage(e.target.value)}>
              <option value="All">Todos</option>
              <option value="220V">220V</option>
              <option value="380/220V">380/220V</option>
              <option value="400/230V">400/230V</option>
              <option value="415/240V">415/240V</option>
              <option value="230/400V">230/400V</option>
              <option value="110/240V">110/240V</option>
              <option value="230/400V">230/400V</option>
              <option value="230V">230V</option>
              <option value="400V">400V</option>
              <option value="480V">480V</option>
            </select>
          </div>

          <div className="filter-group">
            <span>Fase:</span>
            <button onClick={() => setSelectedPhase("Monofásico")} className={selectedPhase === "Monofásico" ? "active" : ""}>Monofásico</button>
            <button onClick={() => setSelectedPhase("Trifásico")} className={selectedPhase === "Trifásico" ? "active" : ""}>Trifásico</button>
            <button onClick={() => setSelectedPhase("All")} className={selectedPhase === "All" ? "active" : ""}>Todas</button>
          </div>

          <div className="filter-group">
            <label>Unidad de Potencia:</label>
            <select value={selectedPowerUnit} onChange={(e) => { setSelectedPowerUnit(e.target.value); setSelectedPower("All"); }}>
              <option value="kVA">kVA</option>
              <option value="kW">kW</option>
              <option value="W">W</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Potencia:</label>
            <select value={selectedPower} onChange={(e) => setSelectedPower(e.target.value)}>
              <option value="All">Todas</option>
              {powerValues[selectedPowerUnit].map((value) => (
                <option key={value} value={value}>{value} {selectedPowerUnit}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
  <label>Marca del Motor:</label>
  <select 
    value={selectedEngineBrand} 
    onChange={(e) => {
      setSelectedEngineBrand(e.target.value);
      setSelectedEngineModel("All"); // reset modelo al cambiar marca
    }}
  >
    <option value="All">Todas</option>
    <option value="GH-Power">GH-Power</option>
    <option value="Cummins">Cummins</option>
    <option value="Perkins">Perkins</option>
    <option value="Baudouin">Baudouin</option>
    <option value="Doosan">Doosan</option>
    <option value="Yanmar">Yanmar</option>
    <option value="Fawde">Fawde</option>
  </select>
</div>

<div className="filter-group">
  <label>Modelo del Motor:</label>
  <select 
    value={selectedEngineModel} 
    onChange={(e) => setSelectedEngineModel(e.target.value)}
  >
    <option value="All">Todos</option>
    {[...new Set(products
      .filter(p => selectedEngineBrand === "All" || p.engineBrand === selectedEngineBrand)
      .map(p => p.engineModel)
    )].map((model, idx) => (
      <option key={idx} value={model}>{model}</option>
    ))}
  </select>
</div>

          <div className="filter-group">
            <button onClick={handleSearch} className="search-button">Buscar</button>
          </div>
        </div>

        {/* PRODUCTOS */}
        <div className="product-grid">
          {filteredProducts.map((product, index) => (
            <Link to={`/productos/${product.name}`} className="product-card" key={index}>
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-power">
                ⚡ {selectedPowerUnit === "kVA" ? product.powerKVA : selectedPowerUnit === "kW" ? product.powerKW : product.powerW} - <span>{product.type}</span>
              </div>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-subtitle">GRUPOS<br /> ELECTROGENOS</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductGrid;