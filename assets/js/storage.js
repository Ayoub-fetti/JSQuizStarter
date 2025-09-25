class QuizStorage {
    static saveProgress(quiz) {
        const progress = {
            username: quiz.username,
            theme: quiz.theme,
            questions: quiz.questions,
            userAnswers: quiz.userAnswers,
            currentQuestionIndex: quiz.currentQuestionIndex,
            startTime: quiz.startTime,
            timestamp: Date.now()
        };
        localStorage.setItem('quizProgress', JSON.stringify(progress));
    }
    static  loadProgress() {
        const saved = localStorage.getItem('quizProgress');
        return saved ?JSON.parse(saved) : null;
    }
    static  clearProgress() {
        localStorage.removeItem('quizProgress');
    }
    static  hasProgress(username, theme) {
        const progress = this.loadProgress();
        return progress && progress.username === username && progress.theme === theme;
    }
    static  saveResult(result) {
        let history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
        history.push(result);
        localStorage.setItem('quizHistory', JSON.stringify(history));
    }
    static  getHistory() {
        return JSON.parse(localStorage.getItem('quizHistory') || '[]');
    }
}
window.QuizStorage = QuizStorage;