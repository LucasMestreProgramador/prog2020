$( document ).ready(function() {
    
    $("#conteudoInicial").removeClass("invisible");

    $("#link_listar_times").click(function(){      
      
        $.ajax({
            url: 'http://localhost:5000/listar_times',
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: listar_times, // chama a função listar_times para processar o resultado
            error: function() {
                alert("Erro ao ler dados, verifique o backend!");
            }
        });

        function listar_times(resposta) {   
            // esse - linhas = "" 

            for (var i in resposta) {
                lin = "<tr>" + 
                    "<td>" + resposta[i].nome + "</td>" +
                    "<td>" + resposta[i].treinador + "</td>" +
                    "<td>" + resposta[i].estadio + "</td>" +
                    "<td>" + resposta[i].capitao + "</td>" +
                    "</tr>";

                $("#corpo_tabela_times").append(lin);

                };

                // esse - linhas = linhas + lin;

                // esse - $("#corpo_tabela_times").html(linhas);

                $("#conteudoInicial").addClass("invisible");

                $("#tabela_times").addClass("invisible");

                $("#tabela_times").removeClass("invisible");
   
        }

    });

    $("#btn_incluir_time").click(function(){ 
        
        nome_time = $("#nome_time").val();
        treinador_time = $("#treinador_time").val();
        estadio_time = $("#estadio_time").val();
        capitao_time = $("#capitao_time").val();

        dados = JSON.stringify({nome: nome_time, treinador: treinador_time, estadio: estadio_time, capitao: capitao_time})

        $.ajax({
            url: "http://localhost:5000/incluir_time",
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: dados,
            success: incluirTime,
            error: erroIncluirTime
        });
        function incluirTime(resposta) {
            if (resposta.resultado == "ok") {

            alert("Time incluido com sucesso!");

            $("#nome_time").val("");
            $("#treinador_time").val("");
            $("#estadio_time").val("");
            $("#capitao_time").val("");

            } else {
                alert("Erro na comunicação!");
            }
        }
        function erroIncluirTime(resposta) {
            alert("Deu ruim na chamada ao back-end! :(");
        }
    });

  });