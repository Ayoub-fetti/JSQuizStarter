document.addEventListener("DOMContentLoaded", () => {
    // Create and initialize the QuizUI
    const quizUI = new QuizUI()
    window.quizUI = quizUI
    quizUI.init()

    // Display the last score if available
    const lastResult = Quiz.getLastQuizResult()
    if (lastResult) {
        document.getElementById("score-front").textContent =
            ` ${lastResult.score} / ${lastResult.total} dans la thematic ${lastResult.theme}`
        document.querySelector(".front-score").style.display = "block"
    }
})
