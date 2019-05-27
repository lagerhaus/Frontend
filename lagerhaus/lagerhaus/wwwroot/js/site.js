$(document).ready(_ => {
    const url = 'https://f46acc4f-9fc6-448d-addb-84cee3ec619b.mock.pstmn.io';
    
    $('#btnAddBatch').on('click', event => addBatchClicked(url + '/batches'));
    $('#btnWeatherLoad').on('click', event => loadWeather());
    
    

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

            for (var i in data) {
                let tr = $('<tr>');
                $('#tblBatches').append(tr);

                $('<td>').html(data[i].fruit_name).appendTo(tr);
                $('<td>').html(data[i].year).appendTo(tr);
                $('<td>').html(data[i].month).appendTo(tr);
                $('<td>').html(data[i].amount).appendTo(tr);
                $('<td>').html(data[i].storage_date).appendTo(tr);
                $('<td>').html(data[i].region).appendTo(tr);
                $('<td>').html(data[i].ripeness).appendTo(tr);
            }
        });
    }
    function updateFruitsTable() {
        $.getJSON(url + '/fruit').then(data => {

            console.log('-----fill fruits table with data-----');
            console.log(JSON.stringify(data));

            for (var i in data) {
                let tr = $('<tr>');
                $('#tblFruits').append(tr);

                $('<td>').html(data[i].name).appendTo(tr);
                $('<td>').html(data[i].ripeness_grades[0].name).appendTo(tr);
                $('<td>').html(data[i].ripeness_grades[0].minimum_storage_span).appendTo(tr);
            }
        });
    }
    function updateRegionsTable() {
        $.getJSON(url + '/regions').then(data => {

            console.log('-----fill regions table with data-----');
            console.log(JSON.stringify(data));

            for (var i in data) {
                let tr = $('<tr>');
                $('#tblRegions').append(tr);

                $('<td>').html(data[i].name).appendTo(tr);
                $('<td>').html(data[i].area).appendTo(tr);
                $('<td>').html(data[i].level).appendTo(tr);
            }
        });
    }

    function loadWeather() {
        
        const year = $('#txtWeatherYear').val();
        const month = $('#txtWeatherMonth').val();
        console.log(`-----loadWeather (year: ${year},month: ${month}) -----`);

        const urlToSend = `${url}/weather/${year}/${month}`;
        console.log(urlToSend);
        $.getJSON(`${url}/weather/${year}/${month}`).then(data => {
            console.log(`-----fill weather table with data (year: ${year},month: ${month})-----`);
            console.log(JSON.stringify(data));

            for (var i in data) {
                let tr = $('<tr>');
                $('#tblWeather').append(tr);

                $('<td>').html(data[i].year).appendTo(tr);
                $('<td>').html(data[i].month).appendTo(tr);
                $('<td>').html(data[i].region).appendTo(tr);
                $('<td>').html(data[i].rainy_days).appendTo(tr);
                $('<td>').html(data[i].sunny_days).appendTo(tr);
            }
        });
    }
    function updateWeatherTable() {
        $.getJSON(url + '/weather').then(data => {

            console.log('-----fill regions table with data-----');
            console.log(JSON.stringify(data));

            for (var i in data) {
                let tr = $('<tr>');
                $('#tblWeather').append(tr);

                $('<td>').html(data[i].year).appendTo(tr);
                $('<td>').html(data[i].month).appendTo(tr);
                $('<td>').html(data[i].region).appendTo(tr);
                $('<td>').html(data[i].level).appendTo(tr);
                $('<td>').html(data[i].level).appendTo(tr);
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
    


    function initializeTabButtons() {
        $('#btnBatches').on('click', event => openTableInTab('Batches'));
        $('#btnFruits').on('click', event => openTableInTab('Fruits'));
        $('#btnRegions').on('click', event => openTableInTab('Regions'));
        $('#btnWeather').on('click', event => openTableInTab('Weather'));

        $('#btnBatchesAddTab').on('click', event => openAddingInTab('BatchesAdd'));
        $('#btnFruitsAddTab').on('click', event => openAddingInTab('FruitsAdd'));
        $('#btnRegionsAddTab').on('click', event => openAddingInTab('RegionsAdd'));
        $('#btnWeatherAddTab').on('click', event => openAddingInTab('WeatherAdd'));

        $('#btnBatches').click();
        $('#btnBatchesAddTab').click();
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