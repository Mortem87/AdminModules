function CreateHeader(column_names, id_table) {

    var customers = document.getElementById(id_table);

    var header = document.createElement('div');


    var header_id = "ROW_HEADER";

    header.id = header_id;


    column_names.forEach(function (column) {

        var header_column = CreateColumn(header_id, column.name, column.width);

        header.appendChild(header_column);
    });
    customers.appendChild(header);

}

function DestroyTable(id_table) {
    var elemento = document.getElementById(id_table);
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}
function CreateBody(column_names, rows, identifier, id_table) {
    for (var i = 0, maxi = rows.length; i < maxi; ++i) {

        var identifier_name = rows[i][identifier];

        var type = (i % 2) ? 'par' : 'impar';

        var columns = [];

        column_names.forEach(function (column_name) {

            var value = rows[i][column_name.name];

            var column = { name: column_name.name, width: column_name.width, value: value, type: type };

            columns.push(column);
        });
        addRow(identifier_name, columns, id_table);
    }
}
function addRow(p_identifier_name, columns_objects, id_table) {


        var customers = document.getElementById(id_table);

        var customer = document.createElement('div');

        customer.setAttribute('display', 'flex');

        var p_customer_id = "ROW_" + p_identifier_name;

        customer.id = p_customer_id;

        columns_objects.forEach(function (column) {


            var row_user_name;

            if (column.name == 'ACCIONES') {

                console.log(column);

                column.value = p_identifier_name;

                row_user_name = ColumnTrash(column.value, column.name, p_customer_id, column.type, column.width);

            } else {

                row_user_name = ColumnCode(column.value, column.name, p_customer_id, column.type, column.width);

            }


             

            customer.appendChild(row_user_name);
        });


        customers.appendChild(customer);
    
    

}
function CreateColumn(header_id, column_name, width) {
    var header_email_fc = document.createElement('div');

    header_email_fc.id = header_id + '_' + column_name;

    header_email_fc.classList.add('header');

    header_email_fc.classList.add('header-middle');

    header_email_fc.classList.add('col-sm-' + width);

    header_email_fc.classList.add('Rows');

    var txt_email_fc = document.createTextNode(column_name);

    var stg_email_fc = document.createElement('strong');

    stg_email_fc.appendChild(txt_email_fc);

    header_email_fc.appendChild(stg_email_fc);

    return header_email_fc;
}

function ColumnCode(p_customer_code, p_column_name, p_customer_id, p_tipo, width) {

    var code_row = document.createElement('div');

    code_row.id = p_customer_id + '_' + p_column_name;

    code_row.classList.add('Rows');

    code_row.classList.add('ColumnCode');

    code_row.classList.add('col-sm-' + width);

    //<--
    if (p_tipo == 'impar') {
        code_row.classList.add('Rtable-cell--impar');
    }
    else {
        code_row.classList.add('Rtable-cell--par');
    }    //<--

    var txt_code = document.createTextNode(p_customer_code);

    var stg_code = document.createElement('strong');

    stg_code.appendChild(txt_code);

    code_row.appendChild(stg_code);

    return code_row;
}

function ColumnTrash(p_customer_code, p_column_name, p_customer_id, p_tipo, width) {

    var trash_row = document.createElement('div');

    trash_row.id = p_customer_id + '_' + p_column_name;

    trash_row.classList.add('Rows');

    trash_row.classList.add('ColumnTrash');

    trash_row.classList.add('col-sm-' + width);

    if (p_tipo == 'impar') {
        trash_row.classList.add('Rtable-cell--impar');
    } else {
        trash_row.classList.add('Rtable-cell--par');
    }

    var trash_icon = document.createElement('span');

    trash_icon.classList.add('glyphicon');

    trash_icon.classList.add('glyphicon-trash');

    trash_icon.setAttribute("aria-hidden", "true");

    trash_icon.setAttribute("onclick", "DeleteRow('" + p_customer_code + "');");

    trash_row.appendChild(trash_icon);

    return trash_row;
}


