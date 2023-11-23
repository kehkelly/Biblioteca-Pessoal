function displayAutores(autores) {
    const tbody = document.getElementById("listaAutores");
    tbody.innerHTML = ""; // Limpar a tabela

    autores.forEach(autores => {
        const row = tbody.insertRow();

        const tituloCell = row.insertCell(0);
        tituloCell.textContent = autor.nome;

        const autorCell = row.insertCell(1);
        autorCell.textContent = autor.biografia;

        const dataCell = row.insertCell(2);
        dataCell.textContent = new Date(autor.dataNascimento).toLocaleDateString();

        const actionsCell = row.insertCell(3);
        actionsCell.innerHTML = `<button class="icon-btn" onclick='editarAutor(${JSON.stringify(autor)})'>
        <i class="fas fa-edit"></i> Editar
    </button>
    <button class="icon-btn" onclick="deleteAutor(${autor.id})">
    <i class="fas fa-trash"></i> Excluir
    </button>`;
    });
}

function fetchAutores() {
    fetch("/api/autores")
        .then(res => res.json())
        .then(data => {
            displayAutores(data);
        })
        .catch(error => {
            console.error("Erro ao buscar autor:", error);
        });
}

function deleteAutor(id) {
    fetch(`/api/autor/${id}`, {
        method: "DELETE"
    })
    .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        fetchAutores();
    })
    .catch(error => {
        console.error("Erro ao deletar autor:", error);
    });
}

function editarAutor(autor) {
    const addAutorBtn = document.getElementById("addAutorBtn");
    const nome = document.getElementById("nome");
    const biografia = document.getElementById("biografia");
    const dataNascimento = document.getElementById("dataNascimento");
    const autorId= document.getElementById("id_autor");
    nome.value = autor.nome;
    biografia.value = autor.biografia;
    dataNascimento.value = new Date(autor.dataNascimento).toISOString().split('T')[0];
    autorId.value = autor.id;
    addAutorBtn.click();
/**/
}

function limparFormulario(){
    const nome = document.getElementById("nome");
    const biografia = document.getElementById("biografia");
    const dataNascimento= document.getElementById("dataNascimento");
    const livroId= document.getElementById("id_livro");

    nome.value = "";
    biografia.value = "";
    dataNascimento.value = "";
    autorId.value = "";
}

document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = "/api/autores";
    const autorForm = document.getElementById("autorForm");
    const autorPopup = document.getElementById("autorPopup");
    const addAutorBtn = document.getElementById("addAutorBtn");
    const closePopupBtn = document.getElementById("closePopupBtn");

    // Carregar autores ao carregar a página
    carregarAutores();

    // Mostrar popup ao clicar no botão "Adicionar autor"
    addAutorBtn.addEventListener("click", function() {
        autorPopup.classList.add("show");
        autorPopup.classList.remove("hidden");
    });

    // Fechar popup
    closePopupBtn.addEventListener("click", function() {
        autorPopup.classList.add("hidden");
        autorPopup.classList.remove("show");
        limparFormulario();
    });

    // Adicionar novo autor ou atualizar um existente
    autorForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const biografia = document.getElementById("biografia").value;
        const dataNascimento = document.getElementById("dataNascimento").value;
        const autorId= document.getElementById("id_autor").value;

        let methodSalvar = "POST";
        let apiUrlSalvar = apiUrl;
        if(autorId != "" && autorId > 0){
            methodSalvar = "PUT";
            apiUrlSalvar += "/" + autorId;
        }
    
        fetch(apiUrlSalvar, {
            method: methodSalvar,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome, biografia, dataNascimento })
        })
        .then(res => {
            if (res.ok && res.status == "201") return res.json();
            else if (res.ok && res.status == "204") return;
            throw new Error(res.statusText);
        })
        .then(data => {
            fetchAutores();
            limparFormulario();
            closePopupBtn.click();
        })
        .catch(error => {
            console.error("Erro ao adicionar/atualizar autor:", error);
        });
    
    });
});