
import Chart from 'chart.js/auto';

document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('skillsChart');
    if (!ctx) return;

    const skillsChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Data Analysis', 'Project Management', 'Adobe Suite', 'MS Office', 'R Programming', 'Leadership'],
            datasets: [{
                label: 'Skill Level',
                data: [90, 75, 85, 95, 80, 85],
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                borderColor: 'rgba(99, 102, 241, 1)',
                pointBackgroundColor: 'rgba(99, 102, 241, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(99, 102, 241, 1)'
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: {
                        stepSize: 20,
                        font: {
                            family: 'Poppins'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            elements: {
                line: {
                    tension: 0.4
                }
            }
        }
    });
});
