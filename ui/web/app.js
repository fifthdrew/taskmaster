const qs = document.querySelector.bind(document);
const qsAll = document.querySelectorAll.bind(document);

const logger = {
    error(err) { console.error(err) }
}

function showDisplay(id) { 
    id = id || '#landing';

    for(const el of qsAll('body > main')) {
        el.style.display = el.id === id.slice(1) ? 'block' : 'none';
    }
}

async function doRequest(url, method = 'GET', body = {}) {
    const baseUrl = 'http://localhost:2001';

    url = `${baseUrl}/${url}`;

    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    const json = await response.json();
    if(!response.ok) { throw new Error(json.message) };

    return json;
}

window.onload = function() {
    showDisplay(window.location.hash);

    qs('#signup form').addEventListener('submit', async(ev) => {
        ev.preventDefault();
        
        const formValues = {
            name: qs('[name=name]').value,
            email: qs('[name=email]').value,
            password: qs('[name=password]').value
        }

        try {
            const res = await doRequest('users', 'POST', formValues);

            showDisplay('#boards');
        } catch (ex) {
            logger.error(ex);
            return alert(ex.message);
        }
    });
};

window.onhashchange = (ev) => {
    showDisplay(window.location.hash);
}
