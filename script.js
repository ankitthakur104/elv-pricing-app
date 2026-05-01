const params = [
["Front Bumper",6],
["Rear Bumper",6],
["Front Side",8],
["Left Side",12],
["Right Side",12],
["Back Side",8],
["Interior",8],
["Running Left",10],
["Running Right",10],
["Front Light",10],
["Rear Light",10],
["Tyre",10]
];

let container = document.getElementById("ratings");

params.forEach((p,i)=>{
let div = document.createElement("div");
div.innerHTML = `
<label>${p[0]}</label>
<select id="r${i}">
${[1,2,3,4,5,6,7,8,9,10].map(n=>`<option>${n}</option>`)}
</select>`;
container.appendChild(div);
});

function calculate(){

let mv = parseFloat(document.getElementById("mv").value);

let total = 0;

params.forEach((p,i)=>{
let val = document.getElementById("r"+i).value;
total += (val/10)*p[1];
});

document.getElementById("condition").innerText = total.toFixed(2);

let adjusted = mv;

if(total < 85){
adjusted = mv * (1 - ((85-total)/100));
}

// ENGINE
if(document.getElementById("engine").value === "Not Working"){
adjusted -= 0.2 * mv;
}

// ALLOY
if(document.getElementById("alloy").value === "Yes"){
adjusted += 0.08 * mv;
}

// BATTERY
if(document.getElementById("battery").value === "No"){
adjusted -= 1000;
}

// SPARE
if(document.getElementById("spare").value === "No"){
adjusted -= 700;
}

// MUSIC
if(document.getElementById("music").value === "No"){
adjusted -= 500;
}

// CNG
if(document.getElementById("cng").value === "Yes"){
adjusted += 1500;
}

document.getElementById("final").innerText = Math.round(adjusted);
}

