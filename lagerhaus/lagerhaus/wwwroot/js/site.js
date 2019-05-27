$(document).ready(_ => {
    const url = 'https://f46acc4f-9fc6-448d-addb-84cee3ec619b.mock.pstmn.io';

    $.getJSON(url + '/batches').then(data => {

        console.log('fill table with data =>');
        console.log(data);

        for (var i in data) {
            let tr = $('<tr>');
            $('#tblBatches').append(tr);

            $('<td>').html(data[i].fruit_name).appendTo(tr);
            $('<td>').html(data[i].month).appendTo(tr);
            $('<td>').html(data[i].amount).appendTo(tr);
            $('<td>').html(data[i].storage_date).appendTo(tr);
            $('<td>').html(data[i].region).appendTo(tr);
            $('<td>').html(data[i].ripeness).appendTo(tr);
        }
    });

    $('#btnAddBatch').on('click', event => addBatchClicked(url+'/batches'));
            
    function addBatchClicked(url) {
        const inputFruitName = document.getElementById('txtFruitName').value;
        const inputYear = document.getElementById('txtYear').value;
        const inputMonth = document.getElementById('txtMonth').value;
        const inputAmount = document.getElementById('txtAmount').value;
        const inputStorageDate = document.getElementById('txtStorageDate').value;
        const inputRegion = document.getElementById('txtRegion').value;
        const inputRipeness = document.getElementById('txtRipeness').value;
        console.log(inputRegion);
        $.post(url, {
            fruit_name: inputFruitName, year: inputYear, month: inputMonth, amount: inputAmount, storage_date: inputStorageDate, region: inputRegion, ripeness: inputRipeness
        }, function (result, status) {
            const element = document.getElementById('txtStatus');
            element.value = status;
            console.log(inputYear);
            element.backgroundColor = 'red';
        });
        console.log(inputAmount);
        return null;
    }
});