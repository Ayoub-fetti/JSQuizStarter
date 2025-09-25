class QuizChart {
    static initCharts() {
        this.themeChartObj = this.createThemeChart();
        this.ScoreChartObj = this.createScoreChart();
    }

    static createThemeChart() {
        const themeData = QuizStats.getGamesBytheme();
        const ctx = document.getElementById('themeChart').getContext('2d');
        if (this.themeChartObj)
            this.themeChartObj.destroy()
        return new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(themeData),
                datasets: [{
                    data: Object.values(themeData),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Répartition par thématique'
                    }
                }
            }
        });
    }

    static createScoreChart() {
        const history = QuizStats.getQuizHistory().slice(0, 10).reverse();
        const ctx = document.getElementById('scoreChart').getContext('2d');
        if (this.ScoreChartObj)
            this.ScoreChartObj.destroy()
        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: history.map((_, index) => `Quiz ${index + 1}`),
                datasets: [{
                    label: 'Score (%)',
                    data: history.map(result => (result.score / result.total) * 100),
                    borderColor: '#36A2EB',
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Progression des scores'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
}

window.QuizChart = QuizChart;
