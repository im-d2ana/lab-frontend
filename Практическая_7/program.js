function changeType() {
    const alg = document.getElementById('alg-form');
    const trig = document.getElementById('trig-form');
    const img = document.getElementById('img1');

    // алгебраическая форма
    if (document.getElementById('type1').checked) {
        img.src = 'img1.png';
        alg.style.display = 'block';
        trig.style.display = 'none';
    } 
    // тригонометрическая форма
    else {
        img.src = 'img2.png';
        alg.style.display = 'none';
        trig.style.display = 'block';
    }

    clearOutput();
    clearErrorOnFocus();
}

function calculate() {
    clearOutput();

    const tasks = document.getElementById('tasks');
    const findLabel = document.getElementById('find-label');

    let input1, input2;
    if (document.getElementById('type1').checked) {
        input1 = document.getElementById('input1');
        input2 = document.getElementById('input2');
    } else {
        input1 = document.getElementById('input1-trig');
        input2 = document.getElementById('input2-trig');
    }

    let v1 = parseFloat(input1.value);
    let v2 = parseFloat(input2.value);
    let hasError = false;

    if (isNaN(v1)) {
        input1.classList.add('error');
        hasError = true;
    }
    if (isNaN(v2)) {
        input2.classList.add('error');
        hasError = true;
    }

    if (tasks.selectedOptions.length === 0) {
        findLabel.classList.add('error-text');
        hasError = true;
    }

    if (document.getElementById('type2').checked && v1 < 0) {
        input1.classList.add('error');
        hasError = true;
    }

    if (hasError) return;

    const output = document.getElementById('output');
    output.innerHTML = '<p><b>Результат:</b></p>';

    // алгебраическая форма
    if (document.getElementById('type1').checked) {
        let a = v1;
        let b = v2;

        for (let option of tasks.selectedOptions) {
            if (option.value === '1')
                output.innerHTML += `<p>Действительная часть: ${a}</p>`;

            if (option.value === '2')
                output.innerHTML += `<p>Аргумент: ${Math.atan2(b, a)}</p>`;

            if (option.value === '3')
                output.innerHTML += `<p>Мнимая часть: ${b}</p>`;
        }
    }

    // тригонометрическая форма
    else {
        let r = v1;
        let phi = v2;

        for (let option of tasks.selectedOptions) {
            if (option.value === '1')
                output.innerHTML += `<p>Действительная часть: ${r * Math.cos(phi)}</p>`;

            if (option.value === '2')
                output.innerHTML += `<p>Аргумент: ${phi}</p>`;

            if (option.value === '3')
                output.innerHTML += `<p>Мнимая часть: ${r * Math.sin(phi)}</p>`;
        }
    }
}

function clearForm() {
    document.getElementById('output').innerHTML = '';

    document.getElementById('input1').value = '';
    document.getElementById('input2').value = '';
    document.getElementById('input1').classList.remove('error');
    document.getElementById('input2').classList.remove('error');

    document.getElementById('input1-trig').value = '';
    document.getElementById('input2-trig').value = '';
    document.getElementById('input1-trig').classList.remove('error');
    document.getElementById('input2-trig').classList.remove('error');

    document.getElementById('find-label').classList.remove('error-text');

    for (let option of tasks.options) {
        option.selected = false;
    }

    clearOutput();
}

function clearOutput() {
    document.getElementById('output').innerHTML = '';
}

function clearErrorOnFocus() {
    const inputs = document.querySelectorAll('input[type="number"]');

    inputs.forEach(input => {
        input.onfocus = function () {
            this.classList.remove('error');
            clearOutput();
        };
    });

    document.getElementById('tasks').onchange = function () {
        document.getElementById('find-label').classList.remove('error-text');
    };
}

clearErrorOnFocus();

function doButton() {
    let button1 = document.getElementById('changeButton');
    button1.onclick = function() {
        changeType();
    };
    let button2 = document.getElementById('calculateButton');
    button2.onclick = function() {
        calculate();
    };
    let button3 = document.getElementById('clearButton');
    button3.onclick = function() {
        clearForm();
    };
}

doButton();