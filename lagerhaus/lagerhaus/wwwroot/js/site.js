$(document).ready(_ => {

})

function addBachClicked() {
    $.post(url, {
        fruit_name: inputFruitName, month: inputMonth, amount: inputAmount, storage_date: inputStorageData, region: inputRegion, ripeness: inputRipeness
    }, function (result, status) {
        const element = document.getElementById('txtStatus');
        element.value = 'Successfull';
        element.backgroundColor = 'red';
    });
    return null;
}

fruit_name
month
amount
storage_date
region
ripeness