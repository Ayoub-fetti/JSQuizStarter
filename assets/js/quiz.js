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

    static getLastQuizResult() {
        const history = QuizStats.getQuizHistory();
        return history.length > 0 ? history[0] : null;
    }

    static async loadQuizData(theme) {
        try {
            const response = await fetch(`./data/${theme}.json`);

            const data = await response.json();
            console.log(`Questions chargées pour ${theme}:`, data);
            return data;
        } catch (error) {
            console.error(`Erreur lors du chargement des questions ${theme}:`, error);
            throw error;
        }
    }

    saveProgress() {
        QuizStorage.saveProgress(this);
    }

    static  hasProgress(username, theme) {
        return QuizStorage.hasProgress(username, theme);
    }

    static loadProgress() {
        return QuizStorage.loadProgress();
    }

    static  clearProgress() {
        QuizStorage.clearProgress();
    }



}
window.Quiz = Quiz;