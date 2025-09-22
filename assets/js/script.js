const quizThemes = {
    javascript: [
        {
            question: "Quelle est la sortie de ce code ? console.log(typeof null)",
            options: ["null", "undefined", "object", "boolean"],
            answer: [2],
            multipleAnswers: false
        },
        {
            question: "Comment déclarer une variable en JavaScript qui ne peut pas être réassignée ?",
            options: ["var myVar = 5", "let myVar = 5", "const myVar = 5", "final myVar = 5"],
            answer: [2],
            multipleAnswers: false
        },
        {
            question: "Quelle(s) méthode(s) permet(tent) d'ajouter un élément à un tableau ?",
            options: ["array.push()", "array.unshift()", "array.concat()", "array.splice()"],
            answer: [0, 1, 3],
            multipleAnswers: true
        },
        {
            question: "Que retourne cette expression ? `5` + 3",
            options: ["8", "'53'", "53", "Une erreur"],
            answer: [1],
            multipleAnswers: false
        },
        {
            question: "Comment sélectionner un élément HTML par son ID en JavaScript ?",
            options: ["document.getElementByClass(`myId`)", "document.querySelector(`#myId`)", "document.getElement(`myId`)", "document.findById(`myId`)"],
            answer: [1],
            multipleAnswers: false
        },
        {
            question: "Quelle est la différence entre == et === en JavaScript ?",
            options: ["Aucune différence", "== compare les valeurs, === compare les valeurs et les types", "=== compare seulement les valeurs", "== est plus rapide que ==="],
            answer: [1],
            multipleAnswers: false
        },
        {
            question: "Comment créer une fonction en JavaScript ?",
            options: ["function myFunction() {}", "def myFunction() {}", "create function myFunction() {}", "func myFunction() {}"],
            answer: [0],
            multipleAnswers: false
        },
        {
            question: "Que fait la méthode Array.map() ?",
            options: ["Modifie le tableau original", "Filtre les éléments du tableau", "Crée un nouveau tableau avec les résultats d'une fonction appliquée à chaque élément", "Trie le tableau"],
            answer: [2],
            multipleAnswers: false
        },
        {
            question: "Quelles sont les méthodes de gestion des erreurs en JavaScript ?",
            options: ["try...catch", "if...else", "throw", "Promise.catch()"],
            answer: [0, 2, 3],
            multipleAnswers: true
        },
        {
            question: "Comment créer un objet vide en JavaScript ?",
            options: ["let obj = []", "let obj = {}", "let obj = null", "let obj = new Array()"],
            answer: [1],
            multipleAnswers: false
        }
    ],
    html: [
        {
            question: "Quelle balise est utilisée pour créer un lien hypertexte ?",
            options: ["link", "a", "href", "url"],
            answer: [1],
            multipleAnswers: false
        },
        {
            question: "Quelle balise est utilisée pour insérer une image ?",
            options: ["img", "picture", "image", "src"],
            answer: [0],
            multipleAnswers: false
        },
        {
            question: "Quelle balise HTML5 définit la navigation principale ?",
            options: ["menu", "nav", "navigation", "header"],
            answer: [1],
            multipleAnswers: false
        },
        {
            question: "Quels attributs sont obligatoires pour la balise <img> ?",
            options: ["src", "alt", "width", "height"],
            answer: [0, 1],
            multipleAnswers: true
        },
        {
            question: "Quelle balise définit un tableau en HTML ?",
            options: ["tab", "table", "tbl", "grid"],
            answer: [1],
            multipleAnswers: false
        },
        {
            question: "Quelle est la version actuelle de HTML ?",
            options: ["HTML4", "HTML5", "HTML6", "XHTML"],
            answer: [1],
            multipleAnswers: false
        },
        {
            question: "Quelle balise définit un formulaire en HTML ?",
            options: ["input", "form", "fieldset", "submit"],
            answer: [1],
            multipleAnswers: false
        },
        {
            question: "Quelles balises peuvent être utilisées pour créer des listes ?",
            options: ["ul", "ol", "dl", "list"],
            answer: [0, 1, 2],
            multipleAnswers: true
        },
        {
            question: "Quelle balise est utilisée pour définir le titre d'une page web ?",
            options: ["head", "title", "header", "h1"],
            answer: [1],
            multipleAnswers: false
        },
        {
            question: "Quel attribut permet de définir un style CSS en ligne ?",
            options: ["class", "id", "style", "css"],
            answer: [2],
            multipleAnswers: false
        }
    ],
    css: [
        {
            question: "Quelle propriété est utilisée pour changer la couleur du texte ?",
            options: ["text-color", "color", "font-color", "text-style"],
            answer: [1],
            multipleAnswers: false
        },
        {
            question: "Quelle propriété définit l'espacement entre les lettres ?",
            options: ["letter-spacing", "text-spacing", "character-spacing", "font-spacing"],
            answer: [0],
            multipleAnswers: false
        },
        {
            question: "Comment sélectionner tous les éléments <p> à l'intérieur d'un élément avec la classe 'content' ?",
            options: [".content p", "content > p", ".content, p", "p.content"],
            answer: [0],
            multipleAnswers: false
        },
        {
            question: "Quelles propriétés peuvent être animées en CSS ?",
            options: ["width", "color", "transform", "display"],
            answer: [0, 1, 2],
            multipleAnswers: true
        },
        {
            question: "Quelle propriété est utilisée pour créer un espace autour d'un élément, en dehors de sa bordure ?",
            options: ["margin", "padding", "spacing", "border-spacing"],
            answer: [0],
            multipleAnswers: false
        },
        {
            question: "Quelle propriété définit la disposition des éléments dans un conteneur Flexbox ?",
            options: ["flex-direction", "justify-content", "align-items", "flex-wrap"],
            answer: [0],
            multipleAnswers: false
        },
        {
            question: "Quelles sont les valeurs possibles pour la propriété 'position' ?",
            options: ["static", "relative", "fixed", "floating"],
            answer: [0, 1, 2],
            multipleAnswers: true
        },
        {
            question: "Quelle unité est relative à la taille de la police de l'élément parent ?",
            options: ["px", "em", "rem", "vh"],
            answer: [1],
            multipleAnswers: false
        },
        {
            question: "Quelle propriété est utilisée pour arrondir les coins d'un élément ?",
            options: ["corner-radius", "border-radius", "rounded-corners", "box-radius"],
            answer: [1],
            multipleAnswers: false
        },
        {
            question: "Comment cibler un élément avec l'ID 'header' en CSS ?",
            options: [".header", "#header", "header", "*header"],
            answer: [1],
            multipleAnswers: false
        }
    ]
};

