let points, angles, answerIdx, selectedIdx = null;
let canvasSize = 400;
let correctCount = 0, totalCount = 0;
let answered = false;

// Sinh tên điểm ngẫu nhiên từ một chuỗi ký tự
function randomPoints(n, nameSet) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    let angle = map(i, 0, n, 0, TWO_PI) - PI/2;
    let r = 130 + random(-20, 20);
    arr.push({
      name: nameSet[i],
      x: canvasSize/2 + r * cos(angle),
      y: canvasSize/2 + r * sin(angle)
    });
  }
  return arr;
}

// Sinh tất cả các đoạn (cạnh + đường chéo)
function allSegments(points) {
  let n = points.length;
  let segs = [];
  // Cạnh đa giác
  for (let i = 0; i < n; i++) {
    segs.push({ a: i, b: (i+1)%n });
  }
  // Đường chéo
  for (let i = 0; i < n; i++) {
    for (let j = i+1; j < n; j++) {
      if (abs(i-j) !== 1 && abs(i-j) !== n-1) {
        segs.push({ a: i, b: j });
      }
    }
  }
  return segs;
}

// Chỉ sinh các góc nhỏ nhất tại mỗi đỉnh (góc giữa hai cạnh kề)
function allPolygonAngles(points) {
  let arr = [];
  let n = points.length;
  for (let i = 0; i < n; i++) {
    let prev = (i - 1 + n) % n;
    let next = (i + 1) % n;
    let v = points[i];
    let pPrev = points[prev];
    let pNext = points[next];
    let angPrev = atan2(pPrev.y - v.y, pPrev.x - v.x);
    let angNext = atan2(pNext.y - v.y, pNext.x - v.x);
    // Luôn lấy cung nhỏ (ngược chiều kim đồng hồ)
    let diff = (angNext - angPrev + TWO_PI) % TWO_PI;
    if (diff > PI) {
      // Đảo lại để luôn là cung nhỏ
      [angPrev, angNext] = [angNext, angPrev];
      [prev, next] = [next, prev];
    }
    arr.push({
      name: points[prev].name + points[i].name + points[next].name,
      nameRev: points[next].name + points[i].name + points[prev].name,
      vertex: i,
      arms: [prev, next],
      ang1: angPrev,
      ang2: angNext
    });
  }
  return arr;
}

// Sinh tất cả các góc nhỏ nhất đi qua các đỉnh của đa giác
function allMinimalAngles(points, segs) {
  let n = points.length;
  let arr = [];
  for (let i = 0; i < n; i++) {
    // Tìm tất cả đoạn đi qua đỉnh i
    let arms = [];
    for (let s of segs) {
      let isEdge = false;
      if (s.a === i) {
        isEdge = (s.b === (i+1)%n || s.b === (i-1+n)%n);
        arms.push({ idx: s.b, isEdge });
      } else if (s.b === i) {
        isEdge = (s.a === (i+1)%n || s.a === (i-1+n)%n);
        arms.push({ idx: s.a, isEdge });
      }
    }
    // Sắp xếp các arms theo góc cực quanh đỉnh i
    let v = points[i];
    let armsAngles = arms.map(a => {
      let p = points[a.idx];
      return { idx: a.idx, ang: atan2(p.y - v.y, p.x - v.x), isEdge: a.isEdge };
    });
    armsAngles.sort((a, b) => a.ang - b.ang);

    // Duyệt từng cặp kề nhau
    for (let j = 0; j < armsAngles.length; j++) {
      let a1 = armsAngles[j];
      let a2 = armsAngles[(j+1)%armsAngles.length];
      // Nếu cả hai là cạnh, bỏ qua
      if (a1.isEdge && a2.isEdge) continue;
      // Nếu một là cạnh, một là đường chéo, hoặc cả hai là đường chéo kề nhau
      // (giữa hai đường chéo kề nhau, không có cạnh xen giữa)
      let start = a1.ang, end = a2.ang;
      let diff = (end - start + TWO_PI) % TWO_PI;
      if (diff > PI) [start, end] = [end, start];
      // Loại trùng tên góc
      let name1 = points[a1.idx].name + points[i].name + points[a2.idx].name;
      let name2 = points[a2.idx].name + points[i].name + points[a1.idx].name;
      if (!arr.some(g => g.name === name1 || g.name === name2)) {
        arr.push({
          name: name1,
          nameRev: name2,
          vertex: i,
          arms: [a1.idx, a2.idx],
          ang1: start,
          ang2: end
        });
      }
    }
  }
  return arr;
}

function setup() {
  let c = createCanvas(canvasSize, canvasSize);
  c.parent('sketch-holder');
  textFont('Arial');
  textAlign(CENTER, CENTER);
  generateQuestion();
}

