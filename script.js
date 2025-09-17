// Quiz data for different themes
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
            options: ["<link>", "<a>", "<href>", "<url>"],
            answer: [1],
            multipleAnswers: false
        },
        {
            question: "Quelle balise est utilisée pour insérer une image ?",
            options: ["<img>", "<picture>", "<image>", "<src>"],
            answer: [0],
            multipleAnswers: false
        },
        {
            question: "Quelle balise HTML5 définit la navigation principale ?",
            options: ["<menu>", "<nav>", "<navigation>", "<header>"],
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
            options: ["<tab>", "<table>", "<tbl>", "<grid>"],
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
            options: ["<input>", "<form>", "<fieldset>", "<submit>"],
            answer: [1],
            multipleAnswers: false
        },
        {
            question: "Quelles balises peuvent être utilisées pour créer des listes ?",
            options: ["<ul>", "<ol>", "<dl>", "<list>"],
            answer: [0, 1, 2],
            multipleAnswers: true
        },
        {
            question: "Quelle balise est utilisée pour définir le titre d'une page web ?",
            options: ["<head>", "<title>", "<header>", "<h1>"],
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
const feedbackP =  document.getElementById('feedback');
const restartBtn = document.getElementById('restart-btn');
const startBtn = document.getElementById('start-btn');
const themeButtons = document.querySelector('.them-btn');
const usernameInput = document.getElementById('username');
const questionTimeEl = document.getElementById('question-time');
const questionProgressEl = document.getElementById('question-progress');
const correctonsDiv = document.getElementById('corrections');
const historyDiv = document.getElementById('history');
const currentQuestionEl = document.getElementById('current-question');
const totalQuestionsEl = document.getElementById('total-questions');

//variables global
let selectedTheme = '';
let username = '';
let currentQuizData = [];
let userAnswers = [];
let currentQuestionIndex = 0;
let startTime, timerInterval = 0;
let questionTimer;
let timerQuestion = 20; 

//theme selection

themeButtons.forEach(button => {
    button.addEventListener('click', function() {
        themeButtons.forEach(btn => btn.classList.remove('selected'));
        this.classList.add('selected');
        selectedTheme = this.dataset.theme;
    })
});

// function pour afficher les questions 
function shuffleArray(array) {
    for (let i = array.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// start the quiz 

startBtn.addEventListener('click' , function() {
    username = usernameInput.ariaValueMax.trim();
    if (!username) {
        alert('Veuiller entrer un pseudo');
        return;
    }
    if (!selectedTheme) {
        alert('Veuiller selectionner une thématique');
        return;
    }
    startScreen.style.display = 'none';
    quizContent.style.display = 'block';

    currentQuizData = [...quizThemes[selectedTheme]];
    shuffleArray(currentQuizData);
    userAnswers = Array(currentQuizData.length).fill([]);
    currentQuestionIndex = 0;

    // Update total questions count
    totalQuestionsEl.textContent = currentQuizData.length;
    displayQuestion(currentQuestionIndex);
    startTimer(); 
});

// next question button
nextBtn.addEventListener('click', function() {
    saveCurrentAnswer();
    clearInterval(questionTimer);

    // move to the next question
    if (currentQuestionIndex < currentQuizData.length - 1) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);

        // show previous button if not first question
        prevBtn.style.display = 'inline-block';

        // show submit btn if on last ques or next btn if not the last
        if (currentQuestionIndex === currentQuizData.length -1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        }
    }
});

// previous question button
prevBtn.addEventListener('click', function() {
    saveCurrentAnswer();
    clearInterval(questionTimer);
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion(currentQuestionIndex);
        // hide privious button if on first
        if (currentQuestionIndex === 0) {
            prevBtn.style.display = 'none';
        }
        // show next button and hide submit button
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
    }
});


