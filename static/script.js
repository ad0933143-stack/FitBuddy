document.getElementById("fitnessForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        goal: document.getElementById("goal").value,
        level: document.getElementById("level").value,
        days: document.getElementById("days").value,
        time: document.getElementById("time").value
    };

    const response = await 
    fetch('/generate_plan', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    const resultBox = document.getElementById("result");

    resultBox.style.display = "block";

    resultBox.innerHTML = `
        <h3>🤖 FitBuddy Plan for ${result.name}</h3>
        <p><strong>🎯 Goal:</strong> ${result.goal}</p>
        <p><strong>📊 Level:</strong> ${result.level}</p>
        <p><strong>📅 Days:</strong> ${result.days} days/week</p>
        <p><strong>⏱️ Time:</strong> ${result.time} minutes</p>
        <p><strong>✅ ${result.message}</strong></p>
    `;
});
