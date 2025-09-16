
    const quizData = [
    {
        question : "Quelle est la sortie de ce code ? console.log(typeof null)",
        options : ["null","undefined","object","boolean"],
        answer : 2
    },
    {
        question : "Comment déclarer une variable en JavaScript qui ne peut pas être réassignée ?",
        options : ["var myVar = 5","let myVar = 5 ", "const myVar = 5", "final myVar = 5"],
        answer: 2
    },
    {
        question : "Quelle méthode permet d'ajouter un élément à la fin d'un tableau ?",
        options : ["array.add()","array.append()","array.insert()","array.push()"],
        answer: 3
    },
    {
        question : "Que retourne cette expression ? `5` + 3",
        options : [8,`'53'`,53,"Une erreur",],
        answer: 1
    },
    {
        question : "Comment sélectionner un élément HTML par son ID en JavaScript ?",
        options : ["document.getElementByClass(`myId`)", "document.querySelector(`#myId`)", "document.getElement(`myId`)", "document.findById(`myId`)"],
        answer: 1 
    },
    {
        question : "Quelle est la différence entre == et === en JavaScript ?",
        options : ["Aucune différence","== compare les valeurs, === compare les valeurs et les types","=== compare seulement les valeurs","== est plus rapide que ==="],
        answer: 1 
    },
    {
        question : "Comment créer une fonction en JavaScript ?",
        options : ["function myFunction() {}", "def myFunction() {}", "create function myFunction() {}", "func myFunction() {}"],
        answer:  0
    },
    {
        question : "Que fait la méthode Array.map() ?",
        options : ["Modifie le tableau original","Filtre les éléments du tableau","Crée un nouveau tableau avec les résultats d'une fonction appliquée à chaque élément"," Trie le tableau"],
        answer: 2
    },
    {
        question : "Comment gérer les erreurs en JavaScript ?",
        options : ["try...catch","if...else","switch...case","for...in"],
        answer: 0
    },
    {
        question : "Comment créer un objet vide en JavaScript ?",
        options : ["let obj = [];","let obj = {};","let obj = null;","let obj = new Array();"],
        answer: 1
    },
];

const quizForm = document.getElementById('quiz-form');
const submitBtn = document.getElementById('submit-btn');
const resultDiv = document.querySelector('.result');
const scoreP = document.getElementById('score');
const feedbackP = document.getElementById('feedback');
const restartBtn = document.getElementById('restart-btn');
let startTime, timerInterval;

restartBtn.addEventListener('click', function() {
    clearInterval(timerInterval);
    scoreP.textContent = "";
    feedbackP.textContent = "";
    resultDiv.style.display = 'none';
    submitBtn.disabled = false;
    restartBtn.style.display = 'none';
    document.getElementById('time').textContent ='00:00';
    StartQuiz();
    window.scroll({top: 0, behavior: 'smooth'});
});


// function pour afficher les questions 
function random(array) {
    for (let i = array.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// afficher les questions de quiz 

function StartQuiz() {
    quizForm.innerHTML = '';
    random(quizData);
    quizData.forEach((q, i) => {
        const fieldset = document.createElement('fieldset');
        const legend =  document.createElement('legend');
        legend.textContent = `${i+1}) ${q.question}`;
        legend.style.color = 'blue';
        legend.style.fontWeight = 'bold'
        fieldset.appendChild(legend);

        q.options.forEach((opt,j) => {
            const label = document.createElement('label');
            label.style.display = 'block';
            const input = document.createElement('input');
            input.type ='radio';
            input.name = `question${i}`;
            input.value = j;
            label.appendChild(input);
            label.appendChild(document.createTextNode(opt));
            fieldset.appendChild(label);
        });
        quizForm.appendChild(fieldset);
    });
    startTimer()
}
StartQuiz();

// calcul score && feedback

submitBtn.addEventListener('click' , function(e) {
    e.preventDefault();
    let score = 0;
    quizData.forEach((q,i) => {
        const selected = quizForm.querySelector(`input[name="question${i}"]:checked`);
        if (selected && Number(selected.value) === q.answer) {
            score++;
            console.log(score);
            
        }
    });
    scoreP.textContent = `Score : ${score} / ${quizData.length}`;
    let feedback = '';
    if (score >= 8) feedback = 'Excellent !';
    else if (score >= 5) feedback = 'Peut mieux faire !';
    else feedback = "Reviser encore";

    const timeObj = stopTimer();
    const timeStr = `${timeObj.minutes} min ${timeObj.seconds} sec`;
    
    feedbackP.textContent = `${feedback} Répondu en ${timeStr}`;

    resultDiv.style.display = 'block';
    restartBtn.style.display = 'block';
    submitBtn.disabled = true;
});

// function pour demarer le temps 

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

// function pour stoper le temps

function stopTimer() {
    clearInterval(timerInterval);
    const elapsed = Date.now() - startTime;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    return {minutes , seconds};
}
