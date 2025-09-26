class QuizStats {
    static getQuizHistory() {
        const history = JSON.parse(localStorage.getItem("quizHistory") || "[]")
        // Sort history by date (newest first)
        return history.sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    // calculer le nombre de parties par thematique
    static getGamesBytheme() {
        const history = this.getQuizHistory()
        const stats = {}

        history.forEach((result) => {
            stats[result.theme] = (stats[result.theme] || 0) + 1
        })
        return stats
        console.log(stats)
    }

    // statistic pour la moyen
    static getAverageScoreByTheme() {
        const history = this.getQuizHistory()
        const themeStats = {}
        history.forEach((result) => {
            const theme = result.theme
            const percentage = (result.score / result.total) * 100
            if (!themeStats[theme]) {
                themeStats[theme] = { total: 0, count: 0 }
            }
            themeStats[theme].total += percentage
            themeStats[theme].count++
        })
        const averages = {}
        Object.keys(themeStats).forEach((theme) => {
            averages[theme] = Math.round(themeStats[theme].total / themeStats[theme].count)
        })
        return averages
        console.log(averages)
    }

    // retourn les top trois scores
    static getTopScores() {
        const history = this.getQuizHistory()
        const userBestScores = {}
        history.forEach((result) => {
            const percentage = (result.score / result.total) * 100
            const user = result.username

            if (!userBestScores[user] || percentage > userBestScores[user].percentage) {
                userBestScores[user] = {
                    username: user,
                    percentage: percentage,
                    score: result.score,
                    total: result.total,
                    theme: result.theme,
                    date: result.date,
                }
            }
        })
        return Object.values(userBestScores)
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 3)
        console.log(userBestScores)
    }
}
window.QuizStats = QuizStats
