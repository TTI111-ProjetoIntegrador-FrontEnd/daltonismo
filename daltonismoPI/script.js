const protocolo = 'http://'
const baseURL = 'localhost:3000'
const contatoEndpoint = '/contato'

async function obterDados() {
    const URLCompleta = `${protocolo}${baseURL}${contatoEndpoint}`;
    const dados = (await axios.get(URLCompleta)).data
    console.log(dados);

    let principal = document.querySelector('#principal');
    for (let dado of dados) {
        let paragrafo = document.createElement('p');
        paragrafo.innerHTML = `Nome: ${dado.nome}`;

        principal.appendChild(paragrafo);
    }

    let secundario = document.querySelector('#secundario');
    for (let dado of dados) {
        let paragrafo = document.createElement('p');
        paragrafo.innerHTML = `Email: ${dado.email}`;

        secundario.appendChild(paragrafo);
    }

    let terciario = document.querySelector('#terciario');
    for (let dado of dados) {
        let paragrafo = document.createElement('p');
        paragrafo.innerHTML = `Mensagem de ${dado.nome}: ${dado.mensagem}`;

        terciario.appendChild(paragrafo);
    }
}

async function cadastrarDados() {
    const URLCompleta = `${protocolo}${baseURL}${contatoEndpoint}`;

    //pega os inputs dos dados inseridos pelo usuário
    let nomeInput = document.querySelector('#nomeInput');
    let emailInput = document.querySelector('#emailInput');
    let mensagemInput = document.querySelector('#mensagemInput');
    //pega os valores digitados pelo usuário
    let nome = nomeInput.value;
    let email = emailInput.value;
    let mensagem = mensagemInput.value;
    //envia os dados coletador pro back
    const dados = (await axios.post(URLCompleta, {nome, email, mensagem})).data
    //limpa os campos que o usuário digitou
    nome = ''
    email = ''
    mensagem = ''

    let principal = document.querySelector('#principal');
    // principal.innerHTML = '';
    for (let dado of dados) {
        let paragrafo = document.createElement('p');
        paragrafo.innerHTML = `Nome: ${dado.nome}`;
        
        principal.appendChild(paragrafo);
    }

    let secundario = document.querySelector('#secundario');
    // secundario.innerHTML = '';
    for (let dado of dados) {
        let paragrafo = document.createElement('p');
        paragrafo.innerHTML = `Email: ${dado.email}`;

        secundario.appendChild(paragrafo);
    }

    let terciario = document.querySelector('#terciario');
    // terciario.innerHTML = '';
    for (let dado of dados) {
        let paragrafo = document.createElement('p');
        paragrafo.innerHTML = `Mensagem de ${dado.nome}: ${dado.mensagem} \n`;

        terciario.appendChild(paragrafo);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const daltonismoSelect = document.getElementById('daltonismo-select');
    
    const selectedClass = localStorage.getItem('selectedFilter'); 
    if (selectedClass) {
        document.body.classList.add(selectedClass);
        daltonismoSelect.value = selectedClass; 
    }

  
    daltonismoSelect.addEventListener('change', function () {
        const selectedFilter = this.value;
        const bodyElement = document.body;


        bodyElement.classList.remove('protanopia', 'deuteranopia', 'tritanopia');
        bodyElement.style.filter = ''; 


        if (selectedFilter) {
            bodyElement.classList.add(selectedFilter);
            bodyElement.style.filter = `url(#${selectedFilter})`;

            localStorage.setItem('selectedFilter', selectedFilter);
        }
    });
});
