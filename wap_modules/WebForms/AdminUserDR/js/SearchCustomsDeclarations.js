function GoToHome() {
    location.replace("AdminUsers.aspx")
}

window.onload = function () {

   
}
function GetCustomsDeclarations() {

    var patente = document.getElementById("txt_patente").value;

    var aduana = document.getElementById("txt_aduana").value;

    var pedimento = document.getElementById("txt_pedimento").value;

    var fecha_de_pago_inicio = document.getElementById("txt_fecha_de_pago_inicio").value;

    var fecha_de_pago_final = document.getElementById("txt_fecha_de_pago_final").value;

    var customer_id = document.getElementById("txt_customer_id").value;
    
    console.log(fecha_de_pago_inicio);
    console.log(fecha_de_pago_final);

    var jsonassociation = "{" +
        "'patente':'" + patente + "'" +
        ", " + "'aduana':'" + aduana + "'" +
        ", " + "'pedimento':'" + pedimento + "'" +
        ", " + "'fecha_de_pago_inicio':'" + fecha_de_pago_inicio + "'" +
        ", " + "'fecha_de_pago_final':'" + fecha_de_pago_final + "'" +
        ", " + "'customer_id':'" + customer_id + "'" +
        "}";

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Controller.aspx/GetCustomsDeclarations',
        data: jsonassociation,
        datatype: "json",
        success: function (response) {
            var id_table = 'div_customsdeclarations';

            DestroyTable(id_table);

            var message = response.d;

            console.log(message);

            if (message.Response.StatusCode == 501) {
                var errorMessage = message.Response.Description;
                alert_danger(errorMessage);
            }
            if (message.Response.StatusCode == 401) {
                var errorMessage = message.Response.Description;
                alert_warning(errorMessage);
            }
            if (message.Response.StatusCode == 200) {
                var errorMessage = message.Response.Description;
                alert_success(errorMessage);

                var column_names = [
                    { name: 'CODE', width: '1' },
                    { name: 'CUSTOMER_NAME', width: '4' },
                    { name: 'FECHA', width: '1' },
                    { name: 'PATENTE', width: '1' },
                    { name: 'ADUANA', width: '1' },
                    { name: 'PEDIMENTO', width: '1' },
                    { name: 'CLAVE', width: '1' },
                    { name: 'TIPO', width: '1' },
                    { name: 'REGIMEN', width: '1' }
                ];

                
                CreateHeader(column_names, id_table);
                CreateBody(column_names, message.Customs, 'PEDIMENTO', id_table);

                CustomsJSON = JSON.stringify(message.Customs);

                console.log(CustomsJSON);

                
            }
        },
        error: function (xmlhttprequest, textstatus, errorthrown) {
            alert_warning("La conexión al servidor a fallado.");
            //alert();
            console.log("error: " + errorthrown);
        }
    });
}
var CustomsJSON;
function ExportToCSV()
{
    var data = CustomsJSON;

    if (data == '')
        return;

    JSONToCSVConvertor(data, "CustomsDeclarations", true);

}
function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

    var CSV = '';
    //Set Report title in first row or line

    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";

        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {

            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);

        //append Label row with line break
        CSV += row + '\r\n';
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";

        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);

        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {
        alert("Invalid data");
        return;
    }

    //Generate a file name
    var fileName = "MyReport_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g, "_");

    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function GetCustomers() {

    var silacode = document.getElementById("txt_silacode").value;

    var darwincode = document.getElementById("txt_darwincode").value;

    var customername = document.getElementById("txt_customername").value;

    var jsonusername = "{" +
        "'silacode':'" + silacode + "'" +
        ", " + "'darwincode':'" + darwincode + "'" +
        ", " + "'customername':'" + customername + "'" +
        "}";

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Controller.aspx/GetCustomers',
        data: jsonusername,
        datatype: "json",
        success: function (response) {
            var message = response.d;
            console.log(response);

            var id_table = 'div_customers';

            DestroyTable(id_table);

            if (message.Response.StatusCode == 501) {
                var errorMessage = message.Response.Description;
                alert_danger(errorMessage);
            }
            if (message.Response.StatusCode == 401) {
                var errorMessage = message.Response.Description;
                alert_warning(errorMessage);
            }
            if (message.Response.StatusCode == 200) {
                var errorMessage = message.Response.Description;
                alert_success(errorMessage);
                var column_names = [
                    //{ name: 'ID', width: '1' },
                    //{ name: 'SILACODE', width: '2' },
                    { name: 'DARWINCODE', width: '3' },
                    { name: 'CUSTOMER_NAME', width: '9' }
                ];

                CreateHeader(column_names, id_table);
                CreateBody(column_names, message.Clientes, 'ID', id_table);

                var div = document.getElementById(id_table);
                var divs = div.getElementsByTagName('div');
                var divArray = [];
                for (var i = 0; i < divs.length; i += 1) {
                    var id = divs[i].id;

                    var id_is_valid = IdIsValid(id);

                    if (id_is_valid == true)
                    {
                        divArray.push(divs[i].innerHTML);
                        console.log(id);

                        var div = document.getElementById(id);

                        div.setAttribute("onclick", "GetCustomerByDiv(this);");

                        div.setAttribute("onmouseover", "MouseOver(this);");

                        /*div.addEventListener('click', function (event) {
                            alert(id);
                        });*/
                        /*
                         <h2 id="demo4" onmouseover="mouseOver()"> Perform the mouse over on this header.</h2>
<script>
function mouseOver() {
document.getElementById("demo4").style.color = "blue";
}
                         */
                    }

                }
                console.log(divArray.length);

                
            }
        },
        error: function (xmlhttprequest, textstatus, errorthrown) {
            alert("La conexión al servidor a fallado.");
            console.log("error: " + errorthrown);
        }
    });
}
function MouseOver(div) {

    //document.getElementById(div.id).style.color = "blue";

    //var div = document.getElementById(id_table);

    var divs = div.getElementsByTagName('div');
    /*var divArray = [];
    for (var i = 0; i < divs.length; i += 1)
    {

    }*/
    //console.log(divs);
    var id_table = 'div_customers';

    RePaintRows(id_table);
    for (var i = 0; i < divs.length; i += 1) {
        var div_in = divs[i];


        //console.log(div_in);
        document.getElementById(div_in.id).style.backgroundColor = "#ec971f";
        
    }

}
function RePaintRows(id_table)
{
    var div = document.getElementById(id_table);
    var divs = div.getElementsByTagName('div');
    var divArray = [];
    for (var i = 0; i < divs.length; i += 1)
    {
        var id = divs[i].id;

        var id_is_valid = IdIsValid(id);

        if (id_is_valid == true) {
            divArray.push(divs[i]);
        }
    }
    console.log(divArray.length);
    var i = 0;
    divArray.forEach(div_in => {
        i++;
        var type = (i % 2) ? 'par' : 'impar';

        if (type == 'par') {

            console.log(div_in);

            var divs_collection = div_in.getElementsByTagName('div');

            console.log(divs_collection.length);

            console.log(divs_collection);


            for (let i = 0; i < divs_collection.length; i++) {
                console.log(divs_collection[i]);
                divs_collection[i].style.backgroundColor = "#FAFCAF";
            }

            /* divs.forEach(div_in => {
 
                 document.getElementById(div_in.id).style.backgroundColor = "#FAFCAF";
 
             });*/
        }
        else
        {

            console.log(div_in);

            var divs_collection = div_in.getElementsByTagName('div');

            console.log(divs_collection.length);

            console.log(divs_collection);


            for (let i = 0; i < divs_collection.length; i++) {
                console.log(divs_collection[i]);
                divs_collection[i].style.backgroundColor = "White";
            }
        }

        console.log(type);

    });
}
function GetCustomerByDiv(div)
{
    console.log(div.id + ' output');


    var div = document.getElementById(div.id);
    var divs = div.getElementsByTagName('div');
    var divArray = [];



    for (var i = 0; i < divs.length; i += 1)
    {
        var id = divs[i].id;

        var id_is_valid = DARWINCODEIsValid(id);

        if (id_is_valid == true)
        {
            divArray.push(divs[i]);
            console.log(id);
        }
    }
    console.log(divArray.length);

    var div_darwin_code = divArray[0];

    //console.log(div_darwin_code);

    //console.log(div_darwin_code);

    //console.log(div_darwin_code.getElementsByTagName('strong'));



    var text = div_darwin_code.innerHTML;

    //console.log(text + ' text');

    var div_darwin_code_force = document.getElementById(div_darwin_code.id);

    //console.log(div_darwin_code_force);

    var strong_darwin_code = div_darwin_code_force.getElementsByTagName('strong');

    //console.log(strong_darwin_code[0]);


    console.log(strong_darwin_code[0].innerHTML);

    var darwin_code = strong_darwin_code[0].innerHTML;

    var txt_customer_id = document.getElementById('txt_customer_id');

    txt_customer_id.value = darwin_code;
}
function IdIsValid(Id) {

    var Idformat = /^ROW_[0-9]+$/

    if (Id.match(Idformat)) {

        return true;
    }
    else {

        return false;
    }
}//ROW_763_DARWINCODE
function DARWINCODEIsValid(Id) {

    var Idformat = /^ROW_[0-9]+_DARWINCODE$/

    if (Id.match(Idformat)) {

        return true;
    }
    else {

        return false;
    }
}//ROW_763_DARWINCODE
function GetCustomersFromDarwin() {

    let array = [];

    var silacode = document.getElementById("txt_silacode").value;

    var jsonusername = "{" +
        "'silacode':'" + silacode + "'" +
        "}";

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Controller.aspx/GetCustomersFromDarwin',
        data: jsonusername,
        datatype: "json",
        success: function (response) {
            var message = response.d;
            console.log(response);

            var id_table = 'div_customers';

            DestroyTable(id_table);

            if (message.Response.StatusCode == 501) {
                var errorMessage = message.Response.Description;
                alert_danger(errorMessage);
            }
            if (message.Response.StatusCode == 401) {
                var errorMessage = message.Response.Description;
                alert_warning(errorMessage);
            }
            if (message.Response.StatusCode == 200) {
                /*var errorMessage = message.Response.Description;
                alert_success(errorMessage);
                var column_names = [
                    { name: 'ID', width: '1' },
                    { name: 'SILACODE', width: '2' },
                    { name: 'DARWINCODE', width: '2' },
                    { name: 'CUSTOMER_NAME', width: '7' }
                ];

                CreateHeader(column_names, id_table);
                CreateBody(column_names, message.Clientes, 'ID', id_table);

                */

                message.Clientes.forEach(Cliente => {

                    array.push(Cliente.CUSTOMER_NAME);

                });

                console.log(array); // returns ['1', '2', '3', '4']

            }
        },
        error: function (xmlhttprequest, textstatus, errorthrown) {
            alert("La conexión al servidor a fallado.");
            console.log("error: " + errorthrown);
        }
    });
    return array;
}