function generateQuestion() {
  // Chỉ chọn các bộ tên có từ 4 điểm trở lên
  let nameSets = [
    ['M','N','P','Q'],
    ['A','B','C','D','E','F'],
    ['M','N','P','Q','R','S']
  ];
  let idx = floor(random(nameSets.length));
  let names = nameSets[idx];
  points = randomPoints(names.length, names);
  let segs = allSegments(points);
  angles = allMinimalAngles(points, segs);

  answerIdx = floor(random(angles.length));
  selectedIdx = null;
  answered = false;
  document.getElementById('question').innerHTML = `Click on the correct angle: \\(\\widehat{${angles[answerIdx].name}}\\)`;
  document.getElementById('feedback').innerText = '';
  document.getElementById('newQuestionBtn').disabled = true;
  updateStats();
  if (window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise();
  redraw();
}

function draw() {
  background(224);
  let segs = allSegments(points);

  // Vẽ cạnh đa giác (màu đen, đậm)
  stroke(0); strokeWeight(2);
  for (let i = 0; i < points.length; i++) {
    let a = i, b = (i+1)%points.length;
    line(points[a].x, points[a].y, points[b].x, points[b].y);
  }

  // Vẽ đường chéo (màu cam, đậm)
  stroke(255, 140, 0); strokeWeight(3);
  for (let s of segs) {
    let n = points.length;
    if (abs(s.a-s.b) !== 1 && abs(s.a-s.b) !== n-1) {
      line(points[s.a].x, points[s.a].y, points[s.b].x, points[s.b].y);
    }
  }

  // Draw points
  fill(0); noStroke();
  for (let p of points) ellipse(p.x, p.y, 10, 10);

  // Draw labels
  textSize(18); fill(0);
  for (let p of points) text(p.name, p.x, p.y - 18);

  // Draw angle arcs and highlight if selected
  for (let i = 0; i < angles.length; i++) {
    let a = angles[i];
    let v = points[a.vertex];
    let arcColor = (i === selectedIdx) ? color(255,0,0) : color(0,120,255);
    stroke(arcColor); strokeWeight(3); noFill();
    let start = a.ang1, end = a.ang2;
    let diff = (end - start + TWO_PI) % TWO_PI;
    if (diff > PI) [start, end] = [end, start];
    arc(v.x, v.y, 48, 48, start, end);
    // Draw angle name if selected
    if (i === selectedIdx) {
      noStroke(); fill(arcColor);
      let midAngle = (start + end) / 2;
      let tx = v.x + 38 * cos(midAngle);
      let ty = v.y + 38 * sin(midAngle);
      textSize(16);
      text(`^${a.name}`, tx, ty);
    }
  }
}

function mousePressed() {
  if (answered) return; // Không cho chọn lại khi đã trả lời
  // Check if user clicked near any angle arc
  for (let i = 0; i < angles.length; i++) {
    let a = angles[i];
    let v = points[a.vertex];
    let start = a.ang1, end = a.ang2;
    let mv = createVector(mouseX - v.x, mouseY - v.y);
    let r = mv.mag();
    if (r < 32 || r > 64) continue; // Only near the arc
    let ang = atan2(mv.y, mv.x);
    // Kiểm tra ang có nằm giữa start và end (cung nhỏ)
    let diff = (end - start + TWO_PI) % TWO_PI;
    let inArc = false;
    if (diff > 0) {
      let rel = (ang - start + TWO_PI) % TWO_PI;
      inArc = rel >= 0 && rel <= diff;
    }
    if (inArc) {
      selectedIdx = i;
      checkAnswer();
      redraw();
      return;
    }
  }
}

function checkAnswer() {
  let feedback = document.getElementById('feedback');
  answered = true;
  totalCount++;
  // So sánh tên góc thuận và ngược
  let ans = angles[answerIdx];
  let sel = angles[selectedIdx];
  let isCorrect =
    (sel.name === ans.name || sel.name === ans.nameRev ||
     sel.nameRev === ans.name || sel.nameRev === ans.nameRev);
  if (isCorrect) {
    feedback.innerHTML = "Correct! 🎉";
    feedback.style.color = "green";
    correctCount++;
  } else {
    feedback.innerHTML = `Wrong! That is \\(\\widehat{${sel.name}}\\).`;
    feedback.style.color = "red";
  }
  document.getElementById('newQuestionBtn').disabled = false;
  updateStats();
  if (window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise();
}

function updateStats() {
  let ratio = totalCount > 0 ? (correctCount / totalCount * 100).toFixed(1) : 0;
  let stats = `Correct: ${correctCount}, Total: ${totalCount}, Accuracy: ${ratio}%`;
  let statsDiv = document.getElementById('stats');
  if (statsDiv) statsDiv.innerText = stats;
}

document.getElementById('newQuestionBtn').onclick = generateQuestion;