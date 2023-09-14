from flask import Flask, render_template, request
from fuzzywuzzy import fuzz
import emoji
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer

app = Flask(__name__)
# Créez une instance de ChatBot
bot = ChatBot('MyBot')

# Entraînez le bot en utilisant les corpus de formation en anglais
trainer = ChatterBotCorpusTrainer(bot)
trainer.train('chatterbot.corpus.english')


# Réponses prédéfinies pour les choix de l'utilisateur
keyword_responses = {
    "association": "Merci pour votre réponse, que souhaitez-vous faire ?",
    "entreprise": "Choisissez l'une des options ci-dessous :",
    "J'ai un problème": "D'accord, veuillez nous fournir plus de détails sur le problème que vous rencontrez.",
    "Je souhaite publier une mission pour entreprise": "Super ! Veuillez nous donner plus d'informations sur la mission que vous souhaitez publier.",
    "Je souhaite être formé à l'utilisation de RSETime et des fonctionnalités proposées": "Inscrivez-vous à la prochaine démo des assos animée par notre équipe 👋 <a href=\"#\">démo des assos animée</a>"
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/make_choice', methods=['POST'])
def make_choice():
    choice = request.form['choice']
    response_text = keyword_responses.get(choice, "Je n'ai pas compris votre choix.")
    return response_text

@app.route('/getresponse', methods=['POST'])
def get_response():
    user_input = request.form['user_input']

    # Calculer la similarité entre l'entrée de l'utilisateur et les réponses prédéfinies
    similarity_scores = {keyword: fuzz.ratio(user_input.lower(), keyword.lower()) for keyword in keyword_responses.keys()}
    
    # Trouver la réponse prédéfinie avec la plus grande similarité
    max_similarity_keyword = max(similarity_scores, key=similarity_scores.get)
    max_similarity_score = similarity_scores[max_similarity_keyword]
    
    if max_similarity_score > 70:
        response_text = keyword_responses[max_similarity_keyword]
    else:
        response_text = user_input  # Utiliser la même question que l'utilisateur a saisie
    #Obtenir une réponse du bot en utilisant ChatterBot
    bot_response = bot.get_response(user_input)

    # Convertir les emojis en texte
    response_text = emoji.emojize(response_text)

    return response_text

if __name__ == '__main__':
    app.run(debug=True)
