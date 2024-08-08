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

document.getElementById('search-material').addEventListener('input', function() {
    const filter = this.value.toLowerCase();
    const materials = document.querySelectorAll('#material-list .material-item');
    const selectAll = document.createElement('div');
    selectAll.classList.add('material-item');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'select-all';
    checkbox.classList.add('material-checkbox');
    checkbox.addEventListener('change', function() {
        materials.forEach(item => {
            item.querySelector('input').checked = checkbox.checked;
        });
    });
    selectAll.appendChild(checkbox);
    
    const label = document.createElement('label');
    label.textContent = 'Selecionar Todos';
    selectAll.appendChild(label);
    
    document.getElementById('material-list').prepend(selectAll);
    
    materials.forEach(item => {
        const label = item.querySelector('label');
        if (label.textContent.toLowerCase().includes(filter)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });

    if (filter === '') {
        selectAll.style.display = '';
    } else {
        selectAll.style.display = 'none';
    }
});

document.getElementById('material-list').addEventListener('change', function(event) {
    if (event.target.type === 'checkbox') {
        updateArgamassaFields();
    }
});

function updateArgamassaFields() {
    const selectedMaterials = document.querySelectorAll('#material-list input:checked');
    const argamassaFields = document.getElementById('argamassa-fields');
    argamassaFields.innerHTML = ''; // Clear previous fields

    selectedMaterials.forEach(material => {
        const materialName = material.nextElementSibling.textContent;
        const row = document.createElement('div');
        row.classList.add('argamassa-row');
        
        const nameLabel = document.createElement('label');
        nameLabel.textContent = 'Material: ' + materialName;
        row.appendChild(nameLabel);

        const volumeLabel = document.createElement('label');
        volumeLabel.textContent = 'Volume (m³):';
        row.appendChild(volumeLabel);

        const volumeInput = document.createElement('input');
        volumeInput.type = 'number';
        volumeInput.name = 'volume';
        volumeInput.placeholder = 'Volume em m³';
        row.appendChild(volumeInput);

        const distanceLabel = document.createElement('label');
        distanceLabel.textContent = 'Distância (km):';
        row.appendChild(distanceLabel);

        const distanceInput = document.createElement('input');
        distanceInput.type = 'number';
        distanceInput.name = 'distance';
        distanceInput.placeholder = 'Distância em km';
        row.appendChild(distanceInput);

        const gwsLabel = document.createElement('label');
        gwsLabel.textContent = 'CO2e:';
        row.appendChild(gwsLabel);

        const gwsInput = document.createElement('input');
        gwsInput.type = 'text';
        gwsInput.name = 'gws';
        gwsInput.placeholder = 'CO2e';
        gwsInput.disabled = true; // This field is automatically filled
        row.appendChild(gwsInput);

        const resultLabel = document.createElement('label');
        resultLabel.textContent = 'Resultado:';
        row.appendChild(resultLabel);

        const resultInput = document.createElement('input');
        resultInput.type = 'text';
        resultInput.name = 'result';
        resultInput.placeholder = 'Resultado';
        resultInput.disabled = true; // This field is automatically filled
        row.appendChild(resultInput);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.type = 'button';
        removeButton.addEventListener('click', function() {
            argamassaFields.removeChild(row);
            material.checked = false; // Uncheck the material
        });
        row.appendChild(removeButton);

        argamassaFields.appendChild(row);

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
