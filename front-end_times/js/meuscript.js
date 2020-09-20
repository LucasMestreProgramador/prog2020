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
            // esse linhas = "" 

            for (var i in resposta) {
                lin = "<tr>" + 
                    "<td>" + resposta[i].nome + "</td>" +
                    "<td>" + resposta[i].treinador + "</td>" +
                    "<td>" + resposta[i].estadio + "</td>" +
                    "<td>" + resposta[i].capitao + "</td>" +
                    "</tr>";

                $("#corpo_tabela_times").append(lin);

                };

                // esse linhas = linhas + lin;

                // esse $("#corpo_tabela_times").html(linhas);

                $("#conteudoInicial").addClass("invisible");

                $("#tabela_times").addClass("invisible");

                $("#tabela_times").removeClass("invisible");
   
        }

    });

  });