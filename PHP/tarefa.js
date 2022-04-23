function temperatureConverter(){
    const data = document.forms[0];
    const medida = data["medida"].value;
    const temperatura = data["temperatura"].value;

    fetch(`./index.php?medida=${medida}&temperatura=${temperatura}`,{
        method: 'get',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
    })
    .then(response => response.json())
    .then(jsonData => {
        const medidaConvertida = jsonData.medida;
        const temperaturaConvertida = jsonData.temperatura;
        let resultado = document.createElement("div");
        resultado.innerHTML = `Temperatura convertida: ${temperaturaConvertida}º ${medidaConvertida}`;
        document.body.appendChild(resultado)
    })
    .catch(err => {
        console.error(err);
    });
}