const startScreen = document.getElementById('start-screen');
const quizContent = document.getElementById('quiz-content');
const quizForm = document.getElementById('quiz-form');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const resultDiv = document.querySelector('.result');
const scoreP = document.getElementById('score');
const feedbackP = document.getElementById('feedback');
const restartBtn = document.getElementById('restart-btn');
const startBtn = document.getElementById('start-btn');
const themeButtons = document.querySelectorAll('.theme-btn');
const usernameInput = document.getElementById('username');
const questionTimeEl = document.getElementById('question-time');
const questionProgressEl = document.getElementById('question-progress');
const correctionsDiv = document.getElementById('corrections');
const historyDiv = document.getElementById('history');
const currentQuestionEl = document.getElementById('current-question');
const totalQuestionsEl = document.getElementById('total-questions');

// varibale global
let selectedTheme = '';
let username = '';
let currentQuizData = [];
let userAnswers = [];
let currentQuestionIndex = 0;
let startTime, timerInterval;
let questionTimer;
let timePerQuestion = 20;

// Theme selection
themeButtons.forEach(button => {
    button.addEventListener('click', function() {
        themeButtons.forEach(btn => btn.classList.remove('selected'));
        this.classList.add('selected');
        selectedTheme = this.dataset.theme;
    });
});

// Start quiz
startBtn.addEventListener('click', function() {
    username = usernameInput.value.trim();
    if (!username) {
        alert('Veuillez entrer un pseudo');
        return;
    }
    if (!selectedTheme) {
        alert('Veuillez sélectionner une thématique');
        return;
    }

    startScreen.style.display = 'none';
    quizContent.style.display = 'block';

    currentQuizData = [...quizThemes[selectedTheme]];
    shuffleArray(currentQuizData);
    userAnswers = Array(currentQuizData.length).fill([]);
    currentQuestionIndex = 0;


    totalQuestionsEl.textContent = currentQuizData.length; // Update total questions count

    displayQuestion(currentQuestionIndex);
    startTimer();
});

nextBtn.addEventListener('click', function() {
    saveCurrentAnswer();
    clearInterval(questionTimer);

    // Move to next question
    if (currentQuestionIndex < currentQuizData.length - 1) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);

        // Show previous btn if not on first question
        prevBtn.style.display = 'inline-block';

        // Show submit btn if on last question if not show the next btn
        if (currentQuestionIndex === currentQuizData.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        }
    }
});

