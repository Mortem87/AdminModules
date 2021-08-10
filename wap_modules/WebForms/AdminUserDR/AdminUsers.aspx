<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AdminUsers.aspx.cs" Inherits="wap_modules.WebForms.AdminUserDR.AdminUsers" %>

<!DOCTYPE html>
<html lang="en">
<head runat="server">
  <title>Bootstrap Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="../bootstrap/3.4.1/css/bootstrap.min.css" rel="stylesheet" />
    <script src="../jquery/3.5.1/jquery.min.js"></script>
    <script src="../bootstrap/3.4.1/js/bootstrap.min.js"></script>

<script>
    function GoToMenu()
    {
        location.replace("../../Default.aspx");
    }
</script>
</head>
<body style="background-color:#FAFCAF;">
    <form id="frm_Create_User" runat="server">
<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
      <a class="navbar-brand" href="#">MOD-ADMINUSER-DR</a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">Inicio</a></li>
        <!--<li class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown" href="" >Crear Usuario<span class="caret"></span></a>
          <!--<ul class="dropdown-menu">
            
            <li><a href="#"  onclick="lurl()">Crear Usuario.</a></li>
            <li><a href="#">Page 1-2</a></li>
            <li><a href="#">Page 1-3</a></li>
            
          </ul>
          
        </li>-->
        <!--<li><a href="CreateUser.aspx">Crear Usuario</a></li>-->
        <!--<li><a href="UpdateUser.aspx">Actualizar Usuario</a></li>-->
        <li id ="LI_ASSOCIATE_USER"><a href="AssociateUserWithCustomer.aspx">Vincular Usuario</a></li>
        <!--<li><a href="ResetPassword.aspx">Restablecer Contraseña</a></li>-->
        <li id ="LI_LIST_USERS"><a href="ListUsers.aspx">Lista de Usuarios</a></li>
        <li id ="LI_SEARCH_CUSTOMERSAII"><a href="SearchCustomerSAII.aspx">Expediente Digital/Reporteador SAII</a></li>
        <li id ="LI_SEARCH_CUSTOMSDECLARATIONS"><a href="SearchCustomsDeclarations.aspx">Lista de Pedimentos</a></li>
        <li id ="LI_LIST_CONFIG"><a href="ListConfigurations.aspx">Lista de Configuraciones</a></li>
        <li id ="LI_UPLOAD_LOGS"><a href="UploadLogs.aspx">Upload Logs</a></li>
        <!--<li><a href="SearchCustomerSAII.aspx">Expediente Digital/Reporteador SAII</a></li>-->
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
        <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
      </ul>
    </div>
  </div>
</nav>
<div id="div_container" class="container" >
  <h3>Welcome To AdminUser Module Digital Records</h3>
  <p>In this example, the navigation bar is hidden on small screens and replaced by a button in the top right corner (try to re-size this window).
  <p>Only when the button is clicked, the navigation bar will be displayed.</p>
    <button type="button" style="text-align: left;" class="btn btn-default btn-block" onclick="GoToMenu()">
        <span class="glyphicon glyphicon-home" aria-hidden="true"></span> Go To Menu
    </button>
</div>
</form>
</body>
</html>



