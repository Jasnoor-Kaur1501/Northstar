document.addEventListener('DOMContentLoaded', () => {
    const UNITS = {
        length: [
            { label: 'Meters (m)', value: 'm' },
            { label: 'Kilometers (km)', value: 'km' },
            { label: 'Feet (ft)', value: 'ft' },
            { label: 'Inches (in)', value: 'in' },
            { label: 'Miles (mi)', value: 'mi' },
        ],
        weight: [
            { label: 'Kilograms (kg)', value: 'kg' },
            { label: 'Grams (g)', value: 'g' },
            { label: 'Pounds (lb)', value: 'lb' },
            { label: 'Ounces (oz)', value: 'oz' },
        ],
        temperature: [
            { label: 'Celsius (°C)', value: 'C' },
            { label: 'Fahrenheit (°F)', value: 'F' },
            { label: 'Kelvin (K)', value: 'K' },
        ],
    };

    const CONVERSIONS = {
        'm-km': v => v / 1000, 'm-ft': v => v * 3.28084, 'm-in': v => v * 39.3701, 'm-mi': v => v / 1609.34,
        'km-m': v => v * 1000, 'ft-m': v => v / 3.28084, 'in-m': v => v / 39.3701, 'mi-m': v => v * 1609.34,
        'kg-g': v => v * 1000, 'kg-lb': v => v * 2.20462, 'kg-oz': v => v * 35.274,
        'g-kg': v => v / 1000, 'lb-kg': v => v / 2.20462, 'oz-kg': v => v / 35.274,
        'C-F': v => (v * 9/5) + 32, 'C-K': v => v + 273.15,
        'F-C': v => (v - 32) * 5/9, 'F-K': v => (v - 32) * 5/9 + 273.15,
        'K-C': v => v - 273.15, 'K-F': v => (v - 273.15) * 9/5 + 32,
    };

    let currentType = 'length';

    const elements = {
        tabs: document.querySelectorAll('.tab'),
        input: document.getElementById('inputValue'),
        fromSelect: document.getElementById('fromUnit'),
        toSelect: document.getElementById('toUnit'),
        resultValue: document.getElementById('resultValue'),
        resultUnit: document.getElementById('resultUnit'),
        copyBtn: document.getElementById('copyBtn'),
    };

    function updateSelects() {
        const units = UNITS[currentType];
        elements.fromSelect.innerHTML = units.map(u => `<option value="${u.value}">${u.label}</option>`).join('');
        elements.toSelect.innerHTML = units.map(u => `<option value="${u.value}">${u.label}</option>`).join('');
        elements.fromSelect.value = units[0].value;
        elements.toSelect.value = units[1].value;
        convert();
    }

    function convert() {
        const val = parseFloat(elements.input.value);
        const from = elements.fromSelect.value;
        const to = elements.toSelect.value;
        
        if (isNaN(val)) {
            elements.resultValue.textContent = '---';
            return;
        }

        if (from === to) {
            updateResult(val);
            return;
        }

        let result = val;
        if (currentType === 'temperature') {
            result = CONVERSIONS[`${from}-${to}`](val);
        } else {
            const base = currentType === 'length' ? 'm' : 'kg';
            let toBase = from === base ? val : CONVERSIONS[`${from}-${base}`](val);
            result = to === base ? toBase : CONVERSIONS[`${base}-${to}`](toBase);
        }
        updateResult(result);
    }

    function updateResult(val) {
        elements.resultValue.textContent = val % 1 === 0 ? val : val.toFixed(4);
        elements.resultUnit.textContent = elements.toSelect.value;
    }

    elements.tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            elements.tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentType = tab.dataset.type;
            updateSelects();
        });
    });

    elements.input.addEventListener('input', convert);
    elements.fromSelect.addEventListener('change', convert);
    elements.toSelect.addEventListener('change', convert);
    elements.copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(elements.resultValue.textContent).then(() => {
            elements.copyBtn.classList.add('success');
            setTimeout(() => elements.copyBtn.classList.remove('success'), 2000);
        });
    });

    updateSelects();
});
