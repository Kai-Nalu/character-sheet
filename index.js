let keyInput = document.getElementById('cskey');
let characterDropdown = document.getElementById('cscharacter');

let characterSelectionDiv = document.getElementById('cscharacterSelection');
characterSelectionDiv.style.display = 'none';

let keyButton = document.getElementById('cskeyButton');
keyButton.addEventListener('click', ()=>{
    keySubmit(keyInput.value);
});

function keySubmit(key) {
    let xmlhttpKey = new XMLHttpRequest();
    xmlhttpKey.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            checkKey(JSON.parse(this.responseText));
        }
    };
    xmlhttpKey.open('GET', `http://129.21.148.160:4461/checkkey/${key}`, true);
    xmlhttpKey.send();
}

function checkKey(result) {
    if (result.auth) {
        characterDropdown.options.length = 0;
        for (let i in result.names) {
            let option =  document.createElement("option");
            option.text = result.names[i];
            characterDropdown.add(option);
        }
        characterSelectionDiv.style.display = 'block';
    } else {
        alert('Invalid key.');
    }
}