/*console.log("h")
const words = ["KIWI","MANGO","GAVYA","APPLE","DRAGON"];

const grid = [
  ["K","I","W","I","A"],
  ["M","T","N","G","O"],
  ["B","L","U","E","X"],
  ["A","B","C","D","E"],
  ["F","G","H","I","J"]
];


let Rl = grid.length;
let cl = grid[0].length;


let mat=[];
for(let i=0;i<Rl;i++){
    mat[i]=[];
    for(let j=0;j<cl;j++){
        mat[i][j]=0;
    }let horizontal = Math.random() < 0.5; // de
}

// matrix to track selected cells
//let mat = Array.from({length: Rl}, () => Array(cl).fill(0));

const gridDiv = document.getElementById("grid");
const wordList = document.getElementById("wordList");
const result = document.getElementById("result");
const notE = document.getElementById("NE");

let selectedWord = "";


// display words
for(let word of words){
  let li = document.createElement("li");
  li.textContent = word;
  wordList.appendChild(li);
}

// create grid
for(let i=0;i<Rl;i++){
  for(let j=0;j<cl;j++){
    let div = document.createElement("div");
    div.className = "cell";
    div.textContent = grid[i][j];

    div.onclick = function(){
      if(mat[i][j] === 0){
        selectedWord += grid[i][j];
        mat[i][j] = 1;
        div.classList.add("selected");
        checkWord();
      }
    };

    gridDiv.appendChild(div);
  }
}

function checkWord(){
  // check if selected word is correct
  if(words.includes(selectedWord)){
    result.textContent = "You found " + selectedWord;

    document.querySelectorAll(".selected").forEach(c=>{
      c.classList.add("found");
      c.classList.remove("selected");
    });

    // remove word from list
    let items = wordList.querySelectorAll('li');
    items.forEach(li=>{
      if(li.textContent === selectedWord){
        li.remove();
      }
    });

    selectedWord = "";

    // reset mat for next selection
    //mat = Array.from({length: Rl}, () => Array(cl).fill(0));
  }

  // wrong word logic
  if(selectedWord.length > 8){
    selectedWord = "";

    document.querySelectorAll(".selected").forEach(c=>{
      c.classList.remove("selected");
    });

   // mat = Array.from({length: Rl}, () => Array(cl).fill(0));

    notE.innerText = "This word does not exist in the grid, please try another word.";
  }
}

*/










