// Two graph questions
function getRandomSlopeQuestion() {
    // Random line: y = mx + b, m in [-3, 3] excluding 0, b in [-5, 5]
    let m;
    do {
        m = Math.floor(Math.random() * 7) - 3; // -3 to 3
    } while (m === 0);
    let b = Math.floor(Math.random() * 11) - 5; // -5 to 5
    let eq = `y = ${m}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}`;
    let answerIdx = m > 0 ? 0 : 1;
    return {
        question: `What is the slope of the line ${eq}?`,
        options: ["Slope is positive", "Slope is negative", "Slope is undefined", "0"],
        answer: answerIdx,
        solution: `The slope is ${m > 0 ? "positive" : "negative"} because m = ${m}.`
    };
}

function getRandomSlopeQuestion() {
    let m;
    do {
        m = Math.floor(Math.random() * 7) - 3;
    } while (m === 0);
    let b = Math.floor(Math.random() * 11) - 5;
    let eq = `y = ${m}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}`;
    let answerIdx = m > 0 ? 0 : 1;
    return {
        question: `What is the slope of the line ${eq}?`,
        options: ["Slope is positive", "Slope is negative", "Slope is undefined", "0"],
        answer: answerIdx,
        solution: `The slope is ${m > 0 ? "positive" : "negative"} because m = ${m}.`,
        m,
        b
    };
}

function getRandomSlopeQuestion2() {
    let m;
    do {
        m = Math.floor(Math.random() * 7) - 3;
    } while (m === 0);
    let b = Math.floor(Math.random() * 11) - 5;
    let eq = `y = ${m}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}`;
    // Generate distractors
    let distractors = [m + 1, m - 1, -m];
    let options = [m.toString(), distractors[0].toString(), distractors[1].toString(), distractors[2].toString()];
    let answerIdx = 0;
    return {
        question: `Find the slope of the line ${eq}.`,
        options,
        answer: answerIdx,
        solution: `The slope is ${m}.`,
        m,
        b
    };
}

function getRandomPointsQuestion() {
    let x1 = Math.floor(Math.random() * 11) - 5;
    let y1 = Math.floor(Math.random() * 11) - 5;
    let x2 = Math.floor(Math.random() * 11) - 5;
    let y2 = Math.floor(Math.random() * 11) - 5;
    while (x1 === x2 && y1 === y2) {
        x2 = Math.floor(Math.random() * 11) - 5;
        y2 = Math.floor(Math.random() * 11) - 5;
    }
    let slope;
    let answerIdx;
    let options;
    if (x1 === x2) {
        slope = 'undefined';
        options = ['undefined', '0', '1', '-1'];
        answerIdx = 0;
    } else if (y1 === y2) {
        slope = 0;
        options = ['0', '1', '-1', 'undefined'];
        answerIdx = 0;
    } else {
        let m = ((y2 - y1) / (x2 - x1));
        // Round to 2 decimals for display
        let mDisplay = Math.round(m * 100) / 100;
        let distractors = [mDisplay + 1, mDisplay - 1, -mDisplay];
        options = [mDisplay.toString(), distractors[0].toString(), distractors[1].toString(), distractors[2].toString()];
        answerIdx = 0;
        slope = mDisplay;
    }
    return {
        question: `Given two points (${x1}, ${y1}) and (${x2}, ${y2}), what is the slope?`,
        options,
        answer: answerIdx,
        solution: `Slope = ${slope}`,
        x1,
        y1,
        x2,
        y2
    };
}

const quizQuestions = [
    {
        question: "What is the slope of the line x = y - 2?",
        options: ["Slope is positive", "Slope is negative", "Slope is undefined", "0"],
        answer: 0,
        solution: "The slope is positive because x = y - 2 can be rewritten as y = x + 2, which has a positive slope."
    },
    {
        question: "What is the slope of the line x = 5?",
        options: ["Slope is positive", "Slope is negative", "Slope is undefined", "0"],
        answer: 2,
        solution: "The slope is undefined because x = 5 is a vertical line."
    },
    getRandomSlopeQuestion(),
    getRandomSlopeQuestion2(),
    getRandomPointsQuestion()
];

function renderQuestions() {
    const questionsDiv = document.getElementById('questions');
    questionsDiv.innerHTML = '';
    quizQuestions.forEach((q, idx) => {
        const qDiv = document.createElement('div');
        qDiv.className = 'question';
        qDiv.innerHTML = `<label><b>Q${idx+1}: ${q.question}</b></label><br>`;
        // Add canvas for graph
        const canvasId = `canvas${idx}`;
        qDiv.innerHTML += `<canvas id='${canvasId}' width='300' height='300' style='border:1px solid #ccc; margin-bottom:10px;'></canvas><br>`;
        q.options.forEach((opt, oidx) => {
            const optId = `q${idx}_opt${oidx}`;
            qDiv.innerHTML += `
                <label><input type=\"radio\" name=\"q${idx}\" value=\"${oidx}\" id=\"${optId}\"> ${opt}</label>`;
        });
        questionsDiv.appendChild(qDiv);
    });
    // Draw lines on canvases
    drawGraphs();
}