prevBtn.addEventListener('click', function() {
    saveCurrentAnswer();
    clearInterval(questionTimer);

    // Move to previous question
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion(currentQuestionIndex);

        // Hide previous btn if on first question
        if (currentQuestionIndex === 0) {
            prevBtn.style.display = 'none';
        }

        // Show next btn and hide submit button
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
    }
});

restartBtn.addEventListener('click', function() {
    clearInterval(timerInterval);
    clearInterval(questionTimer);

    scoreP.textContent = "";
    feedbackP.textContent = "";
    correctionsDiv.innerHTML = "";

    resultDiv.style.display = 'none';
    startScreen.style.display = 'block';
    quizContent.style.display = 'none';

    submitBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';
    prevBtn.style.display = 'none';
    restartBtn.style.display = 'none';

    document.getElementById('time').textContent = '00:00';

    themeButtons.forEach(btn => btn.classList.remove('selected'));
    usernameInput.value = username; // Keep the username

    currentQuestionIndex = 0;
});

submitBtn.addEventListener('click', function(e) {
    e.preventDefault();

    // Save answer for the last question
    saveCurrentAnswer();

    clearInterval(timerInterval);
    clearInterval(questionTimer);

    calculateAndDisplayResults();

    resultDiv.style.display = 'block';
    restartBtn.style.display = 'inline-block';
    submitBtn.style.display = 'none';
    quizContent.style.display = 'none';

    loadQuizHistory();
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestion(index) {
    const question = currentQuizData[index];

    // Update question counter
    currentQuestionEl.textContent = index + 1;

    // question HTML
    let questionHTML = `
        <div class="quiz-question">
            <div class="question-text">${index + 1}) ${question.question}</div>
            ${question.multipleAnswers ? '<div class="multi-answer">Plusieurs réponses possibles</div>' : ''}
            <ul class="options-list">
    `;

    //  options
    question.options.forEach((option, i) => {
        const inputType = question.multipleAnswers ? 'checkbox' : 'radio';
        const isChecked = userAnswers[index].includes(i) ? 'checked' : '';

        questionHTML += `
            <li class="option-item">
                <input type="${inputType}" id="q${index}o${i}" name="question${index}" value="${i}" ${isChecked}>
                <label for="q${index}o${i}">${option}</label>
            </li>
        `;
    });

    questionHTML += `</ul></div>`;

    // Update the quiz form
    quizForm.innerHTML = questionHTML;

    // Start timer for this question
    startQuestionTimer();
}

function saveCurrentAnswer() {
    const question = currentQuizData[currentQuestionIndex];
    const inputs = document.querySelectorAll(`input[name="question${currentQuestionIndex}"]:checked`);

    if (inputs.length > 0) {
        userAnswers[currentQuestionIndex] = Array.from(inputs).map(input => parseInt(input.value));
    }
}

// Start overall timer
function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        document.getElementById('time').textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2,'0')}`;
    }, 1000);
}

// Start timer for current question
function startQuestionTimer() {
    let timeLeft = timePerQuestion;
    questionTimeEl.textContent = timeLeft;
    questionProgressEl.style.width = '100%';

    // Clear any existing timer
    clearInterval(questionTimer);

    questionTimer = setInterval(() => {
        timeLeft--;
        questionTimeEl.textContent = timeLeft;
        questionProgressEl.style.width = `${(timeLeft / timePerQuestion) * 100}%`;

        if (timeLeft <= 0) {
            clearInterval(questionTimer);

            // When time is up, auto-move to next question or submit if on last question
            if (currentQuestionIndex < currentQuizData.length - 1) {
                nextBtn.click();
            } else {
                submitBtn.click();
            }
        }
    }, 1000);
}

// Calculate and display results
function calculateAndDisplayResults() {
    let score = 0;
    let corrections = '';

    currentQuizData.forEach((q, i) => {
        const userAns = userAnswers[i] || [];
        const correctAns = q.answer;

        // Check if arrays are identical (same values, same order doesn't matter)
        const isCorrect =
            userAns.length === correctAns.length &&
            correctAns.every(ans => userAns.includes(ans));

        if (isCorrect) {
            score++;
        }
        if (!document.getElementById('download-pdf-btn')) {
        const pdfBtn = document.createElement(('button'));
        pdfBtn.id = 'download-pdf-btn';
        pdfBtn.textContent = 'Telecharger le rapport PDF';
        pdfBtn.className = 'btn';
        pdfBtn.onclick = downloadPDFReport;
        resultDiv.appendChild((pdfBtn));
    }

        // Build corrections HTML
        corrections += `<div class="question-result">
            <p><strong>Question ${i+1}:</strong> ${q.question}</p>
            <p class="${isCorrect ? 'correct' : 'incorrect'}">
                ${isCorrect ? '✓ Correct' : '✗ Incorrect'}
            </p>
            <p><strong>Votre réponse:</strong> ${
            userAns.length === 0 ?
                'Pas de réponse (temps écoulé)' :
                userAns.map(ans => q.options[ans]).join(', ')
        }</p>
            <p><strong>Réponse correcte:</strong> ${correctAns.map(ans => q.options[ans]).join(', ')}</p>
        </div>`;
    });

    correctionsDiv.innerHTML = corrections;

    // Display score and feedback
    scoreP.textContent = `Score : ${score} / ${currentQuizData.length}`;

    let feedback = '';
    if (score >= 8) feedback = 'Excellent !';
    else if (score >= 5) feedback = 'Peut mieux faire !';
    else feedback = "Reviser encore";

    const timeObj = stopTimer();
    const timeStr = `${timeObj.minutes} min ${timeObj.seconds} sec`;

    feedbackP.textContent = `${feedback}, temps passé dans le quiz ${timeStr}`;

    // Save result to local storage
    saveQuizResult(score, timeObj);
}

// Stop overall timer
function stopTimer() {
    clearInterval(timerInterval);
    const elapsed = Date.now() - startTime;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    return {minutes, seconds};
}

// Save quiz result to local storage
function saveQuizResult(score, timeObj) {
    const result = {
        username: username,
        theme: selectedTheme,
        score: score,
        total: currentQuizData.length,
        date: new Date().toLocaleString(),
        time: `${timeObj.minutes}m ${timeObj.seconds}s`,
        answers: userAnswers.map((ans, i) => ({
            question: currentQuizData[i].question,
            userAnswer: ans || [],
            correctAnswer: currentQuizData[i].answer
        }))
    };

    let history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    history.push(result);
    localStorage.setItem('quizHistory', JSON.stringify(history));
}
// Load quiz history from local storage
function loadQuizHistory() {
    const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');

    historyDiv.innerHTML = '';

    if (history.length === 0) {
        historyDiv.innerHTML = '<p>Aucun historique disponible</p>';
        return;
    }

    // Sort history by date (newest first)
    history.sort((a, b) => new Date(b.date) - new Date(a.date));

    history.forEach(entry => {
        const item = document.createElement('div');
        item.className = 'history-item';
        item.innerHTML = `
            <strong>${entry.username}</strong> - ${entry.theme} - 
            Score: ${entry.score}/${entry.total} - 
            ${entry.date} (${entry.time})
        `;
        historyDiv.appendChild(item);
    });
}

function downloadPDFReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`Rapport de quiz`, 10, 15);
    doc.setFontSize(12);
    doc.text(`Utilisateur: ${username}`,10,25);
    doc.text(`Theme: ${selectedTheme}`,10,32);
    doc.text(`Score: ${scoreP.textContent}`,10,39);
    doc.text(`Feedback: ${feedbackP.textContent}`, 10, 46);

    let y = 56;
    currentQuizData.forEach((q, i) => {
        doc.setFontSize(11);
        doc.text(`${i + 1}) ${q.question}`, 10, y);
        y += 6;
        doc.text(`Votre réponse: ${userAnswers[i].map(ans => q.options[ans]).join(', ') || 'Aucune'}`, 12, y);
        y += 6;
        doc.text(`Réponse correcte: ${q.answer.map(ans => q.options[ans]).join(', ')}`, 12, y);
        y += 8;
        if (y > 270) { doc.addPage(); y = 15; }
    });
    doc.save(`quiz-rapport-${username}.pdf`);
}

// afficher le dernier score dans la partie frontend
const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
if (history.length > 0) {
    const lastResult = history[history.length - 1];
    document.getElementById('score-front').textContent =
        ` ${lastResult.score} / ${lastResult.total} dans la thematic ${lastResult.theme}`;
    document.querySelector('.front-score').style.display= "block";
}


// thing for documentaion
// dataset,
// toLocaleString,
// Math.floor,
// includes,
// padStart,
// parseInt,