/*


// ======= CONFIGURATION =======
const words = ["KIWI", "MANGO", "BLUE", "ANKIT", "ORANG"];
const rows = 8;
const cols = 8;

// ======= DYNAMIC GRID =======
let grid = [];
let mat = [];

// initialize grid with empty strings and mat with zeros
for (let i = 0; i < rows; i++) {
    grid[i] = [];
    mat[i] = [];
    for (let j = 0; j < cols; j++) {
        grid[i][j] = ""; 
        mat[i][j] = 0; 
    }
}

// ======= PLACE WORDS (HORIZONTAL & VERTICAL RANDOMLY) =======
function placeWord(word) {
    let placed = false;

    while (!placed) {
        let horizontal = Math.random() < 0.5; // decide horizontal or vertical
        if (horizontal) {
            let r = Math.floor(Math.random() * rows);
            let c = Math.floor(Math.random() * (cols - word.length + 1));
            let canPlace = true;
            for (let k = 0; k < word.length; k++) {
                if (grid[r][c + k] !== "" && grid[r][c + k] !== word[k]) canPlace = false;
            }
            if (canPlace) {
                for (let k = 0; k < word.length; k++) grid[r][c + k] = word[k];
                placed = true;
            }
        } else {
            let r = Math.floor(Math.random() * (rows - word.length + 1));
            let c = Math.floor(Math.random() * cols);
            let canPlace = true;
            for (let k = 0; k < word.length; k++) {
                if (grid[r + k][c] !== "" && grid[r + k][c] !== word[k]) canPlace = false;
            }
            if (canPlace) {
                for (let k = 0; k < word.length; k++) grid[r + k][c] = word[k];
                placed = true;
            }
        }
    }
}

// place all words
for (let word of words) {
    placeWord(word);
}


// fill empty cells with random letters
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        if (grid[i][j] === "") {
            grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
    }
}

// ======= DOM ELEMENTS =======
const gridDiv = document.getElementById("grid");
const wordList = document.getElementById("wordList");
const result = document.getElementById("result");
const notE = document.getElementById("NE");

let selectedWord = "";

// display word list
for (let word of words) {
    let li = document.createElement("li");
    li.textContent = word;
    wordList.appendChild(li);
}

// set grid CSS
gridDiv.style.display = "grid";
gridDiv.style.gridTemplateRows = `repeat(${rows}, 50px)`;
gridDiv.style.gridTemplateColumns = `repeat(${cols}, 50px)`;

// create grid divs
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        let div = document.createElement("div");
        div.className = "cell";
        div.textContent = grid[i][j];

        div.onclick = function () {
            if (mat[i][j] === 0) {
                selectedWord += grid[i][j];
                mat[i][j] = 1;
                div.classList.add("selected");
                checkWord();
            }
        };

        gridDiv.appendChild(div);
    }
}

// ======= STRING SEARCH FUNCTIONS =======
function searchWordInGrid(word) {
    let positions = [];
    let R = grid.length;
    let C = grid[0].length;

    // horizontal left → right
    for (let i = 0; i < R; i++) {
        for (let j = 0; j <= C - word.length; j++) {
            let match = true;
            for (let k = 0; k < word.length; k++) {
                if (grid[i][j + k] !== word[k]) match = false;
            }
            if (match) {
                for (let k = 0; k < word.length; k++) positions.push([i, j + k]);
                return positions;
            }
        }
    }

    // vertical top → bottom
    for (let j = 0; j < C; j++) {
        for (let i = 0; i <= R - word.length; i++) {
            let match = true;
            for (let k = 0; k < word.length; k++) {
                if (grid[i + k][j] !== word[k]) match = false;
            }
            if (match) {
                for (let k = 0; k < word.length; k++) positions.push([i + k, j]);
                return positions;
            }
        }
    }

    return null; // not found
}

function highlightWord(word) {
    let pos = searchWordInGrid(word);
    if (!pos) return;
    pos.forEach(([i, j]) => {
        let index = i * cols + j;
        let div = gridDiv.children[index];
        div.classList.add("found");
    });

    // remove word from list
    let items = wordList.querySelectorAll("li");
    items.forEach((li) => {
        if (li.textContent === word) li.remove();
    });
}

// ==let horizontal = Math.random() < 0.5; // de===== CHECK WORD ON CLICK =======
function checkWord() {
    if (words.includes(selectedWord)) {
        result.textContent = "You found " + selectedWord;
       highlightWord(selectedWord);
        selectedWord = "";
        mat = Array.from({ length: rows }, () => Array(cols).fill(0));
        notE.innerText = "";
    }

    // max length exceeded = wrong word
    if (selectedWord.length > 8) {
        selectedWord = "";
        document.querySelectorAll(".selected").forEach((c) => c.classList.remove("selected"));
        mat = Array.from({ length: rows }, () => Array(cols).fill(0));
        notE.innerText = "This word does not exist, try another word.";
    }
}

// ======= AUTO HIGHLIGHT ALL WORDS =======
for (let word of words) {
    highlightWord(word);
}



*/







/*


function searchWordInGrid(word) {
    let positions = [];
    let R = grid.length;
    let C = grid[0].length;

    // horizontal left → right
    for (let i = 0; i < R; i++) {
        for (let j = 0; j <= C - word.length; j++) {
            let match = true;
            for (let k = 0; k < word.length; k++) {
                if (grid[i][j + k] !== word[k]) match = false;
            }
            if (match) {
                for (let k = 0; k < word.length; k++){
                        positions.push([i, j + k]);
                    }
                return positions;
            }
        }
    }

    // vertical top → bottom
    for (let j = 0; j < C; j++) {
        for (let i = 0; i <= R - word.length; i++) {
            let match = true;
            for (let k = 0; k < word.length; k++) {
                if (grid[i + k][j] !== word[k]) match = false;
            }
            if (match) {
                for (let k = 0; k < word.length; k++) positions.push([i + k, j]);
                return positions;
            }
        }
    }

    return null; // not found
}
    */





































const words = ["KIWI", "MANGO", "BLUE", "ANKIT", "ORANG"];
const rows = 8;
const cols = 8;

// ======= DYNAMIC GRID =======
let grid = [];
let mat = [];

// initialize grid with empty strings and mat with zeros
for (let i = 0; i < rows; i++) {
    grid[i] = [];
    mat[i] = [];
    for (let j = 0; j < cols; j++) {
        grid[i][j] = ""; 
        mat[i][j] = 0;
    }
}

// ======= PLACE WORDS (HORIZONTAL & VERTICAL RANDOMLY) =======



