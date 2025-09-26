class QuizUI {
    constructor() {
        this.startScreen = document.getElementById("start-screen")
        this.quizContent = document.getElementById("quiz-content")
        this.quizForm = document.getElementById("quiz-form")
        this.submitBtn = document.getElementById("submit-btn")
        this.nextBtn = document.getElementById("next-btn")
        this.resultDiv = document.querySelector(".result")
        this.scoreP = document.getElementById("score")
        this.feedbackP = document.getElementById("feedback")
        this.restartBtn = document.getElementById("restart-btn")
        this.startBtn = document.getElementById("start-btn")
        this.themeButtons = document.querySelectorAll(".theme-btn")
        this.usernameInput = document.getElementById("username")
        this.questionTimeEl = document.getElementById("question-time")
        this.questionProgressEl = document.getElementById("question-progress")
        this.correctionsDiv = document.getElementById("corrections")
        this.historyDiv = document.getElementById("history")
        this.currentQuestionEl = document.getElementById("current-question")
        this.totalQuestionsEl = document.getElementById("total-questions")
        this.timeEl = document.getElementById("time")

        this.quiz = null
        this.questionTimerInterval = null
        this.quizTimerInterval = null
    }

    init() {
        this.themeButtons.forEach((button) => {
            button.addEventListener("click", () => this.selectTheme(button))
        })

        this.startBtn.addEventListener("click", () => this.startQuiz())
        this.nextBtn.addEventListener("click", () => this.goToNextQuestion())
        this.restartBtn.addEventListener("click", () => this.restartQuiz())
        this.submitBtn.addEventListener("click", (e) => this.submitQuiz(e))

        this.displayLastScore()
        this.checkForInterruptedQuiz()
    }

    async startQuiz() {
        const username = this.usernameInput.value.trim()
        const selectedTheme = this.getSelectedTheme()

        if (!username) {
            Swal.fire("Oops", "Veuillez entrer un pseudo")
            return
        }
        if (!selectedTheme) {
            Swal.fire("Oops", "Veuillez sélectionner une thématique")
            return
        }

        if (QuizStorage.hasProgress(username, selectedTheme)) {
            const result = await Swal.fire({
                title: "Partie en cours",
                text: `Une partie ${selectedTheme} est en cours. Voulez-vous la reprendre ?`,
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Reprendre",
                cancelButtonText: "Nouveau quiz",
            })
            if (result.isConfirmed) {
                this.resumeQuiz()
                return
            } else {
                QuizStorage.clearProgress()
            }
        }

        try {
            const quizData = await Quiz.loadQuizData(selectedTheme)
            this.quiz = new Quiz(quizData, selectedTheme, username)

            this.startScreen.style.display = "none"
            this.quizContent.style.display = "block"
            this.totalQuestionsEl.textContent = this.quiz.questions.length

            this.displayQuestion(0)
            this.startQuizTimer()
            this.startQuestionTimer()
        } catch (error) {
            Swal.fire("Erreur", `Erreur lors du chargement du quiz: ${error.message}`)
        }
    }

    resumeQuiz() {
        const progress = QuizStorage.loadProgress()

        this.quiz = new Quiz([], progress.theme, progress.username)
        this.quiz.questions = progress.questions
        this.quiz.userAnswers = progress.userAnswers
        this.quiz.currentQuestionIndex = progress.currentQuestionIndex
        this.quiz.startTime = progress.startTime

        this.startScreen.style.display = "none"
        this.quizContent.style.display = "block"
        this.totalQuestionsEl.textContent = this.quiz.questions.length

        this.displayQuestion(this.quiz.currentQuestionIndex)
        this.startQuizTimer()
        this.startQuestionTimer()

        if (this.quiz.isLastQuestion()) {
            this.nextBtn.style.display = "none"
            this.submitBtn.style.display = "inline-block"
        }
    }

    restartQuiz() {
        // Clear timers and reset UI
        this.clearQuizTimer()
        this.clearQuestionTimer()

        this.scoreP.textContent = ""
        this.feedbackP.textContent = ""
        this.correctionsDiv.innerHTML = ""

        this.resultDiv.style.display = "none"
        this.startScreen.style.display = "block"
        this.quizContent.style.display = "none"

        this.submitBtn.style.display = "none"
        this.nextBtn.style.display = "inline-block"
        this.restartBtn.style.display = "none"

        this.timeEl.textContent = "00:00"

        // Reset theme selection but keep username
        this.themeButtons.forEach((btn) => btn.classList.remove("selected"))
        this.usernameInput.value = this.quiz ? this.quiz.username : ""
    }

    selectTheme(button) {
        this.themeButtons.forEach((btn) => btn.classList.remove("selected"))
        button.classList.add("selected")
    }

    getSelectedTheme() {
        const selectedButton = document.querySelector(".theme-btn.selected")
        return selectedButton ? selectedButton.dataset.theme : ""
    }

    displayQuestion(index) {
        const question = this.quiz.getCurrentQuestion()

        // Update question counter
        this.currentQuestionEl.textContent = index + 1

        // Create question HTML
        let questionHTML = `
            <div class="quiz-question">
                <div class="question-text">${index + 1}) ${question.question}</div>
                ${question.multipleAnswers ? '<div class="multi-answer">Plusieurs réponses possibles</div>' : ""}
                <ul class="options-list">
        `

        // Add options
        question.options.forEach((option, i) => {
            const inputType = question.multipleAnswers ? "checkbox" : "radio"
            const isChecked = this.quiz.userAnswers[index].includes(i) ? "checked" : ""

            questionHTML += `
                <li class="option-item">
                    <label>
                        <input type="${inputType}" id="q${index}o${i}" name="question${index}" value="${i}" ${isChecked}>
                        ${option}
                    </label>
                </li>
            `
        })

        questionHTML += `</ul><div id="instant-feedback" class="instant-feedback"></div></div>`

        // Update form
        this.quizForm.innerHTML = questionHTML
        this.addInstantVerification(index)
    }

    // verifier les reponse avec une validation instantane
    addInstantVerification(index) {
        const inputs = document.querySelectorAll(`input[name="question${index}"]`)
        const feedbackDiv = document.getElementById("instant-feedback")
        const question = this.quiz.getCurrentQuestion()

        if (question.multipleAnswers) {
            const validateBtn = document.createElement("button")
            validateBtn.textContent = "Valider mes reponses"
            validateBtn.className = "validate-btn"
            validateBtn.style.cssText =
                "background-color: #7c3aed; color: white; padding: 8px 16px; border: none; border-radius: 4px; margin-top: 10px; cursor: pointer;"

            feedbackDiv.appendChild(validateBtn)

            validateBtn.addEventListener("click", () => {
                inputs.forEach((inp) => (inp.disabled = true))
                validateBtn.disabled = true

                const selectedAnswers = Array.from(document.querySelectorAll(`input[name="question${index}"]:checked`)).map(
                    (inp) => Number.parseInt(inp.value),
                )
                const correctAnswers = question.answer
                const isCorrect =
                    selectedAnswers.length === correctAnswers.length &&
                    correctAnswers.every((ans) => selectedAnswers.includes(ans))

                feedbackDiv.innerHTML = `<p class="${isCorrect ? "correct" : "incorrect"}">
            ${isCorrect ? "✓ Correct !" : "✗ Incorrect !"}
            </p>`
            })
        } else {
            inputs.forEach((input) => {
                input.addEventListener("change", () => {
                    inputs.forEach((inp) => (inp.disabled = true))

                    const selectedAnswers = Array.from(document.querySelectorAll(`input[name="question${index}"]:checked`)).map(
                        (inp) => Number.parseInt(inp.value),
                    )
                    const correctAnswers = this.quiz.getCurrentQuestion().answer
                    const isCorrect =
                        selectedAnswers.length === correctAnswers.length &&
                        correctAnswers.every((ans) => selectedAnswers.includes(ans))
                    feedbackDiv.innerHTML = `<p class="${isCorrect ? "correct" : "incorrect"}">
            ${isCorrect ? "✓ Correct !" : "✗ Incorrect !"}
            </p>`
                })
            })
        }
    }

    saveCurrentAnswer() {
        const inputs = document.querySelectorAll(`input[name="question${this.quiz.currentQuestionIndex}"]:checked`)
        if (inputs.length > 0) {
            const answers = Array.from(inputs).map((input) => Number.parseInt(input.value))
            this.quiz.saveAnswer(answers)
        }
    }

    goToNextQuestion() {
        this.saveCurrentAnswer()
        this.quiz.saveProgress()
        this.clearQuestionTimer()

        if (this.quiz.nextQuestion()) {
            this.displayQuestion(this.quiz.currentQuestionIndex)

            if (this.quiz.isLastQuestion()) {
                this.nextBtn.style.display = "none"
                this.submitBtn.style.display = "inline-block"
            }

            this.startQuestionTimer()
        }
    }

    checkForInterruptedQuiz() {
        const progress = QuizStorage.loadProgress()
        if (progress) {
            this.usernameInput.value = progress.username
            this.selectThemeByName(progress.theme)
        }
    }

    selectThemeByName(themeName) {
        this.themeButtons.forEach((btn) => {
            btn.classList.remove("selected")
            if (btn.dataset.theme === themeName) {
                btn.classList.add("selected")
            }
        })
    }

    submitQuiz(e) {
        e.preventDefault()

        this.saveCurrentAnswer()
        this.clearQuestionTimer()
        this.clearQuizTimer()

        const timeObj = this.quiz.getElapsedTime()
        const results = this.quiz.calculateResults()

        this.quiz.saveResult(results.score, timeObj)
        QuizStorage.clearProgress()

        this.displayResults(results, timeObj)

        this.resultDiv.style.display = "block"
        this.restartBtn.style.display = "inline-block"
        this.submitBtn.style.display = "none"
        this.quizContent.style.display = "none"

        this.displayQuizHistory()

        if (window.QuizChart) {
            QuizChart.initCharts()
        }
    }

    displayResults(results, timeObj) {
        // Create corrections HTML
        let correctionsHTML = ""
        results.details.forEach((result, i) => {
            correctionsHTML += `
                <div class="question-result">
                    <p><strong class="q-r">Question ${i + 1}:</strong> ${result.question}</p>
                    <p class="${result.isCorrect ? "correct" : "incorrect"}">
                        ${result.isCorrect ? "✓ Correct" : "✗ Incorrect"}
                    </p>
                    <p><strong>Votre réponse:</strong> ${
                result.userAnswer.length === 0
                    ? "Pas de réponse (temps écoulé)"
                    : result.userAnswer.map((ans) => result.options[ans]).join(", ")
            }</p>
                    <p><strong>Réponse correcte:</strong> ${result.correctAnswer
                .map((ans) => result.options[ans])
                .join(", ")}</p>
                </div>
            `
        })

        this.correctionsDiv.innerHTML = correctionsHTML

        // Display score and feedback
        this.scoreP.textContent = `Score : ${results.score} / ${results.total}`

        let feedback = ""
        if (results.score >= 8) feedback = "Excellent !"
        else if (results.score >= 5) feedback = "Peut mieux faire !"
        else feedback = "Reviser encore"

        const timeStr = `${timeObj.minutes} min ${timeObj.seconds} sec`
        this.feedbackP.textContent = `${feedback}, temps passé dans le quiz ${timeStr}`

        if (!document.getElementById("download-pdf-btn")) {
            const exportContainer = document.createElement("div");
            exportContainer.style.cssText = "display: flex; gap: 0.75rem; justify-content: center; margin-top: 1rem;";

            const pdfBtn = document.createElement("button");
            pdfBtn.id = "download-pdf-btn";
            pdfBtn.innerHTML = "📄 Rapport PDF";
            pdfBtn.className = "btn";
            pdfBtn.onclick = () => this.downloadPDFReport();

            const csvBtn = document.createElement("button");
            csvBtn.id = "download-csv-btn";
            csvBtn.innerHTML = "📊 Rapport CSV";
            csvBtn.onclick = () => this.showCSVExportModal();

            exportContainer.appendChild(pdfBtn);
            exportContainer.appendChild(csvBtn);
            this.resultDiv.appendChild(exportContainer);
        }
    }

    displayQuizHistory() {
        const history = QuizStats.getQuizHistory()

        this.historyDiv.innerHTML = ""

        if (history.length === 0) {
            this.historyDiv.innerHTML = "<p>Aucun historique disponible</p>"
            return
        }
        this.historyDiv.innerHTML = this.displayStatistics()

        const historySection = document.createElement("div")

        history.forEach((entry) => {
            const item = document.createElement("div")
            item.className = "history-item"
            item.innerHTML = `
                <strong>${entry.username}</strong> - ${entry.theme} -
                Score: ${entry.score}/${entry.total} -
                ${entry.date} (${entry.time})
            `
            this.historyDiv.appendChild(item)
        })
        this.historyDiv.appendChild(historySection)
    }

    displayLastScore() {
        const lastResult = Quiz.getLastQuizResult()
        if (lastResult) {
            document.getElementById("score-front").textContent =
                ` ${lastResult.score} / ${lastResult.total} dans la thematic ${lastResult.theme}`
            document.querySelector(".front-score").style.display = "block"
        }
    }

    startQuizTimer() {
        this.quiz.startTimer()
        this.quizTimerInterval = setInterval(() => {
            const timeInfo = this.quiz.getElapsedTime()
            this.timeEl.textContent = timeInfo.formatted
        }, 1000)
    }

    startQuestionTimer() {
        let timeLeft = this.quiz.timePerQuestion
        this.questionTimeEl.textContent = timeLeft
        this.questionProgressEl.style.width = "100%"

        this.clearQuestionTimer()

        this.questionTimerInterval = setInterval(() => {
            timeLeft--
            this.questionTimeEl.textContent = timeLeft
            this.questionProgressEl.style.width = `${(timeLeft / this.quiz.timePerQuestion) * 100}%`

            if (timeLeft <= 0) {
                this.clearQuestionTimer()

                // Auto-move to next question or submit if on last question
                if (!this.quiz.isLastQuestion()) {
                    this.goToNextQuestion()
                } else {
                    this.submitQuiz(new Event("click"))
                }
            }
        }, 1000)
    }

    clearQuizTimer() {
        clearInterval(this.quizTimerInterval)
    }

    clearQuestionTimer() {
        clearInterval(this.questionTimerInterval)
    }

    downloadPDFReport() {
        const { jsPDF } = window.jspdf
        const doc = new jsPDF()

        doc.setFontSize(16)
        doc.text(`Rapport de quiz`, 10, 15)
        doc.setFontSize(12)
        doc.text(`Utilisateur: ${this.quiz.username}`, 10, 25)
        doc.text(`Theme: ${this.quiz.theme}`, 10, 32)
        doc.text(`Score: ${this.scoreP.textContent}`, 10, 39)
        doc.text(`Feedback: ${this.feedbackP.textContent}`, 10, 46)

        let y = 56
        this.quiz.questions.forEach((q, i) => {
            doc.setFontSize(11)
            doc.text(`${i + 1}) ${q.question}`, 10, y)
            y += 6
            doc.text(`Votre réponse: ${this.quiz.userAnswers[i].map((ans) => q.options[ans]).join(", ") || "Aucune"}`, 12, y)
            y += 6
            doc.text(`Réponse correcte: ${q.answer.map((ans) => q.options[ans]).join(", ")}`, 12, y)
            y += 8
            if (y > 270) {
                doc.addPage()
                y = 15
            }
        })

        doc.save(`quiz-rapport-${this.quiz.username}.pdf`)
    }

    displayStatistics() {
        const gamesByTheme = QuizStats.getGamesBytheme()
        const averagesByTheme = QuizStats.getAverageScoreByTheme()
        const topScores = QuizStats.getTopScores()

        let statsHTML = '<div class="statistics-section">'
        statsHTML += "<h4>Parties par thematique</h4>"
        Object.entries(gamesByTheme).forEach(([theme, count]) => {
            statsHTML += `<p>${theme}: ${count} partie(s)</p>`
        })
        statsHTML += "<h4>Score moyen par thematique</h4>"
        Object.entries(averagesByTheme).forEach(([theme, avg]) => {
            statsHTML += `<p>${theme}: ${avg}%</p>`
        })
        statsHTML += "<h4>Top 3 meilleurs scores</h4>"
        topScores.forEach((user, index) => {
            statsHTML += `<p>${index + 1}. ${user.username}: ${user.percentage}% (${user.theme})</p>`
        })
        statsHTML += `</div>`
        return statsHTML
    }

    showCSVExportModal() {
            const modal = document.createElement('div');
            modal.id = 'csv-modal';
            modal.className = 'csv-modal';
            modal.innerHTML = `
            <div class="csv-modal-content">
                <h3>Exporter en CSV</h3>
                <div class="csv-options">
                    <div class="csv-option">
                        <input type="checkbox" id="csv-basic" checked>
                        <label for="csv-basic">Informations de base (Utilisateur, Thème, Score)</label>
                    </div>
                    <div class="csv-option">
                        <input type="checkbox" id="csv-questions" checked>
                        <label for="csv-questions">Détails des questions</label>
                    </div>
                    <div class="csv-option">
                        <input type="checkbox" id="csv-answers">
                        <label for="csv-answers">Réponses utilisateur</label>
                    </div>
                    <div class="csv-option">
                        <input type="checkbox" id="csv-correct">
                        <label for="csv-correct">Réponses correctes</label>
                    </div>
                    <div class="csv-option">
                        <input type="checkbox" id="csv-time">
                        <label for="csv-time">Temps de réponse</label>
                    </div>
                </div>
                <div class="csv-modal-buttons">
                    <button onclick="this.closest('.csv-modal').style.display='none'" class="btn">Annuler</button>
                    <button onclick="quizUI.downloadCSVReport()" class="btn" style="background: var(--primary); color: white;">Télécharger</button>
                </div>
            </div>
        `;
            document.body.appendChild(modal);


        document.getElementById('csv-modal').style.display = 'flex';
    }

    downloadCSVReport() {
        const options = {
            basic: document.getElementById('csv-basic').checked,
            questions: document.getElementById('csv-questions').checked,
            answers: document.getElementById('csv-answers').checked,
            correct: document.getElementById('csv-correct').checked,
            time: document.getElementById('csv-time').checked
        };

        let csvContent = '';
        let headers = [];

        // Construire les en-têtes selon les options sélectionnées
        if (options.basic) {
            headers.push('Utilisateur', 'Theme', 'Score', 'Total');
        }
        if (options.time) {
            headers.push('Temps Total');
        }
        if (options.questions || options.answers || options.correct) {
            headers.push('Question', 'Votre Reponse', 'Reponse Correcte', 'Resultat');
        }

        csvContent += headers.join(',') + '\n';

        // Ajouter les données selon les options
        if (options.questions || options.answers || options.correct) {
            // Export détaillé par question
            this.quiz.questions.forEach((q, i) => {
                let row = [];

                if (options.basic) {
                    row.push(
                        `"${this.quiz.username}"`,
                        `"${this.quiz.theme}"`,
                        this.quiz.calculateResults().score,
                        this.quiz.questions.length
                    );
                }
                if (options.time) {
                    const timeObj = this.quiz.getElapsedTime();
                    row.push(`"${timeObj.formatted}"`);
                }

                if (options.questions) {
                    row.push(`"${q.question.replace(/"/g, '""')}"`);
                } else {
                    row.push('');
                }

                if (options.answers) {
                    const userAnswer = this.quiz.userAnswers[i].map(ans => q.options[ans]).join('; ');
                    row.push(`"${userAnswer}"`);
                } else {
                    row.push('');
                }

                if (options.correct) {
                    const correctAnswer = q.answer.map(ans => q.options[ans]).join('; ');
                    row.push(`"${correctAnswer}"`);
                } else {
                    row.push('');
                }

                const isCorrect = this.quiz.userAnswers[i].length === q.answer.length &&
                    q.answer.every(ans => this.quiz.userAnswers[i].includes(ans));
                row.push(isCorrect ? 'Correct' : 'Incorrect');

                csvContent += row.join(',') + '\n';
            });
        } else {
            // Export simple
            let row = [];
            if (options.basic) {
                row.push(
                    `"${this.quiz.username}"`,
                    `"${this.quiz.theme}"`,
                    this.quiz.calculateResults().score,
                    this.quiz.questions.length
                );
            }
            if (options.time) {
                const timeObj = this.quiz.getElapsedTime();
                row.push(`"${timeObj.formatted}"`);
            }
            csvContent += row.join(',') + '\n';
        }

        // telecharger le fichier
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `quiz-rapport-${this.quiz.username}.csv`;
        link.click();

        // close the modal
        document.getElementById('csv-modal').style.display = 'none';
    }
}
window.QuizUI = QuizUI
