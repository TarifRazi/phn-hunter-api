const loadPhone = async (searchText , isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);

    const phoneContainer = document.getElementById('phone-container');
    // clear container
    phoneContainer.textContent = '';

    // display show all btn
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }

    console.log('is show all', isShowAll)
    // display first 5 phones
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }
    phones.forEach(phones => {
        console.log(phones)
        // create a div
        const phoneCard = document.createElement('div');
        phoneCard.className = `card w-96 text-center bg-gray-100 shadow-xl`;
        phoneCard.innerHTML = `
        <figure class="mt-4 text-center"><img src="${phones.image
            }" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phones.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
            <button onclick ="handleShowDetails('${phones.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        </div> `;

        phoneContainer.appendChild(phoneCard);

    });

    // hide loading dots
    toggleLoadingDots(false);
}

const handleShowDetails = async (id) => {
    console.log("ay!", id);
    // load phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText = phone.name;

    const showDetailsContainer = document.getElementById('show-details-container');

    showDetailsContainer.innerHTML = `
        <img src="${phone.image}" alt="Shoes" />
        <p><span>Storage: </span>${phone?.mainFeatures?.storage}</p> 
        <p><span>chipSet: </span>${phone?.mainFeatures?.chipSet || 'not declared'}</p> 
        <p><span>GPS: </span>${phone?.others?.GPS || 'no GPS'}</p>
        <p><span>Bluetooth: </span>${phone?.others?.Bluetooth || 'not available'}</p>
        <p><span>Radio: </span>${phone?.others?.Radio || 'not available'}</p>
        <p><span>Bluetooth: </span>${phone?.others?.USB}</p>
        
        
    `

    // show modal
    showDetailsModal.showModal()
}

// handle search
const handleSearch = (isShowAll) => {
    toggleLoadingDots(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingDots = (isLoading) => {
    const loadingDots = document.getElementById('loading-dots');
    if (isLoading) {
        loadingDots.classList.remove('hidden');
    }
    else {
        loadingDots.classList.add('hidden');
    }
}

// show all button
const handleShowAll = () => {
    handleSearch(true);
}

// loadPhone();