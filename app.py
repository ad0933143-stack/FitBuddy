import os
from flask import Flask, request, jsonify, render_template
from google import genai
from dotenv import load_dotenv
load_dotenv()
app = Flask(__name__)

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/generate_plan", methods=["POST"])
def generate_plan():
    data = request.get_json()  # ithu mukkiyam
    name = data.get("name")
    age = data.get("age")
    goal = data.get("goal")
    level = data.get("level")
    days = data.get("days")
    time = data.get("time")

    prompt = f"You are FitBuddy. Create fitness plan for Age {age}, Goal {goal}, Level {level}, {days} days/week, {time} mins/day for {name}."

    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",  # correct model
        contents=prompt
    )

    plan = {
        "name": name,
        "goal": goal,
        "level": level,
        "days": days,
        "time": time,
        "message": response.text
    }
    return jsonify(plan)

if __name__ == "__main__":
    app.run(debug=True, port=5000)