function drawGraphs() {
    // Question 1: x = y - 2 => y = x + 2
    let ctx1 = document.getElementById('canvas0').getContext('2d');
    drawAxes(ctx1);
    ctx1.strokeStyle = '#007bff';
    ctx1.beginPath();
    for (let x = -10; x <= 10; x++) {
        let y = x + 2;
        let px = 150 + x * 12;
        let py = 150 - y * 12;
        if (x === -10) ctx1.moveTo(px, py);
        else ctx1.lineTo(px, py);
    }
    ctx1.stroke();

    // Question 2: x = 5 (vertical line)
    let ctx2 = document.getElementById('canvas1').getContext('2d');
    drawAxes(ctx2);
    ctx2.strokeStyle = '#007bff';
    ctx2.beginPath();
    let px = 150 + 5 * 12;
    ctx2.moveTo(px, 0);
    ctx2.lineTo(px, 300);
    ctx2.stroke();

    // Question 3: random y = mx + b
    let ctx3 = document.getElementById('canvas2').getContext('2d');
    drawAxes(ctx3);
    ctx3.strokeStyle = '#007bff';
    ctx3.beginPath();
    let m3 = quizQuestions[2].m;
    let b3 = quizQuestions[2].b;
    for (let x = -10; x <= 10; x++) {
        let y = m3 * x + b3;
        let px = 150 + x * 12;
        let py = 150 - y * 12;
        if (x === -10) ctx3.moveTo(px, py);
        else ctx3.lineTo(px, py);
    }
    ctx3.stroke();

    // Question 4: another random y = mx + b
    let ctx4 = document.getElementById('canvas3').getContext('2d');
    drawAxes(ctx4);
    ctx4.strokeStyle = '#007bff';
    ctx4.beginPath();
    let m4 = quizQuestions[3].m;
    let b4 = quizQuestions[3].b;
    for (let x = -10; x <= 10; x++) {
        let y = m4 * x + b4;
        let px = 150 + x * 12;
        let py = 150 - y * 12;
        if (x === -10) ctx4.moveTo(px, py);
        else ctx4.lineTo(px, py);
    }
    ctx4.stroke();

    // Question 5: two points
    let ctx5 = document.getElementById('canvas4').getContext('2d');
    drawAxes(ctx5);
    ctx5.strokeStyle = '#007bff';
    ctx5.beginPath();
    let x1 = quizQuestions[4].x1;
    let y1 = quizQuestions[4].y1;
    let x2 = quizQuestions[4].x2;
    let y2 = quizQuestions[4].y2;
    ctx5.moveTo(150 + x1 * 12, 150 - y1 * 12);
    ctx5.lineTo(150 + x2 * 12, 150 - y2 * 12);
    ctx5.stroke();
    // Draw points
    ctx5.fillStyle = 'red';
    ctx5.beginPath();
    ctx5.arc(150 + x1 * 12, 150 - y1 * 12, 5, 0, 2 * Math.PI);
    ctx5.fill();
    ctx5.beginPath();
    ctx5.arc(150 + x2 * 12, 150 - y2 * 12, 5, 0, 2 * Math.PI);
    ctx5.fill();
}

function drawAxes(ctx) {
    // Draw grid
    ctx.strokeStyle = '#eee';
    for (let x = 0; x <= 300; x += 12) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 300);
        ctx.stroke();
    }
    for (let y = 0; y <= 300; y += 12) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(300, y);
        ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#888';
    ctx.beginPath();
    // x-axis
    ctx.moveTo(0, 150);
    ctx.lineTo(300, 150);
    // y-axis
    ctx.moveTo(150, 0);
    ctx.lineTo(150, 300);
    ctx.stroke();

    // Draw numeric labels
    ctx.font = '12px Arial';
    ctx.fillStyle = '#333';
    // x-axis labels
    for (let x = -10; x <= 10; x += 5) {
        let px = 150 + x * 12;
        ctx.fillText(x.toString(), px - 8, 165);
    }
    // y-axis labels
    for (let y = -10; y <= 10; y += 5) {
        let py = 150 - y * 12;
        ctx.fillText(y.toString(), 130, py + 4);
    }
}

function gradeQuiz(event) {
    event.preventDefault();
    let score = 0;
    let resultHTML = '<h2>Results</h2>';
    quizQuestions.forEach((q, idx) => {
        const selected = document.querySelector(`input[name="q${idx}"]:checked`);
        const correctIdx = q.answer;
        if (selected) {
            const userAns = parseInt(selected.value);
            if (userAns === correctIdx) {
                score++;
                resultHTML += `<div class="correct">Q${idx+1}: Correct! ${q.solution}</div>`;
            } else {
                resultHTML += `<div class="incorrect">Q${idx+1}: Incorrect. ${q.solution}</div>`;
            }
        } else {
            resultHTML += `<div class="incorrect">Q${idx+1}: No answer selected. ${q.solution}</div>`;
        }
    });
    resultHTML += `<p><b>Your Score: ${score} / ${quizQuestions.length}</b></p>`;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = resultHTML;
    resultDiv.style.display = 'block';
    document.getElementById('submit-btn').disabled = true;
}

document.getElementById('quiz-form').addEventListener('submit', gradeQuiz);
renderQuestions();
