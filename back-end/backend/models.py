from config import *


class Jogador(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    idade = db.Column(db.String(254))
    nacionalidade = db.Column(db.String(254))
    posicao = db.Column(db.String(254))
    time_atual = db.Column(db.String(254))

    def __str__(self):
        return f"{self.nome}, {self.idade}, " + \
            f"{self.nacionalidade}, {self.posicao}, {self.time_atual}"

    def json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "idade": self.idade,    
            "nacionalidade": self.nacionalidade,
            "posicao": self.posicao,
            "time_atual": self.time_atual
        }


class Contratacao(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    valor_contratacao = db.Column(db.String(254))
    duracao_contrato = db.Column(db.String(254))
    destino = db.Column(db.String(254))
    time_anterior = db.Column(db.String(254))
    jogador_id = db.Column(db.Integer, db.ForeignKey(Jogador.id), nullable=False)
    jogador = db.relationship("Jogador")

    def __str__(self):
        return f"{self.nome}, {self.valor_contratacao}, " + \
            f"{self.duracao_contrato}, {self.destino}, {self.time_anterior}"

    def json(self):
        return {
            "id": self.id,
            "nome": self.nome, 
            "valor_contratacao": self.valor_contratacao,   
            "duracao_contrato": self.duracao_contrato,
            "destino": self.destino,
            "time_anterior": self.time_anterior,
            "jogador_id": self.jogador_id,
            "jogador": self.jogador.json()
        }


class Time(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    treinador = db.Column(db.String(254))
    estadio = db.Column(db.String(254))
    capitao = db.Column(db.String(254))
    jogador_id = db.Column(db.Integer, db.ForeignKey(Jogador.id))
    jogador_contratado = db.relationship("Jogador")
    
    def __str__(self):
        s = f"O time {self.nome} treinado por {self.treinador} e que manda seus jogos no {self.estadio}"
        if self.jogador_contratado != None:
            s += f", contratou o jogador {self.jogador_contratado}"
        return s

    def json(self):
        if self.jogador_contratado is None:
            jogador_id = ""
            jogador_contratado = ""

        else:
            jogador_id = self.jogador_id
            jogador_contratado = self.jogador_contratado.json()

        return {
            "id": self.id,
            "nome": self.nome,
            "treinador": self.treinador,
            "estadio": self.estadio,
            "capitao": self.capitao,
            "jogador_id": self.jogador_id,
            "jogador_contratado": self.jogador_contratado
        }


if __name__ == "__main__":
    if path.exists(db_file):
        remove(db_file)

    db.create_all()

    jogador1 = Jogador(nome="Cristiano Ronaldo", idade="35", 
        nacionalidade="Portugal", posicao="Atacante", time_atual="Juventus")
    jogador2 = Jogador(nome="Neymar", idade="28", 
        nacionalidade="Brasil", posicao="Ponta-esquerda", time_atual="Paris Saint-Germain")
    jogador3 = Jogador(nome="Robert Lewandowski", idade="32", 
        nacionalidade="Polonia", posicao="Atacante", time_atual="Bayern Munchen")
    jogador4 = Jogador(nome="Kevin De Bruyne", idade="29", 
        nacionalidade = "Belgica", posicao="Meia-atacante", time_atual="Manchester City")
    jogador5 = Jogador(nome="Jan Oblak", idade="27", 
        nacionalidade="Eslovenia", posicao="Goleiro", time_atual="Atletico Madrid")

    contratacao1 = Contratacao(nome=jogador1.nome, valor_contratacao="117 milhoes de euros", 
        duracao_contrato="4 anos", destino="Juventus", time_anterior="Real Madrid", jogador=jogador1)
    contratacao2 = Contratacao(nome=jogador2.nome, valor_contratacao="222 milhoes de euros", 
        duracao_contrato="5 anos", destino="Paris Saint-Germain", time_anterior="Barcelona", jogador=jogador2)
    contratacao3 = Contratacao(nome=jogador3.nome, valor_contratacao="Custo zero", 
        duracao_contrato="4 anos", destino="Bayern Munchen", time_anterior="Borussia Dortmund", jogador=jogador3)
    contratacao4 = Contratacao(nome=jogador4.nome, valor_contratacao="76 milhoes de euros", 
        duracao_contrato="5 anos", destino="Manchester City", time_anterior="Wolfsburg", jogador=jogador4)
    contratacao5 = Contratacao(nome=jogador5.nome, valor_contratacao="16 milhoes de euros", 
        duracao_contrato="4 anos", destino="Atletico de Madrid", time_anterior="Benfica", jogador=jogador5)

    time1 = Time(nome="Flamengo", treinador="Rogerio Ceni", 
        estadio="Maracana", capitao="Diego Ribas", jogador_contratado=jogador1)
    time2 = Time(nome="Liverpool", treinador="Jurgen Klopp", 
        estadio="Anfield", capitao="Jordan Henderson", jogador_contratado=jogador2)
    time3 = Time(nome="Real Madrid", treinador="Zinedine Zidane", 
        estadio="Santiago Bernabeu", capitao="Sergio Ramos", jogador_contratado=jogador3)
    time4 = Time(nome="Bayern Munchen", treinador="Hans-Dieter Flick", 
        estadio="Allianz Arena", capitao="Manuel Neuer", jogador_contratado=jogador4)
    time5 = Time(nome="Juventus", treinador="Andrea Pirlo", 
        estadio="Allianz Stadium", capitao="Giorgio Chiellini", jogador_contratado=jogador5)
    
    db.session.add(jogador1)
    db.session.add(jogador2)
    db.session.add(jogador3)
    db.session.add(jogador4)
    db.session.add(jogador5)

    db.session.add(contratacao1)
    db.session.add(contratacao2)
    db.session.add(contratacao3)
    db.session.add(contratacao4)
    db.session.add(contratacao5)

    db.session.add(time1)
    db.session.add(time2)
    db.session.add(time3)
    db.session.add(time4)
    db.session.add(time5)

    db.session.commit()

    linha = "---------------------------------------"
    
    print("PRINTS NO FORMATO JSON:")

    print(linha)

    print(jogador1.json())
    print(jogador2.json())
    print(jogador3.json())
    print(jogador4.json())
    print(jogador5.json())

    print(linha)
    
    print(contratacao1.json())
    print(contratacao2.json())
    print(contratacao3.json())
    print(contratacao4.json())
    print(contratacao5.json())

    print(linha)

    print(time1.json())
    print(time2.json())
    print(time3.json())
    print(time4.json())
    print(time5.json())

