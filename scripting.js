const urlParams = new URLSearchParams(window.location.search);
const rows = parseInt(urlParams.get('row'));
const cols = parseInt(urlParams.get('col'));

const minDegree=-1;
const maxDegree=4;


let content = document.getElementById("container");
let valueCell;
let grid = [];
grid = createGrid(); 
let carPosition = {
  row:0,
  col:0
}

let cell = {
  // will have a value 
}
let robot =  {
  battery : 100,
};

class sqaure{

  constructor(father = null, position=null ) {
       this.father = father;
       this.position = position;
       this.g=0;
       this.h=0;
       this.f=0;
  }

  equaling(other){
    return this.position[0] === other.position[0] && this.position[1] === other.position[1];
  }
}



function getRandomDegree(minDegree, maxDegree) {
  return Math.floor(Math.random() * (maxDegree - minDegree) + minDegree);
}

function createGrid() {
  const containerSize = 700; // size in px
  const cellWidth = Math.floor(containerSize / cols);
  const cellHeight = Math.floor(containerSize / rows);
  
let gridArray = [];
 for(let i=0;i<rows ;i++){
  const row = document.createElement('div');
  row.classList.add('grid-row');

  let rowArray = [];


     for(let j=0;j<cols;j++){

        const cell = document.createElement('div');

        cell.value=getRandomDegree(minDegree,maxDegree); // or I can give it a table of giving ones one by one 

        const inside = document.createElement('div');
        inside.classList.add('inside-grid');
        inside.style.width = `${cellWidth - 10}px`;  // smaller than cell
        inside.style.height = `${cellHeight - 10}px`;
  
        cell.classList.add('grid-cell');
        cell.id = `${i}${j}`;
  
        // Set cell size dynamically
        cell.style.width = `${cellWidth}px`;
        cell.style.height = `${cellHeight}px`;


        cell.appendChild(inside);
        row.appendChild(cell);

        rowArray.push(cell);
    }

   gridArray.push(rowArray);
   content.appendChild(row);
  
 }
 return gridArray;
}



function drawMap() {
  for(let i=0;i<rows;i++) {
    for(let j=0;j<cols;j++) {
      if(grid[i][j].value===-1){
        grid[i][j].style.backgroundImage = 'url("images/wall.png")'; /// a wall 
        grid[i][j].style.backgroundSize='cover'; /* You can use other values like 'contain' */
        grid[i][j].style.backgroundRepeat='no-repeat';
      }
      else if(grid[i][j].value==0){
        grid[i][j].energyTaken = 5;
      }
      else if(grid[i][j].value==1){
        grid[i][j].style.backgroundImage = 'url("images/grass3.png")';
        grid[i][j].style.backgroundSize='cover'; 
        grid[i][j].style.backgroundRepeat='no-repeat';
        grid[i][j].energyTaken = 10;

      }
      else if(grid[i][j].value==2){
        grid[i][j].style.backgroundImage = 'url("images/lake2.png")';
        grid[i][j].style.backgroundSize='cover'; 
        grid[i][j].style.backgroundRepeat='no-repeat';
        grid[i][j].energyTaken = 15;

      }
      else if(grid[i][j].value==3){
        grid[i][j].style.backgroundImage = 'url("images/sand2.png")';
        grid[i][j].style.backgroundSize='cover';
        grid[i][j].style.backgroundRepeat='no-repeat';
        grid[i][j].energyTaken = 20;

      } 
    }
  }
}
drawMap();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
const minnbr=0
const maxnbr=Math.max(rows-1,cols-1);
let startRow = {
  value:getRandomInt(minnbr,maxnbr)
}
let startCol = {
  value:getRandomInt(minnbr,maxnbr)
}

let endRow = {
  value:getRandomInt(minnbr,maxnbr)
}
let endCol = {
  value:getRandomInt(minnbr,maxnbr)
}

function checkingStartIndexes(startRow,startCol){
  while(grid[startRow.value][startCol.value].value!==0){
    startRow.value=getRandomInt(minnbr,maxnbr);
    startCol.value=getRandomInt(minnbr,maxnbr);
  } 
}