function placeWord(word) {
    let placed = false;

    while (!placed) {

        let direction = Math.floor(Math.random() * 4);

        // 0 = horizontal
        if (direction === 0) {
            let r = Math.floor(Math.random() * rows);
            let c = Math.floor(Math.random() * (cols - word.length + 1));

            let canPlace = true;
            for (let k = 0; k < word.length; k++) {
                if (grid[r][c + k] !== "" && grid[r][c + k] !== word[k  ])
                    canPlace = false;
            }

            if (canPlace) {
                for (let k = 0; k < word.length; k++)
                    grid[r][c + k] = word[k];

                placed = true;
            }
        }

        // 1 = vertical
        else if (direction === 1) {

            let r = Math.floor(Math.random() * (rows - word.length + 1));
            let c = Math.floor(Math.random() * cols);

            let canPlace = true;
            for (let k = 0; k < word.length; k++) {
                if (grid[r + k][c] !== "" && grid[r + k][c] !== word[k])
                    canPlace = false;
            }

            if (canPlace) {
                for (let k = 0; k < word.length; k++)
                    grid[r + k][c] = word[k];

                placed = true;
            }
        }

        // 2 = diagonal right-down ↘
        else if (direction === 2) {

            let r = Math.floor(Math.random() * (rows - word.length + 1));
            let c = Math.floor(Math.random() * (cols - word.length + 1));

            let canPlace = true;
            for (let k = 0; k < word.length; k++) {
                if (grid[r + k][c + k] !== "" && grid[r + k][c + k] !== word[k])
                    canPlace = false;
            }

            if (canPlace) {
                for (let k = 0; k < word.length; k++)
                    grid[r + k][c + k] = word[k];

                placed = true;
            }
        }

        // 3 = diagonal left-down ↙
        else if (direction === 3) {

            let r = Math.floor(Math.random() * (rows - word.length + 1));
            let c = Math.floor(Math.random() * cols);

            let canPlace = true;
            for (let k = 0; k < word.length; k++) {

                if (c - k < 0) {
                    canPlace = false;
                    break;
                }

                if (grid[r + k][c - k] !== "" && grid[r + k][c - k] !== word[k])
                    canPlace = false;
            }

            if (canPlace) {
                for (let k = 0; k < word.length; k++)
                    grid[r + k][c - k] = word[k];

                placed = true;
            }
        }

        // 4 = diagonal right-up ↗
        else if (direction === 4) {

            let r = Math.floor(Math.random() * rows);
            let c = Math.floor(Math.random() * (cols - word.length + 1));

            let canPlace = true;

            for (let k = 0; k < word.length; k++) {

                if (r - k < 0) {
                    canPlace = false;
                    break;
                }

                if (grid[r - k][c + k] !== "" && grid[r - k][c + k] !== word[k])
                    canPlace = false;
            }

            if (canPlace) {
                for (let k = 0; k < word.length; k++)
                    grid[r - k][c + k] = word[k];

                placed = true;
            }
        }

        // 5 = diagonal left-up 
        else if (direction === 5) {

            let r = Math.floor(Math.random() * rows);
            let c = Math.floor(Math.random() * cols);

            let canPlace = true;

            for (let k = 0; k < word.length; k++) {

                if (r - k < 0 || c - k < 0) {
                    canPlace = false;
                    break;
                }

                if (grid[r - k][c - k] !== "" && grid[r - k][c - k] !== word[k])
                    canPlace = false;
            }

            if (canPlace) {
                for (let k = 0; k < word.length; k++)
                    grid[r - k][c - k] = word[k];

                placed = true;
            }
        }
    }
}




// place all words
for (let word of words) {
    placeWord(word);
}


// fill empty cells with random letters
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        if (grid[i][j] === "") {
            grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
    }
}

// ======= DOM ELEMENTS =======
const gridDiv = document.getElementById("grid");
const wordList = document.getElementById("wordList");
const result = document.getElementById("result");
const notE = document.getElementById("NE");

let selectedWord = "";

// display word list
for (let word of words) {
    let li = document.createElement("li");
    li.textContent = word;
    wordList.appendChild(li);
}

// set grid CSS
gridDiv.style.display = "grid";
gridDiv.style.gridTemplateRows = `repeat(${rows}, 50px)`;
gridDiv.style.gridTemplateColumns = `repeat(${cols}, 50px)`;

// create grid divs
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        let div = document.createElement("div");
        div.className = "cell";
        div.textContent = grid[i][j];

      
       /* div.onclick = function () {
            if (mat[i][j] === 0) {
                selectedWord += grid[i][j];
                mat[i][j] = 1;
                div.classList.add("selected");
                checkWord();
            }
        };
        */
       let isDragging = false;
let selectedWord = "";
let selectedCells = []; // keep track of highlighted cells

// ======= GRID EVENTS FOR MOUSE DRAG =======
gridDiv.addEventListener("mousedown", (e) => {
    if (!e.target.classList.contains("cell")) return;

    isDragging = true;
    let index = Array.from(gridDiv.children).indexOf(e.target);
    let i = Math.floor(index / cols);
    let j = index % cols;

    selectedWord = grid[i][j];
    selectedCells = [[i, j]];

    e.target.classList.add("selected");
});

