$(document).ready(_ => {
    const url = 'https://f46acc4f-9fc6-448d-addb-84cee3ec619b.mock.pstmn.io';

    $('#btnAddBatch').on('click', event => addBatchClicked(url));
    updateBatchesTable();
    updateSelects();

    function updateBatchesTable()
    {
        $.getJSON(url + '/batches').then(data => {

            console.log('-----fill table with data-----');
            console.log(JSON.stringify(data));

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
    }
    function updateSelects() {
        console.log('-----fillSelects-----')
        fillSelect('/regions', 'selectRegion');
        fillSelect('/fruit', 'selectFruitName');
    }
    function fillSelect(appendUrl, selectId) {
        $.getJSON(url + appendUrl).then(data => {
            console.log(`Fill ${selectId} with =>` + JSON.stringify(data));

            const select = $('#' + selectId);
            for (let i in data) {
                $('<option>').html(data[i].name).val(data[i].name).appendTo(select);
            }

        });
    }

    


    
            
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
