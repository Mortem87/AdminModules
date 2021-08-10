function CloseAlert(alert) {
    if (alert == 'alert_success') {
        document.getElementById("alert_success").style.display = "none";
    }
    if (alert == 'alert_warning') {
        document.getElementById("alert_warning").style.display = "none";
    }
    if (alert == 'alert_danger') {
        document.getElementById("alert_danger").style.display = "none";
    }
}
function alert_warning(mensaje) {
    document.getElementById("alert_success").style.display = "none";
    document.getElementById("alert_warning").style.display = "block";
    document.getElementById("alert_danger").style.display = "none";
    document.getElementById("alert_warning_p").innerHTML = mensaje;
}
function alert_success(mensaje) {
    document.getElementById("alert_success").style.display = "block";
    document.getElementById("alert_warning").style.display = "none";
    document.getElementById("alert_danger").style.display = "none";
    document.getElementById("alert_success_p").innerHTML = mensaje;
}
function alert_danger(mensaje) {
    document.getElementById("alert_success").style.display = "none";
    document.getElementById("alert_warning").style.display = "none";
    document.getElementById("alert_danger").style.display = "block";
    document.getElementById("alert_danger_p").innerHTML = mensaje;
}