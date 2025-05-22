const weights = [2, 2, 7, 4, 9, 9];
const values = [4, 7, 2, 8, 11, 13];
const W = 29;
const n = weights.length;

const dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));

for (let i = 1; i <= n; i++) {
  for (let w = 0; w <= W; w++) {
    if (weights[i - 1] <= w) {
      dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
    } else {
      dp[i][w] = dp[i - 1][w];
    }
  }
}

let w = W;
const chosenCells = new Set();
const chosenIndices = [];

for (let i = n; i > 0; i--) {
  if (dp[i][w] !== dp[i - 1][w]) {
    chosenIndices.push(i - 1);
    chosenCells.add(`${i},${w}`);
    w -= weights[i - 1];
  }
}

chosenIndices.sort((a, b) => a - b);

window.onload = function () {
  const output = document.getElementById("output");
  let html = "<h2>Таблиця DP:</h2><table border='1' cellspacing='0'><tr><th>i \\ w</th>";

  for (let j = 0; j <= W; j++) {
    html += `<th>${j}</th>`;
  }
  html += "</tr>";

  for (let i = 0; i <= n; i++) {
    html += `<tr><th>${i}</th>`;
    for (let j = 0; j <= W; j++) {
      const cellKey = `${i},${j}`;
      const isChosen = chosenCells.has(cellKey);
      html += `<td style="background-color: ${isChosen ? '#c8f7c5' : 'white'}">${dp[i][j]}</td>`;
    }
    html += "</tr>";
  }
  html += "</table>";

  html += `<h2>Максимальна цінність: ${dp[n][W]}</h2>`;
  html += "<h3>Обрані предмети (у порядку індексів):</h3><ul>";

  let totalWeight = 0;
  for (const idx of chosenIndices) {
    html += `<li>Предмет ${idx + 1}: вага = ${weights[idx]}, цінність = ${values[idx]}</li>`;
    totalWeight += weights[idx];
  }

 
  output.innerHTML = html;
};
