$(document).ready(_ => {
    const url = 'https://f46acc4f-9fc6-448d-addb-84cee3ec619b.mock.pstmn.io';

    $('#btnAddBatch').on('click', event => addBatchClicked(url));

    $.getJSON(url + '/batches/Apple/2019/6').then(data => {
        console.log(data);
        if (data.length === 0) {
            console.log('Request is empty');
        }
    });
            
    function addBatchClicked(url) {
        const inputFruitName = document.getElementById('txtFruitName').value;
        const inputMonth = document.getElementById('txtMonth').value;
        const inputAmount = document.getElementById('txtAmount').value;
        const inputStorageDate = document.getElementById('txtStorageDate').value;
        const inputRegion = document.getElementById('txtRegion').value;
        const inputRipeness = document.getElementById('txtRipeness').value;
        console.log(inputRegion);
        $.post(url, {
            fruit_name: inputFruitName, month: inputMonth, amount: inputAmount, storage_date: inputStorageDate, region: inputRegion, ripeness: inputRipeness
        }, function (result, status) {
            const element = document.getElementById('txtStatus');
            element.value = status;
            element.backgroundColor = 'red';
        });
        console.log(inputAmount);
        return null;
    }
});