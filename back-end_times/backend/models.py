from config import *

class Time(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    treinador = db.Column(db.String(254))
    estadio = db.Column(db.String(254))
    capitao = db.Column(db.String(254))
    

    def __str__(self):
        return str(self.id)+") "+ self.nome + ", " +\
            self.treinador + ", " + self.estadio + ", " + self.capitao

    def json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "treinador": self.treinador,    
            "estadio": self.estadio,
            "capitao": self.capitao
        }

if __name__ == "__main__":
    if path.exists(db_file):
        remove(db_file)

    db.create_all()

    t1 = Time(nome="Flamengo", treinador="Domenec Torrent", 
        estadio="Maracana", capitao="Everton Ribeiro")
    t2 = Time(nome="Real Madrid", treinador="Zinedine Zidane", 
        estadio="Santiago Bernabeu", capitao="Sergio Ramos")
    t3 = Time(nome="Chelsea", treinador="Frank Lampard", 
        estadio="Stamford Bridge", capitao="Cesar Azpilicueta")
    t4 = Time(nome="Bayern Munchen", treinador="Hans-Dieter Flick", 
        estadio="Allianz Arena", capitao="Manuel Neuer")
    t5 = Time(nome="Juventus", treinador="Maurizio Sarri", 
        estadio = "Allianz Stadium", capitao="Giorgio Chiellini")        
    
    db.session.add(t1)
    db.session.add(t2)
    db.session.add(t3)
    db.session.add(t4)
    db.session.add(t5)
    db.session.commit()
    
    print(t2)

    print(t2.json())