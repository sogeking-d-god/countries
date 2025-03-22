let gallery = document.querySelector(".gallery");
let org_arr = [];
let flag = 1;
let temp_arr = [];

(function getCountries(url = "https://countriesnow.space/api/v0.1/countries/info?returns=flag") {
    axios(url)
        .then(response => {
            response.data.data.sort((a, b) => {
                return a.name.localeCompare(b.name); // Simplified sorting
            });
            org_arr = response.data.data;
            
            temp_arr = [...org_arr];  // Copying org_arr to temp_arr for filtering
            org_arr.forEach(obj => {
                renderCard(obj.name, obj.flag);
            });
        })
        .catch(error => console.log(error));
})();

function srt(a, b) {
    let A = a.name;
    let B = b.name;
    
    if (flag === 1) {
        return A.localeCompare(B); // Standard lexicographic comparison
    }
    return B.localeCompare(A); // Reverse lexicographic comparison
}

function sort_switch() {
    gallery.innerHTML = "";
    org_arr.sort(srt);  // Sorting org_arr
    temp_arr.sort(srt);
    // Render the sorted cards
    temp_arr.forEach(obj => {
        renderCard(obj.name, obj.flag);
    });

    // Toggle the flag to reverse the sorting order next time
    flag = flag === 1 ? -1 : 1;
}

function renderCard(country, flag) {
    let card = document.createElement("div");
    card.classList.add("cf", "card");
    card.style.backgroundImage = `url(${flag})`;
    card.innerText = country;
    gallery.appendChild(card);
}

function filterGallery(value) {
    temp_arr = org_arr.filter((country) => {
        return country.name.toLowerCase().startsWith(value.toLowerCase());
    });

    gallery.innerHTML = "";

    temp_arr.forEach(obj => {
        renderCard(obj.name, obj.flag);
    });
}
