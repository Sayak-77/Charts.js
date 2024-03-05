// Placeholder data
let placeholderData = [30, 50, 40, 70, 20];

// Function to create charts
function createCharts() {
    let dataInput = document.getElementById('data').value;
    let data;

    // If user input is empty, use placeholder data
    if (dataInput.trim() === '') {
        data = placeholderData;
    } else {
        data = dataInput.split(',').map(Number);
        placeholderData = data; // Update placeholder data
    }

    // Clear previous charts
    clearCharts();

    // Create bar chart
    new Chart(document.getElementById('barChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: data.map((_, index) => 'Category ' + (index + 1)),
            datasets: [{
                label: 'Values',
                data: data,
                backgroundColor: '#7077A1', // Blue bars
                borderColor: '#1a1a1a', // Border color
                borderWidth: 2,
                hoverOffset: 4
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    },
                    font:{
                        fontFamily:'Arial'
                    }
                }],
                x: {
                    ticks: {
                        fontFamily: 'Times New Roman, Times, serif', // Set the font family for x-axis ticks
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        fontFamily: 'Times New Roman, Times, serif', // Set the font family for legend labels
                    }
                }
            }
        }
    });

    // Create pie chart
    new Chart(document.getElementById('pieChart').getContext('2d'), {
        type: 'pie',
        data: {
            labels: data.map((_, index) => 'Category ' + (index + 1)),
            datasets: [{
                label: 'Values',
                data: data,
                backgroundColor: ['#7077A1', '#4D4C7D', '#827397', '#D8B9C3', '#FFDD93', '#334756', '#F5E8C7', '#232D3F'], // Different colors for segments
                borderColor: '#fff', // Border color
                borderWidth: 1
            }]
        }
    });

    // Create line chart
    new Chart(document.getElementById('lineChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: data.map((_, index) => 'Category ' + (index + 1)),
            datasets: [{
                label: 'Values',
                data: data,
                fill: false,
                borderColor: '#7077A1', // Line color
                borderWidth: 3
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    // Calculate and display central tendency with animation
    setTimeout(() => { // Delay to allow chart animations to complete
        document.getElementById('mean').querySelector('span:nth-child(2)').textContent = calculateMean(data);
    }, 500);
    setTimeout(() => {
        document.getElementById('median').querySelector('span:nth-child(2)').textContent = calculateMedian(data);
    }, 1000);
    setTimeout(() => {
        document.getElementById('mode').querySelector('span:nth-child(2)').textContent = calculateMode(data);
    }, 1500);
}

// Function to clear previous charts
function clearCharts() {
    Chart.helpers.each(Chart.instances, function (instance) {
        instance.destroy();
    });
}

// Function to calculate mean
function calculateMean(data) {
    const sum = data.reduce((acc, curr) => acc + curr, 0);
    return (sum / data.length).toFixed(2);
}

// Function to calculate median
function calculateMedian(data) {
    const sortedData = data.slice().sort((a, b) => a - b);
    const mid = Math.floor(sortedData.length / 2);
    return sortedData.length % 2 !== 0 ? sortedData[mid] : ((sortedData[mid - 1] + sortedData[mid]) / 2).toFixed(2);
}

// Function to calculate mode
function calculateMode(data) {
    const freqMap = {};
    data.forEach(num => {
        freqMap[num] = (freqMap[num] || 0) + 1;
    });
    const maxFreq = Math.max(...Object.values(freqMap));
    return Object.keys(freqMap).filter(key => freqMap[key] === maxFreq).join(', ');
}

// Call createCharts initially with placeholder data
createCharts();