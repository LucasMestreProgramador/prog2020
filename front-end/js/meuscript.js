$( document ).ready(function() {
    
    $("#conteudoInicial").removeClass("invisible");

    $("#link_listar_jogadores").click(function(){      
      
        $.ajax({
            url: 'http://localhost:5000/listar_jogadores',
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: listar_jogadores, // chama a função listar_jogadores para processar o resultado
            error: function() {
                alert("Erro ao ler dados, verifique o backend!");
            }
        });

        function listar_jogadores(resposta) {   
            for (var i in resposta) {
                lin = '<tr id="linha_'+resposta[i].id+'">' + 
                    "<td>" + resposta[i].nome + "</td>" +
                    "<td>" + resposta[i].idade + "</td>" +
                    "<td>" + resposta[i].nacionalidade + "</td>" +
                    "<td>" + resposta[i].posicao + "</td>" +
                    "<td>" + resposta[i].time_atual + "</td>" +
                    '<td><a href=# id="excluir_' + resposta[i].id + '" ' + 
                        'class="excluir_jogador"><img src="imagens/excluir.png"' +
                        'alt="Excluir jogador" title="Excluir jogador"></a>' + 
                    '</td>' + 
                    "</tr>";

                $("#corpo_tabela_jogadores").append(lin);

                };

                $("#conteudoInicial").addClass("invisible");

                $("#tabela_jogadores").addClass("invisible");

                $("#tabela_jogadores").removeClass("invisible");
   
        }

    });

    $("#btn_incluir_jogador").click(function(){ 
        
        nome_jogador = $("#nome_jogador").val();
        idade_jogador = $("#idade_jogador").val();
        nacionalidade_jogador = $("#nacionalidade_jogador").val();
        posicao_jogador = $("#posicao_jogador").val();
        time_jogador = $("#time_jogador").val();

        dados = JSON.stringify({nome: nome_jogador, idade: idade_jogador, nacionalidade: nacionalidade_jogador, posicao: posicao_jogador, time_atual: time_jogador})

        $.ajax({
            url: "http://localhost:5000/incluir_jogador",
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: dados,
            success: incluirJogador,
            error: erroIncluirJogador
        });
        function incluirJogador(resposta) {
            if (resposta.resultado == "ok") {

            alert("Jogador incluido com sucesso!");

            $("#nome_jogador").val("");
            $("#idade_jogador").val("");
            $("#nacionalidade_jogador").val("");
            $("#posicao_jogador").val("");
            $("#time_jogador").val("");

            } else {
                alert("Erro na comunicação!");
            }
        }
        function erroIncluirJogador(resposta) {
            alert("Deu ruim na chamada ao back-end! :(");
        }
    
    });
    
    $(document).on("click", ".excluir_jogador", function() {
        var componente_clicado = $(this).attr('id'); 
        var nome_icone = "excluir_";
        var id_jogador = componente_clicado.substring(nome_icone.length);
        $.ajax({
            url: 'http://localhost:5000/excluir_jogador/'+id_jogador,
            type: 'DELETE', 
            dataType: 'json', 
            success: jogadorExcluido, 
            error: erroAoExcluir
        });

        function jogadorExcluido (retorno) {
            if (retorno.resultado == "ok") { 
                $("#linha_" + id_jogador).fadeOut(1000, function(){
                    alert("Jogador removido com sucesso!");
                });
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoExcluir (retorno) {
            alert("Erro ao excluir dados, verifique o backend: ");
        }

    });

});