const form = document.querySelector("#searchForm");
let id = 0;
form.addEventListener('submit', async function (e) {
    deleteImages();
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm } };
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);

    makeImages(res.data);
    form.elements.query.value = "";
});
const container = document.querySelector("#container1");
const results = document.querySelector("#results");
const makeImages = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const newDiv = document.createElement('div');
            newDiv.className = 'container1';
            newDiv.id = `${id++}`;
            document.body.appendChild(newDiv);

            const img = document.createElement('img');
            img.src = result.show.image.medium;
            img.className = 'image';
            newDiv.appendChild(img);

            let overlay = document.createElement('div');
            overlay.className = 'middle';
            newDiv.appendChild(overlay);

            let textInOverlay = document.createElement('a');
            console.log(result.show.url);
            textInOverlay.href = `${result.show.url}`;
            textInOverlay.className = 'text';
            textInOverlay.innerText = 'Watch';
            overlay.appendChild(textInOverlay);


        }
    }
}

const deleteImages = () => {
    for (let i = 0; i < id; i++) {
        let element = document.getElementById(`${i}`);
        console.log(i);
        element.remove();
    }
}