function checkingEndIndexes(endRow,endCol){
  while(grid[endRow.value][endCol.value].value!==0){
    endRow.value=getRandomInt(minnbr,maxnbr);
    endCol.value=getRandomInt(minnbr,maxnbr);
  } 
}

checkingStartIndexes(startRow,startCol);
checkingEndIndexes(endRow,endCol);
let flag = document.createElement('div');
flag.classList.add('flag');
flag.style.backgroundImage = 'url("images/startPosition.png")';
flag.style.backgroundSize='cover'; 
flag.style.backgroundRepeat='no-repeat';

let flag2 = document.createElement('div');
flag2.classList.add('flag');
flag2.style.backgroundImage = 'url("images/finish.png")';
flag2.style.backgroundSize='cover'; 
flag2.style.backgroundRepeat='no-repeat';

grid[startRow.value][startCol.value].appendChild(flag);
grid[endRow.value][endCol.value].appendChild(flag2);


console.log(`from : (${startRow.value},${startCol.value}) to : (${endRow.value},${endCol.value})`)
let max = rows*cols;

function findingPath(grid, start, end){

  const startSquare =new sqaure(null,start);
  startSquare.g = startSquare.h = startSquare.f=0;

  const endSquare = new sqaure(null,end);
  endSquare.g = endSquare.h = endSquare.f = 0;

let openList  = [];
let closedList = [];

openList.push(startSquare);
   

 while(openList.length>0 && closedList.length<=Math.pow(max,2)){
 /*
for (let i = 0; i < clos; i++) {
  let rowString = '';
  for (let j = 0; j < cols; j++) {
   // rowString += grid[i][j].f + ' ';
    rowString += grid[i][j].value + ' ';

  }
  console.log(rowString.trim());
} 
*/
  let currentSquareIndex = 0;

  for(let i=1;i<openList.length;i++){
    if(openList[i].f < openList[currentSquareIndex].f){
      currentSquareIndex = i;
    }
  }
   
  const currentSquare = openList[currentSquareIndex];
   openList.splice(currentSquareIndex,1);
   closedList.push(currentSquare);

  if(currentSquare.equaling(endSquare)){
   const path = [];
   let current = currentSquare;
        while(current !==null){

           path.push(current.position);
          current = current.father;

        }

        return path.reverse();
  }

  const children = [];
  for(const new_position of[[-1,0],[1,0],[0,-1],[0,1],]) {

  const sqaure_position = [ currentSquare.position[0]+new_position[0] , currentSquare.position[1]+new_position[1] ]
    if(sqaure_position[0]>grid.length-1|| sqaure_position[0]<0 || sqaure_position[1]>grid[grid.length-1].length-1 || sqaure_position[1] < 0 ) {
      continue;
    }
 
     if(grid[sqaure_position[0]][sqaure_position[1]].value ===-1){
      continue;
     }
     
    if(grid[sqaure_position[0]][sqaure_position[1]].value===2 && grid[currentSquare.position[0]][currentSquare.position[1]].value===2){
        continue;
    } 
     const new_Square = new sqaure(currentSquare,sqaure_position);
    
     children.push(new_Square);
  }

  for(const child of children) {

    for(const closedChild of closedList){
      if(child.equaling(closedChild))
      continue;
    }
      
    child.g=currentSquare.g+1;
    child.h=Math.abs(child.position[0]-endSquare.position[0])+Math.abs(child.position[1]-endSquare.position[1]); 
    child.f=child.g + child.h;

    
    for(const openChild of openList){
      if(child.equaling(openChild) && child.g>openChild.g) {
        continue;
      }
    }
     openList.push(child);
  }
 }
 return null;
}

const starting = [startRow.value,startCol.value];
const ending = [endRow.value,endCol.value];
let path = [];
path = findingPath (grid,starting,ending);

