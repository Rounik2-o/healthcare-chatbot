from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route('/chat', methods=['POST'])
def chat():
    user_msg = request.json.get("message")
    return jsonify({"reply": f"You said: {user_msg}"})

if __name__ == '__main__':
    app.run(debug=True)