gridDiv.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    if (!e.target.classList.contains("cell")) return;

    let index = Array.from(gridDiv.children).indexOf(e.target);
    let i = Math.floor(index / cols);
    let j = index % cols;

    // prevent selecting the same cell multiple times
    if (selectedCells.some(([x, y]) => x === i && y === j)) return;

    selectedWord += grid[i][j];
    selectedCells.push([i, j]);

    e.target.classList.add("selected");
});

document.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;

    // check if word is valid
    if (words.includes(selectedWord)) {
        result.textContent = "You found " + selectedWord;
        highlightWord(selectedWord);
        selectedWord = "";
        selectedCells = [];
        mat = Array.from({ length: rows }, () => Array(cols).fill(0));
        notE.innerText = "";
    } else {
        // wrong word → remove highlight
        selectedCells.forEach(([i, j]) => {
            let index = i * cols + j;
            gridDiv.children[index].classList.remove("selected");
        });
        selectedWord = "";
        selectedCells = [];
        notE.innerText = "This word does not exist, try another word.";
    }
});





        gridDiv.appendChild(div);
    }
}

// ======= STRING SEARCH FUNCTIONS =======
function searchWordInGrid(word) {

    let R = grid.length;
    let C = grid[0].length;

    for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {

            // ---------- Horizontal Right →
            let positions = [];
            let k;
            for (k = 0; k < word.length; k++) {

                if (j + k >= C || grid[i][j + k] !== word[k])
                    break;

                positions.push([i, j + k]);
            }

            if (k === word.length) return positions;


            // ---------- Horizontal Left ←
            positions = [];
            for (k = 0; k < word.length; k++) {

                if (j - k < 0 || grid[i][j - k] !== word[k])
                    break;

                positions.push([i, j - k]);
            }

            if (k === word.length) return positions;


            // ---------- Vertical Down ↓
            positions = [];
            for (k = 0; k < word.length; k++) {

                if (i + k >= R || grid[i + k][j] !== word[k])
                    break;

                positions.push([i + k, j]);
            }

            if (k === word.length) return positions;


            // ---------- Vertical Up ↑
            positions = [];
            for (k = 0; k < word.length; k++) {

                if (i - k < 0 || grid[i - k][j] !== word[k])
                    break;

                positions.push([i - k, j]);
            }

            if (k === word.length) return positions;


            // ---------- Diagonal Right-Down ↘
            positions = [];
            for (k = 0; k < word.length; k++) {

                if (i + k >= R || j + k >= C || grid[i + k][j + k] !== word[k])
                    break;

                positions.push([i + k, j + k]);
            }

            if (k === word.length) return positions;


            // ---------- Diagonal Left-Down ↙
            positions = [];
            for (k = 0; k < word.length; k++) {

                if (i + k >= R || j - k < 0 || grid[i + k][j - k] !== word[k])
                    break;

                positions.push([i + k, j - k]);
            }

            if (k === word.length) return positions;


            // ---------- Diagonal Right-Up ↗
            positions = [];
            for (k = 0; k < word.length; k++) {

                if (i - k < 0 || j + k >= C || grid[i - k][j + k] !== word[k])
                    break;

                positions.push([i - k, j + k]);
            }

            if (k === word.length) return positions;


            // ---------- Diagonal Left-Up ↖
            positions = [];
            for (k = 0; k < word.length; k++) {

                if (i - k < 0 || j - k < 0 || grid[i - k][j - k] !== word[k])
                    break;

                positions.push([i - k, j - k]);
            }

            if (k === word.length) return positions;

        }
    }

    return null;
}

function highlightWord(word) {
    let pos = searchWordInGrid(word);
    if (!pos) return;
    pos.forEach(([i, j]) => {
        let index = i * cols + j;
        let div = gridDiv.children[index];
        div.classList.add("found");
    });
    


    
   // remove word from list
    let items = wordList.querySelectorAll("li");
    items.forEach((li) => {
        if (li.textContent === word) li.remove();
    });
}

// ==let horizontal = Math.random() < 0.5  let div = gridDiv.children[index];; // de===== CHECK WORD ON CLICK =======
function checkWord() {
    if (words.includes(selectedWord)) {
        result.textContent = "You found " + selectedWord;
       highlightWord(selectedWord);
        selectedWord = "";
      //  mat = Array.from({ length: rows }, () => Array(cols).fill(0));
        notE.innerText = "";
    }

    // max length exceeded = wrong word
    if (selectedWord.length > 8) {
        selectedWord = "";
        document.querySelectorAll(".selected").forEach((c) => c.classList.remove("selected"));
        mat = Array.from({ length: rows }, () => Array(cols).fill(0));
        notE.innerText = "This word does not exist, try another word.";
    }
}

// ======= AUTO HIGHLIGHT ALL WORDS =======
//for (let word of words) {
  //  highlightWord(word);
//}


