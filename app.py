from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()  # load keys from .env
app = Flask(__name__)

# Configure your Gemini Flash API key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/get", methods=["POST"])
def chat():
    user_msg = request.form.get("msg")
    if not user_msg:
        return jsonify({"error": "No message received"})

    try:
        model = genai.GenerativeModel("gemini-2.0-flash-lite")
        response = model.generate_content(user_msg)
        reply = response.text
        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
