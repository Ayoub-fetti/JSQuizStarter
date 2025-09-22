class Quiz {
    constructor(quizData, theme, username) {
        this.originalData = quizData;
        this.questions = [...quizData];
        this.theme = theme;
        this.username = username;
        this.userAnswers = Array(this.questions.length).fill([]);
        this.currentQuestionIndex = 0;
        this.timePerQuestion = 20;
        this.startTime = null;
        this.timerInterval = null;
        this.questionTimer = null;
        this.shuffleQuestions();
    }

    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    saveAnswer(answerIndices) {
        this.userAnswers[this.currentQuestionIndex] = answerIndices;
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            return true;
        }
        return false;
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            return true;
        }
        return false;
    }

    isFirstQuestion() {
        return this.currentQuestionIndex === 0;
    }

    isLastQuestion() {
        return this.currentQuestionIndex === this.questions.length - 1;
    }

    startTimer() {
        this.startTime = Date.now();
    }

    getElapsedTime() {
        const elapsed = Date.now() - this.startTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        return {
            minutes,
            seconds,
            formatted: `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        };
    }

    calculateResults() {
        let score = 0;
        const results = [];

        this.questions.forEach((q, i) => {
            const userAns = this.userAnswers[i] || [];
            const correctAns = q.answer;

            // Check if arrays match (same values, order doesn't matter)
            const isCorrect =
                userAns.length === correctAns.length &&
                correctAns.every(ans => userAns.includes(ans));

            if (isCorrect) {
                score++;
            }

            results.push({
                question: q.question,
                userAnswer: userAns,
                correctAnswer: correctAns,
                options: q.options,
                isCorrect: isCorrect
            });
        });

        return {
            score,
            total: this.questions.length,
            details: results
        };
    }

    saveResult(score, timeObj) {
        const result = {
            username: this.username,
            theme: this.theme,
            score: score,
            total: this.questions.length,
            date: new Date().toLocaleString(),
            time: `${timeObj.minutes}m ${timeObj.seconds}s`,
            answers: this.userAnswers.map((ans, i) => ({
                question: this.questions[i].question,
                userAnswer: ans || [],
                correctAnswer: this.questions[i].answer
            }))
        };

        let history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
        history.push(result);
        localStorage.setItem('quizHistory', JSON.stringify(history));

        return result;
    }

    static getQuizHistory() {
        const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
        // Sort history by date (newest first)
        return history.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    static getLastQuizResult() {
        const history = this.getQuizHistory();
        return history.length > 0 ? history[0] : null;
    }
}

// Export the quiz data
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

// Export
window.Quiz = Quiz;
window.quizThemes = quizThemes;
