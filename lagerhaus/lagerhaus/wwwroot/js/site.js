$(document).ready(_ => {

    const url = 'https://f46acc4f-9fc6-448d-addb-84cee3ec619b.mock.pstmn.io';

    $.getJSON(url + '/batches').then(data => {

        console.log('fill table with data =>');
        console.log(data);

        

        for (var i in data) {
            let tr = $('<tr>');
            $('#tblBatches').append(tr);


            $('<th>').html(data[i].fruit_name).appendTo(tr);
            $('<th>').html(data[i].month).appendTo(tr);
            $('<th>').html(data[i].amount).appendTo(tr);
            $('<th>').html(data[i].storage_date).appendTo(tr);
            $('<th>').html(data[i].region).appendTo(tr);
            $('<th>').html(data[i].ripeness).appendTo(tr);

            
        }
    });



    //function addBachClicked() {
    //    $.post(url, {
    //        fruit_name: inputFruitName, month: inputMonth, amount: inputAmount, storage_date: inputStorageData, region: inputRegion, ripeness: inputRipeness
    //    }, function (result, status) {
    //        const element = document.getElementById('txtStatus');
    //        element.value = 'Successfull';
    //        element.backgroundColor = 'red';
    //    });
    //    return null;
    //}


});



//fruit_name
//month
//amount
//storage_date
//region
//ripeness