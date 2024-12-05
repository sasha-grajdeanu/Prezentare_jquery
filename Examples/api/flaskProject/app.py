from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

posts = []


@app.route('/create_post', methods=['POST'])
def create_post():
    data = request.json

    if 'title' not in data or 'body' not in data:
        return jsonify({'error': 'Missing title or body'}), 400

    new_post = {
        'id': len(posts) + 1,
        'title': data['title'],
        'body': data['body']
    }
    posts.append(new_post)

    return jsonify(new_post), 201


@app.route('/get_posts', methods=['GET'])
def get_posts():
    return jsonify(posts), 200


if __name__ == '__main__':
    app.run(debug=True)