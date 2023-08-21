from flask import Flask, render_template, request
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
from fuzzywuzzy import fuzz
import emoji
from difflib import SequenceMatcher
from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017')  # Modifier l'URL de connexion si nécessaire
db = client['mydatabase']  # Remplacez 'mydatabase' par le nom de votre base de données
session_collection = db['sessions']

app = Flask(__name__)

# Entraînez le chatbot en dehors de l'application Flask
def train_chatbot():
    chatbot = ChatBot("Chatbot")

    trainer = ListTrainer(chatbot)
    trainer.train([
        "Hi",
        "Hi! Welcome to vermeg 🤗 How can I assist you?",
        "Hello",
        "Hello! Welcome to vermeg 🤗 How can I assist you?",
        # Ajoutez d'autres exemples d'entraînement ici
    ])

    return chatbot

chatbot_instance = train_chatbot()

# Liste de mots clés que le chatbot peut reconnaître
keyword_responses = {
    "hi": "Hi! Welcome to vermeg 🤗 How can I assist you?",
    "hello": "Hello! Welcome to vermeg 🤗 How can I assist you?",
    # Ajoutez d'autres mots clés et réponses ici
}

@app.route('/')
def index():
    return render_template('index.html')

# ...

@app.route('/make_choice', methods=['POST'])
def make_choice():
    choice = request.form['choice']

    if choice == 'entreprise':
        response_text = "Bienvenue dans l'option entreprise!"
    elif choice == 'association':
        response_text = "Bienvenue dans l'option association!"
    else:
        response_text = "Je ne comprends pas votre choix."

    return response_text



@app.route('/getresponse', methods=['POST'])
def get_response():
    user_input = request.form['user_input']
    user_id = request.form["user_id"]

    # Charger la session utilisateur depuis MongoDB
    session_data = []
    session_document = session_collection.find_one({'user_id': user_id})

    if session_document:
        session_data = session_document['session_data']

    # Recherchez la réponse prédéfinie
    predefined_response = None
    for item in session_data:
        if item['user_input'].lower() == user_input.lower():
            predefined_response = item['bot_response']
            break

    if predefined_response is not None:
        return predefined_response

    # Vérifier si l'utilisateur a choisi "entreprise" ou "association"
    if user_input.lower() == "entreprise":
        response_text = "Bienvenue dans l'option entreprise!"
    elif user_input.lower() == "association":
        response_text = "Welcome to the association option!"
    else:
        # Calculer la similarité entre l'entrée de l'utilisateur et les mots clés
        similarity = max(SequenceMatcher(None, user_input.lower(), keyword).ratio() for keyword in keyword_responses.keys())

        # Si la similarité est suffisamment élevée, accepter la réponse associée au mot clé
        if similarity > 0.8:  # Augmentez ce seuil pour réduire les correspondances
            return keyword_responses[max(keyword_responses, key=lambda keyword: fuzz.ratio(keyword, user_input.lower()))]

        # Obtenir la réponse du chatbot
        response = chatbot_instance.get_response(user_input)

        # Calculer la similarité entre l'entrée de l'utilisateur et la réponse du chatbot
        similarity = fuzz.ratio(user_input.lower(), str(response).lower())

        # Si la similarité est suffisamment élevée, accepter la réponse du chatbot
        if similarity > 70 and response.confidence > 0.7:
            response_text = str(response)
        else:
            response_text = user_input  # Utiliser la même question que l'utilisateur a saisie

    # Ajouter l'interaction utilisateur à la liste session_data
    session_data.append({'user_input': user_input, 'bot_response': response_text})

    # Mettre à jour ou insérer les données de session dans MongoDB
    session_collection.update_one(
        {'user_id': user_id},
        {'$set': {'session_data': session_data}},
        upsert=True
    )

    # Convertir les emojis en texte
    response_text = emoji.emojize(response_text)

    return response_text

# ...


if __name__ == '__main__':
    app.run(debug=True)
