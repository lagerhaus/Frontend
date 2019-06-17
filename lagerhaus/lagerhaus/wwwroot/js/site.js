$(document).ready(_ => {
    const url = 'https://b52a9c67-9279-47a2-b5c4-c2fabb4a9e86.mock.pstmn.io';
    
    $('#btnAddBatch').on('click', event => addBatchClicked(url + '/batches'));
    $('#btnAddFruit').on('click', event => addFruitClicked(url + '/fruit'));
    $('#btnAddRegion').on('click', event => addRegionClicked(url + '/regions'));
    $('#btnAddWeather').on('click', event => addWeatherClicked(url + '/weather'));
    $('#btnWeatherLoad').on('click', event => loadWeather(url + '/weather'));

    updateTables();
    updateSelects();
    initializeTabButtons();

    function updateTables() {
        updateBatchesTable();
        updateFruitsTable();
        updateRegionsTable();
    }

    function updateBatchesTable() {
        $.getJSON(url + '/batches').then(data => {

            console.log('-----fill batches table with data-----');
            console.log(JSON.stringify(data));

            let body = $('<tbody>');
            for (var i in data) {
                let tr = $('<tr>');
                body.append(tr);

                $('<td>').html(data[i].fruit_name).appendTo(tr);
                $('<td>').html(data[i].year).appendTo(tr);
                $('<td>').html(data[i].month).appendTo(tr);
                $('<td>').html(data[i].amount).appendTo(tr);
                $('<td>').html(data[i].storage_date).appendTo(tr);
                $('<td>').html(data[i].region).appendTo(tr);
                $('<td>').html(data[i].ripeness).appendTo(tr);
            }
            $('#tblBatchesBody').replaceWith(body);
        });
    }

    function updateFruitsTable() {

        $.getJSON(url + '/fruit').then(data => {

            console.log('-----fill fruits table with data-----');
            console.log(JSON.stringify(data));

            let body = $('<tbody>');
            for (var i in data) {
                let tr = $('<tr>');
                body.append(tr);

                $('<td>').html(data[i].name).appendTo(tr);
                $('<td>').html(data[i].ripeness_grades[0].name).appendTo(tr);
                $('<td>').html(data[i].ripeness_grades[0].minimum_storage_span).appendTo(tr);
            }
            $('#tblFruitsBody').replaceWith(body);
        });
    }

    function updateRegionsTable() {
        $.getJSON(url + '/regions').then(data => {

            console.log('-----fill regions table with data-----');
            console.log(JSON.stringify(data));

            let body = $('<tbody>');
            for (var i in data) {
                let tr = $('<tr>');
                body.append(tr);

                $('<td>').html(data[i].name).appendTo(tr);
                $('<td>').html(data[i].area).appendTo(tr);
                $('<td>').html(data[i].level).appendTo(tr);
            }
            $('#tblRegionsBody').replaceWith(body);
        });
    }

    function loadWeather() {
        const year = $('#txtWeatherYear').val();
        const month = $('#txtWeatherMonth').val();

        console.log(`-----loadWeather (year: ${year}, month: ${month}) -----`);
        const urlToSend = `${url}/weather/${year}/${month}`;

        console.log(urlToSend);

        $.getJSON(urlToSend).then(data => {
            console.log(`-----fill weather table with data (year: ${year}, month: ${month})-----`);
            console.log(JSON.stringify(data));

            console.log(data.length);
            let body = $('<tbody>');
            for (var i in data) {
                console.log(data[i])
                let tr = $('<tr>');
                body.append(tr);

                $('<td>').html(data[i].year).appendTo(tr);
                $('<td>').html(data[i].month).appendTo(tr);
                $('<td>').html(data[i].region).appendTo(tr);
                $('<td>').html(data[i].rainy_days).appendTo(tr);
                $('<td>').html(data[i].sunny_days).appendTo(tr);
            }
            $('#tblWeatherBody').replaceWith(body);
        });
    }

    function updateSelects() {
        console.log('-----fillSelects-----')
        fillSelect('/regions', 'selectRegion_batch');
        fillSelect('/fruit', 'selectFruitName_batch');
        fillSelect('/regions', 'selectRegion_weather');
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

    function initializeTabButtons() {
        $('#btnBatches').on('click', event => openTableInTab('Batches'));
        $('#btnFruits').on('click', event => openTableInTab('Fruits'));
        $('#btnRegions').on('click', event => openTableInTab('Regions'));
        $('#btnWeather').on('click', event => openTableInTab('Weather'));
        
        $('#btnBatches').click();
    }
    function openTableInTab(name) {
        console.log('openTableInTab with ' + name);

        var i, tabcontent, tablinks;
        tabcontent = $('.tabcontent');
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = 'none';
        }
        tablinks = $('.tablinks');
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(' active', '');
        }
        $('#' + name).css('display','block');
    } 
    function openAddingInTab(name) {
        console.log('openAddingInTab with ' + name);
        var i, tabcontent, tablinks;
        
        tabcontent = $('.tabcontentAdd');
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = 'none';
        }
        
        tablinks = $('.tablinksAdd');
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(' active', '');
        }
        $('#' + name).css('display', 'block');
    } 
    
    function addBatchClicked(url) {
        const inputFruitName = document.getElementById('selectFruitName_batch').value;
        const inputYear = document.getElementById('txtYear_batch').value;
        const inputMonth = document.getElementById('txtMonth_batch').value;
        const inputAmount = document.getElementById('txtAmount_batch').value;
        const inputStorageDate = document.getElementById('txtStorageDate_batch').value;
        const inputRegion = document.getElementById('selectRegion_batch').value;
        const inputRipeness = document.getElementById('txtRipeness_batch').value;
        console.log(inputRegion);
        $.post(url, {
            fruit_name: inputFruitName, year: inputYear, month: inputMonth, amount: inputAmount, storage_date: inputStorageDate, region: inputRegion, ripeness: inputRipeness
        }, function (result, status) {
            console.log(inputFruitName);
        });
        console.log(inputAmount);
        updateTables();
        updateSelects();
        return null;
    }

    function addFruitClicked(url) {
        const inputFruitName = document.getElementById('txtFruitName_fruit').value;
        const inputRipeness = document.getElementById('txtRipenessName_fruit').value;
        const inputMinimumStorage = document.getElementById('txtMinimumStorage_fruit').value;
        console.log(inputFruitName);
        $.post(url, {
            name: inputFruitName, ripeness_grades: { name: inputRipeness, minimum_storage_span: inputMinimumStorage }
        }, function (result, status) {
            console.log(inputMinimumStorage);
            });
        console.log(inputRipeness);
        updateTables();
        updateSelects();
    }

    function addRegionClicked(url) {
        const inputRegionName = document.getElementById('txtRegionName_region').value;
        const inputArea = document.getElementById('txtArea_region').value;
        const inputLevel = document.getElementById('txtLevel_region').value;
        console.log(inputLevel);
        $.post(url, {
            name: inputRegionName, area: inputArea, level: inputLevel
        }, function(result, status){
            console.log(inputArea)
            });
        console.log(inputRegionName)
        updateTables();
        updateSelects();
        return null;
    }

    function addWeatherClicked(url) {
        const inputYear = document.getElementById('txtYear_weather').value;
        const inputMonth = document.getElementById('txtMonth_weather').value;
        const inputRegion = document.getElementById('selectRegion_weather').value;
        const inputRainyDays = document.getElementById('txtRainyDays_weather').value;
        const inputSunnyDays = document.getElementById('txtSunnyDays_weather').value;
        console.log(inputYear);
        $.post(url, {
            year: inputYear, month: inputMonth, region: inputRegion, rainy_days: inputRainyDays, sunny_days: inputSunnyDays
        }, function (result, status) {
            console.log(inputRainyDays)
        });
        console.log(inputRegion)
        updateTables();
        updateSelects();
        return null;
    }
});