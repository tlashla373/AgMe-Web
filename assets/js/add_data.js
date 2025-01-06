// Initialize Lucide icons
lucide.createIcons();

// DOM Elements
const harvestTypeSelect = document.getElementById('harvestType');
const newHarvestInput = document.getElementById('newHarvest');
const addHarvestBtn = document.getElementById('addHarvestBtn');
const areaSelect = document.getElementById('area');
const amountInput = document.getElementById('amount');
const saveSessionBtn = document.getElementById('saveSession');
const submitDataBtn = document.getElementById('submitData');
const sessionsContainer = document.getElementById('sessions');
const sessionsList = document.getElementById('sessionsList');
const reviewContainer = document.getElementById('review');
const reviewList = document.getElementById('reviewList');

// State
let sessions = [];

// Add new harvest type
addHarvestBtn.addEventListener('click', () => {
    const newHarvest = newHarvestInput.value.trim();
    if (newHarvest && !Array.from(harvestTypeSelect.options).some(option => option.value === newHarvest)) {
        const option = document.createElement('option');
        option.value = newHarvest;
        option.textContent = newHarvest;
        harvestTypeSelect.appendChild(option);
        harvestTypeSelect.value = newHarvest;
        newHarvestInput.value = '';
    }
});

// Save session
saveSessionBtn.addEventListener('click', () => {
    const harvestType = harvestTypeSelect.value;
    const area = areaSelect.value;
    const amount = amountInput.value;

    if (!harvestType || !area || !amount) {
        alert('Please fill all fields');
        return;
    }

    const session = {
        id: Date.now(),
        harvestType,
        area,
        amount: Number(amount)
    };

    sessions.push(session);
    
    // Show sessions container if hidden
    sessionsContainer.classList.remove('hidden');
    
    // Create session element
    const sessionElement = document.createElement('div');
    sessionElement.className = 'session-item';
    sessionElement.innerHTML = `
        <p>Harvest: ${session.harvestType}</p>
        <p>Area: ${session.area}</p>
        <p>Amount: ${session.amount} kg</p>
    `;
    sessionsList.appendChild(sessionElement);

    // Reset inputs
    harvestTypeSelect.value = '';
    areaSelect.value = '';
    amountInput.value = '';
});

// Submit data
submitDataBtn.addEventListener('click', () => {
    if (sessions.length === 0) {
        alert('Please add at least one session');
        return;
    }

    // Show review container
    reviewContainer.classList.remove('hidden');
    
    // Clear previous review
    reviewList.innerHTML = '';
    
    // Add review items
    sessions.forEach(session => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        reviewItem.textContent = `${session.harvestType} - ${session.area}: ${session.amount} kg`;
        reviewList.appendChild(reviewItem);
    });
});