from config import *
from models import Jogador, Contratacao, Time

@app.route("/")
def inicio():
    return 'Sistema de cadastro de jogadores de futebol. '+\
        '<a href="/listar_jogadores">Operação listar</a>'

@app.route("/listar_jogadores", methods=["get"])
def listar_jogadores():
    jogadores = db.session.query(Jogador).all()
    jogadores_json = [ _.json() for _ in jogadores ]
    resposta = jsonify(jogadores_json)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/incluir_jogador", methods=['post'])
def incluir_jogador():
    dados = request.get_json()
    novo_jogador = Jogador(**dados) 
    db.session.add(novo_jogador)
    db.session.commit()
    return {"resultado" : "ok"}

@app.route("/excluir_jogador/<int:jogador_id>", methods=['DELETE']) 
def excluir_jogador(jogador_id): 
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"}) 
    try: 
        Jogador.query.filter(Jogador.id == jogador_id).delete() 
        db.session.commit() 
    except Exception as e: 
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)}) 
    resposta.headers.add("Access-Control-Allow-Origin", "*") 
    return resposta

@app.route("/listar/<string:classe>")
def listar(classe):
    dados = None
    if classe == "Jogador":
        dados = db.session.query(Jogador).all()
    elif classe == "Contratacao":
        dados = db.session.query(Contratacao).all()
    elif classe == "Time":
        dados = db.session.query(Time).all()
        
    lista_jsons = [ x.json() for x in dados ]
    resposta = jsonify(lista_jsons)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta