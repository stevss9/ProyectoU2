#Importamos las librerias
import os
from flask import Flask, redirect, render_template, request, url_for, flash


#Objeto para inicilizar la aplicacion
app = Flask(__name__)
#Clave  de la app
app.secret_key = "123456"
app.debug = False
app._static_folder = os.path.abspath("templates/static/")

#Clave  de la app
app.secret_key = '090700'

#Controlador de la ruta inicial
@app.route('/')
def Index():
    return render_template('Index.html', methods=['GET', 'POST'])

@app.route('/game', methods=['GET', 'POST'])
def game():
    return render_template('game.html')

#Main de la app
if __name__ == '__main__':
    app.run(debug=True)