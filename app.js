const PRICE = 0.0349;

const REF = 69;

let SIZE = 39;

// INIT

window.onload = function(){

  current.value = localStorage.c || 40;

  target.value = localStorage.t || 80;

  update();

};

// UI update

function update(){

  cval.innerText = current.value;

  tval.innerText = target.value;

}

current.oninput = update;

target.oninput = update;

// presets

function preset(v){

  target.value = v;

  update();

}

// vehicle logic

function setVehicle(){

  const v = vehicle.value;

  if(v === "i3") SIZE = 39;

  if(v === "model3") SIZE = 60;

  if(v === "ev6") SIZE = 77;

  if(v === "custom"){

    customBox.style.display = "block";

  } else {

    customBox.style.display = "none";

  }

  update();

}

// custom battery

customSize.oninput = function(){

  if(vehicle.value === "custom"){

    SIZE = +customSize.value || 0;

  }

};

// main calculation

function run(){

  localStorage.c = current.value;

  localStorage.t = target.value;

  const c = +current.value;

  const t = +target.value;

  if(t <= c || SIZE <= 0){

    out.innerText = "Invalid input";

    return;

  }

  const kWh = (t - c) / 100 * SIZE;

  const chargerPct = (kWh / REF) * 100;

  const cost = kWh * PRICE;

  bar.style.width = (t - c) + "%";

  out.innerHTML =

    "Vehicle: " + vehicle.value + "<br>" +

    "Battery: " + SIZE + " kWh<br><br>" +

    "Energy needed: " + kWh.toFixed(2) + " kWh<br>" +

    "Charger load: " + Math.ceil(chargerPct) + "%<br>" +

    "Estimated cost: £" + cost.toFixed(2);

}

// service worker

if("serviceWorker" in navigator){

  navigator.serviceWorker.register("sw.js");

}
