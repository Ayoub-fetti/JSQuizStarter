document.addEventListener("DOMContentLoaded", () => {
    // creer et initialiser le quiz
    const quizUI = new QuizUI()
    window.quizUI = quizUI
    quizUI.init()

    // afficher le dernier score si il est disponible
    const lastResult = Quiz.getLastQuizResult()
    if (lastResult) {
        document.getElementById("score-front").textContent =
            ` ${lastResult.score} / ${lastResult.total} dans la thematic ${lastResult.theme}`
        document.querySelector(".front-score").style.display = "block"
    }
})
