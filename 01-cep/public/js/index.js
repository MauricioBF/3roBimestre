const mostra = document.querySelector('#trem');
const form = document.querySelector('form');
const divResultado = document.querySelector('div#resultado');
const scriptTemplate = document.querySelector('#template');
const value = document.querySelector('input');
const exc = document.querySelector('#but');

value.addEventListener('keydown', function(e){ 
  let toque = e.key; 
  let string = toque.charCodeAt();
  if(string != 66 && (string > 57 || string < 48)){
    e.preventDefault();
  }
  else {
    if ((e.key.charCodeAt()) != 66) {
      value.value = value.value.replace(value.value.indexOf('0'), '');
    } else {
      value.value = '0' + value.value;
    }
  }
});

form.addEventListener('submit', function(e) {
  busca(form.cep.value);
  e.preventDefault();
});

function ajax(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = callback;
  xhr.send();
}

function busca(cep) {
  const url = `http://viacep.com.br/ws/${cep}/json/`;
  ajax(url, function(e) {
    if(typeof(JSON.parse(e.target.response).localidade) === 'undefined'){
      apaga(JSON.parse(e.target.response));
      mostra.style.visibility = 'visible';
    }
    else{
      mostra.style.visibility = 'hidden';
      printa(JSON.parse(e.target.response));
    }
  });
}

function apaga(json){
  const template = "";
  const handlebars = Handlebars.compile(template);
  const html = "";
  divResultado.innerHTML = "";
}

function printa(json) {
  const template = scriptTemplate.innerText;
  const handlebars = Handlebars.compile(template);
  const html = handlebars(json);
  divResultado.innerHTML = html;
}

but.addEventListener('click', function() {
  value.value = '00000000';
  value.focus();
});
