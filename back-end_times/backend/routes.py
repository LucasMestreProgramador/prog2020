from config import *
from models import Time

@app.route("/")
def inicio():
    return 'Sistema de cadastro de times de futebol. '+\
        '<a href="/listar_times">Operação listar</a>'

@app.route("/listar_times", methods=["get"])
def listar_times():
    times = db.session.query(Time).all()
    times_json = [ _.json() for _ in times ]
    resposta = jsonify(times_json)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta