document.getElementById('material-filter').addEventListener('change', function() {
    const optionsSelect = document.getElementById('columns-5');
    const materialList = document.getElementById('material-list');
    materialList.innerHTML = ''; // Clear previous materials

    if (this.value === 'argamassa') {
        const materials = [
            { value: 'argamassa1', text: 'Argamassa, para revestimento de paredes de alvenaria em ambientes internos e externos, 40-65% areia cálcica, 10-30% areia sílica, 5-25% cimento Portland, 2203 Matrix Massa de Projeção (Votorantim Cimentos, fábrica de Cajamar)' },
            { value: 'argamassa2', text: 'Argamassa, para revestimento de paredes de alvenaria em ambientes internos e externos, 40-65% areia cálcica, 10-30% areia sílica, 5-25% cimento Portland, 2203 Matrix Massa de Projeção (Votorantim Cimentos, fábrica de Camaçari)' }
        ];

        materials.forEach(material => {
            const div = document.createElement('div');
            div.classList.add('material-item');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = material.value;
            checkbox.classList.add('material-checkbox');
            div.appendChild(checkbox);

            const label = document.createElement('label');
            label.textContent = material.text;
            label.htmlFor = material.value;
            div.appendChild(label);

            materialList.appendChild(div);
        });
    }
});
document.getElementById('material-filter').addEventListener('change', function() {
    const materialList = document.getElementById('material-list');
    materialList.innerHTML = ''; // Clear previous materials

    if (this.value === 'argamassa') {
        const materials = [
            { value: 'argamassa1', text: 'Argamassa, para revestimento de paredes de alvenaria em ambientes internos e externos, 40-65% areia cálcica, 10-30% areia sílica, 5-25% cimento Portland, 2203 Matrix Massa de Projeção (Votorantim Cimentos, fábrica de Cajamar)' },
            { value: 'argamassa2', text: 'Argamassa, para revestimento de paredes de alvenaria em ambientes internos e externos, 40-65% areia cálcica, 10-30% areia sílica, 5-25% cimento Portland, 2203 Matrix Massa de Projeção (Votorantim Cimentos, fábrica de Camaçari)' }
        ];

        materials.forEach(material => {
            const div = document.createElement('div');
            div.classList.add('material-item');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = material.value;
            checkbox.classList.add('material-checkbox');
            div.appendChild(checkbox);

            const textDiv = document.createElement('div');
            textDiv.classList.add('material-text');
            textDiv.textContent = material.text;
            div.appendChild(textDiv);

            const button = document.createElement('button');
            button.textContent = 'Expandir';
            button.classList.add('expand-btn');
            button.addEventListener('click', () => {
                div.classList.toggle('expanded');
                button.textContent = div.classList.contains('expanded') ? 'Colapsar' : 'Expandir';
            });
            div.appendChild(button);

            materialList.appendChild(div);
        });
    }
});

document.getElementById('material-list').addEventListener('change', function(event) {
    if (event.target.type === 'checkbox') {
        updateArgamassaFields();
    }
});

function updateArgamassaFields() {
    const selectedMaterials = document.querySelectorAll('#material-list input:checked');
    const materialTableBody = document.getElementById('material-table-body');
    materialTableBody.innerHTML = ''; // Clear previous rows

    selectedMaterials.forEach(material => {
        const materialName = material.nextElementSibling.textContent;
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = 'Material: ' + materialName;
        row.appendChild(nameCell);

        const volumeCell = document.createElement('td');
        const volumeInput = document.createElement('input');
        volumeInput.type = 'number';
        volumeInput.placeholder = 'Volume em m³';
        volumeCell.appendChild(volumeInput);
        row.appendChild(volumeCell);

        const distanceCell = document.createElement('td');
        const distanceInput = document.createElement('input');
        distanceInput.type = 'number';
        distanceInput.placeholder = 'Distância em km';
        distanceCell.appendChild(distanceInput);
        row.appendChild(distanceCell);

        const gwsCell = document.createElement('td');
        const gwsInput = document.createElement('input');
        gwsInput.type = 'text';
        gwsInput.placeholder = 'CO2e';
        gwsInput.disabled = true; // This field is automatically filled
        gwsCell.appendChild(gwsInput);
        row.appendChild(gwsCell);

        const resultCell = document.createElement('td');
        const resultInput = document.createElement('input');
        resultInput.type = 'text';
        resultInput.placeholder = 'Resultado';
        resultInput.disabled = true; // This field is automatically filled
        resultCell.appendChild(resultInput);
        row.appendChild(resultCell);

        const removeCell = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.addEventListener('click', function() {
            materialTableBody.removeChild(row);
            material.checked = false; // Uncheck the material
        });
        removeCell.appendChild(removeButton);
        row.appendChild(removeCell);

        materialTableBody.appendChild(row);

        // Automatically fill GWS and Resultado based on some logic
        volumeInput.addEventListener('input', function() {
            gwsInput.value = getGWS(material.value);
            resultInput.value = calculateCO2(material.value, volumeInput.value, distanceInput.value);
        });
        distanceInput.addEventListener('input', function() {
            gwsInput.value = getGWS(material.value);
            resultInput.value = calculateCO2(material.value, volumeInput.value, distanceInput.value);
        });
    });
}


function getGWS(materialType) {
    const GWS = {
        'argamassa1': 0.155,
        'argamassa2': 0.206
    };
    return GWS[materialType] || '';
}

function calculateCO2(materialType, volume, distance) {
    const GWP = {
        'argamassa1': 0.155,
        'argamassa2': 0.206
    };
    const impactTruck = 0.0383;

    const materialGWP = GWP[materialType];
    if (!materialGWP || !volume || !distance) return '';

    const emissionMaterial = volume * materialGWP;
    const T1 = (volume * distance) / 1000;
    const emissionTransport = T1 * impactTruck;
    const totalEmission = emissionMaterial + emissionTransport;

    return totalEmission.toFixed(2);
}
