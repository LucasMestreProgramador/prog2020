$(function() {
    
    function exibir_jogadores() {
        $.ajax({
            url: 'http://localhost:5000/listar_jogadores',
            method: 'GET',
            dataType: 'json', 
            success: listar,
            error: function(problema) {
                alert("Erro ao ler dados, verifique o backend! :(");
            }
        });
        function listar (jogadores) {
            $('#corpo_tabela_jogadores').empty();
            mostrar_conteudo("cadastroJogadores");      
            for (var i in jogadores) { 
                lin = '<tr id="linha_' + jogadores[i].id + '">' + 
                '<td>' + jogadores[i].nome + '</td>' + 
                '<td>' + jogadores[i].idade + '</td>' + 
                '<td>' + jogadores[i].nacionalidade + '</td>' + 
                '<td>' + jogadores[i].posicao + '</td>' + 
                '<td>' + jogadores[i].time_atual + '</td>' + 
                '<td><a href=# id="excluir_' + jogadores[i].id + '" ' + 
                  'class="excluir_jogador"><img src="imagens/excluir.png" '+
                  'alt="Excluir jogador" title="Excluir jogador"></a>' + 
                '</td>' + 
                '</tr>';
                $('#corpo_tabela_jogadores').append(lin);
            }
        }
    }

    function mostrar_conteudo(identificador) {
        $("#cadastroJogadores").addClass('d-none');
        $("#conteudoInicial").addClass('d-none');
        $("#cadastroContratacoes").addClass('d-none');
        $("#"+identificador).removeClass('d-none');      
    }

    $(document).on("click", "#link_listar_jogadores", function() {
        exibir_jogadores();
    });
    
    $(document).on("click", "#linkInicio", function() {
        mostrar_conteudo("conteudoInicial");
    });

    $(document).on("click", "#btIncluirJogador", function() {
        nome = $("#campoNome").val();
        idade = $("#campoIdade").val();
        nacionalidade = $("#campoNacionalidade").val();
        posicao = $("#campoPosicao").val();
        time_atual = $("#campoTimeAtual").val();

        var dados = JSON.stringify({ nome: nome, idade: idade, nacionalidade: nacionalidade, posicao: posicao, time_atual: time_atual });
        
        $.ajax({
            url: 'http://localhost:5000/incluir_jogador',
            type: 'POST',
            dataType: 'json', 
            contentType: 'application/json', 
            data: dados, 
            success: jogadorIncluido,
            error: erroAoIncluir
        });

        function jogadorIncluido (resposta) {
            if (resposta.resultado == "OK") { 
                alert("Jogador incluído com sucesso!");
                $("#campoNome").val("");
                $("#campoIdade").val("");
                $("#campoNacionalidade").val("");
                $("#campoPosicao").val("");
                $("#campoTimeAtual").val("");
            } else {
                alert(reesposta.resultado + ":" + resposta.detalhes);
            }            
        }
        function erroAoIncluir (resposta) {
            alert("Erro ao incluir dados, verifique o backend! :(");
        }
    });

    $('#modalIncluirJogador').on('hide.bs.modal', function (e) {
        if (! $("#cadastroJogadores").hasClass('d-none')) {
            exibir_jogadores();
        }
    });

    mostrar_conteudo("conteudoInicial");

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

        function jogadorExcluido (resposta) {
            if (resposta.resultado == "OK") {
                $("#linha_" + id_jogador).fadeOut(1000, function(){
                    alert("Jogador removido com sucesso!");
                });

            } else {
                alert(resposta.resultado + ":" + resposta.detalhes);
            }            
        }
        function erroAoExcluir (resposta) {
            alert("Erro ao excluir dados, verifique o backend! :(");
        }
    });



    function exibir_contratacoes() {
        $.ajax({
            url: 'http://localhost:5000/listar_contratacoes',
            method: 'GET',
            dataType: 'json',
            success: listar, 
            error: function(problema) {
                alert("Erro ao ler dados, verifique o backend! :(");
            }
        });
        function listar (contratacoes) {
            $('#corpo_tabela_contratacoes').empty();
            mostrar_conteudo("cadastroContratacoes");      
            for (var i in contratacoes) { 
                lin = '<tr id="linha_contratacao_'+ contratacoes[i].id+ '">' + 
                '<td>' + contratacoes[i].valor_contratacao + '</td>' + 
                '<td>' + contratacoes[i].duracao_contrato + '</td>' + 
                '<td>' + contratacoes[i].destino + '</td>' + 
                '<td>' + contratacoes[i].time_anterior + '</td>' + 
                // dados do jogador
                '<td>' + contratacoes[i].jogador.nome + '</td>' + 
                '<td>' + contratacoes[i].jogador.idade + '</td>' + 
                '<td>' + contratacoes[i].jogador.nacionalidade + '</td>' + 
                '<td>' + contratacoes[i].jogador.posicao + '</td>' + 
                '<td>' + contratacoes[i].jogador.time_atual + '</td>' + 
                // dados do time
                '<td>' + contratacoes[i].time.nome + '</td>' + 
                '<td>' + contratacoes[i].time.treinador + '</td>' + 
                '<td>' + contratacoes[i].time.estadio + '</td>' + 
                '<td>' + contratacoes[i].time.capitao + '</td>' + 
                '<td><a href=# id="excluir_contratacao_' + contratacoes[i].id + '" ' + 
                  'class="excluir_contratacao"><img src="imagens/excluir.png" '+
                  'alt="Excluir contratacao" title="Excluir contratacao"></a>' + 
                '</td>' + 
                '</tr>';
                $('#corpo_tabela_contratacoes').append(lin);
            }
        }
    }

    $(document).on("click", "#link_listar_contratacoes", function() {
        exibir_contratacoes();
    });
    
});