function printingPath() {
  console.log("the path : ")
  if(path && path.length>0){
  for (let i = 0; i <path.length; i++) {
    const [x, y] = path[i];
    console.log(`(${x}, ${y})`);
  } 
  console.log("length : "+path.length);
  }
  
}

printingPath();
/*
function drawPath(path) {
  let move = 0;
  function drawNextCell() {
    path.length;
     if(path && path.length>0){
    
    let i = path[0][0];
    let j = path[0][1];
    
    path.splice(0,1);
    const insideDiv = grid[i][j].querySelector('div')
     //   insideDiv.style.backgroundColor = 'orange';
    insideDiv.style.backgroundImage = 'url("images/smart.png")';
    insideDiv.style.backgroundSize='cover'; 
    insideDiv.style.backgroundRepeat='no-repeat';
    if (path.length===0) {
      clearInterval(pathInterval);
      return;
    }
   }
    else {
      console.log("No path exists ");
      clearInterval(pathInterval);
    }
if (grid[path[1][0]][path[1][1]].value === 0) {
  move = 500;
} else if (grid[path[1][0]][path[1][1]].value === 1) {
  move = 800;
} else if (grid[path[1][0]][path[1][1]].value === 2) {
  move = 1100;
} else {
  move = 1400;
}
  }
  
  const pathInterval = setInterval(drawNextCell, 500); // is a js function that repeatedly calling a function after a specified time interval 
}
*/

const updateBattery = (percentage)=>{
  const energyTaken = percentage;
  if(robot.battery<energyTaken)
    robot.battery=0;
  else 
  robot.battery-=energyTaken;

  batteryPercantage.textContent = `${robot.battery}%`;
  }
function checkBattery (){
  if(robot.battery<=50 && robot.battery>20){
    batteryLevel.style.backgroundColor = "orange";
  }
  else if(robot.battery<=20 && robot.battery>=0){
   batteryLevel.style.backgroundColor = "red";
  }
}
function drawPath(path) {
  function drawNextCell() {
    if (path && path.length > 0) {
      let i = path[0][0];
      let j = path[0][1];

      path.splice(0, 1);
      const insideDiv = grid[i][j].querySelector('div');
      insideDiv.style.backgroundImage = 'url("images/smart.png")';
      insideDiv.style.backgroundSize = 'cover';
      insideDiv.style.backgroundRepeat = 'no-repeat';

      let move = 0;
      if (path && path.length > 0) {
      if (grid[path[0][0]][path[0][1]].value === 0) {
        move = 500;
      } else if (grid[path[0][0]][path[0][1]].value === 1) {
        move = 800;
      } else if (grid[path[0][0]][path[0][1]].value === 2) {
        move = 1300;
      } else {
        move = 1100;
      }
    }
      if (path.length === 0) {
        clearInterval(pathInterval);
        return;
      }
     // console.log(move);
     updateBattery(grid[path[0][0]][path[0][1]].energyTaken);
     checkBattery();

     console.log(`battery level  = ${robot.battery}`);

    if(robot.battery <= 0){
      console.log("Battery of robot is recharging ");
      robot.battery=100;
      setTimeout(() => {
        // After the delay,resume drawing the path
        batteryPercantage.textContent = `${robot.battery}%`;
        batteryLevel.style.backgroundColor = "green";
        drawNextCell();
    }, 5000);
    return;
    }
      setTimeout(drawNextCell, move);

    } else {
      console.log("No path exists");
      clearInterval(pathInterval);
    }
  }
  const pathInterval = setTimeout(drawNextCell, 0);
}
drawPath(path);

const batteryContainer = document.createElement("div");
batteryContainer.classList.add("battery");
const batteryLevel = document.createElement("div");
batteryLevel.classList.add("battery_level");
const batteryPercantage = document.createElement("p");
batteryPercantage.textContent = "100%";

const texting = document.createElement("div");
texting.textContent=`Energy`;
texting.classList.add("texting");

batteryContainer.appendChild(batteryLevel);
batteryLevel.appendChild(batteryPercantage);

document.body.appendChild(batteryContainer);
document.body.appendChild(texting);




