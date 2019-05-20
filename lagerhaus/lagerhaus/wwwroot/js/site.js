$(document).ready(x => {
    console.log('JQuery ready');
    const url = 'https://f46acc4f-9fc6-448d-addb-84cee3ec619b.mock.pstmn.io';

    $.getJSON(url + '/batches/Apple/2019/6').then(data => {
        console.log(data);
        if (data.length === 0) {
            console.log('Request is empty');
        }
    })
})


