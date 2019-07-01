const canvas = {};
let debug = false;

function runAnimation() {
  createCanvas();
  setInterval(frame, 50);
}
runAnimation();

function frame() {
  calculatesPropagation();
  render();
}

function createCanvas() {
  canvas.element = document.getElementById('fire');
  canvas.rows = 50;
  canvas.columns = 50;
  const numberOfTheLastColums = canvas.columns * 2;
  const gridBody = Array(canvas.rows * canvas.columns - numberOfTheLastColums).fill(0);
  const gridBase = Array(numberOfTheLastColums).fill(36);
  canvas.grid = gridBody.concat(gridBase);
}

function calculatesPropagation() {
  for (let row = 0; row < canvas.rows; ++row) {
    const currentRowFirstPosition = canvas.columns * row;
    const nextRowFirstPosition = currentRowFirstPosition + canvas.columns;
    for (let position = currentRowFirstPosition; position < nextRowFirstPosition; ++position) {
      const bottomPosition = position + canvas.columns;
      if (canvas.grid[bottomPosition]) { 
        const decay = randomNumberAt();
        const decay2 = randomNumberAt(3);
        const index = (position - decay) || 0;
        const newValue = (canvas.grid[bottomPosition] - decay2) || 0;
        canvas.grid[index] = newValue;
      }
    }
  }
}

function randomNumberAt(number = 2) {
  return Math.floor(Math.random() * number);
}

function render() {
  let html = '<table>';
  for (let row = 0; row < canvas.rows; ++row) {
    html += '<tr>';
    const currentRowFirstColumnIndex = canvas.columns * row;
    const nextRowFirstColumnIndex = currentRowFirstColumnIndex + canvas.columns;
    for (let column = currentRowFirstColumnIndex; column < nextRowFirstColumnIndex; ++column) {
      const fireForce = canvas.grid[column];
      const colorHex = palette[fireForce];
      if (debug) {
        html += `<td style="background:${colorHex}" class="debug-mode"><span>${fireForce}<span></td>`;
      } else {
	      html += `<td style="background:${colorHex}"></td>`;
      }
    }
    html += '</tr>';
  }

  html += '</table>'
  canvas.element.innerHTML = html;
}
