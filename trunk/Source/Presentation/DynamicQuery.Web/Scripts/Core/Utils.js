(function (jQuery) {
    // Hiba üzenet megjelenítése
    this.showError = function (message) {
        $('#message').html(message);
        $('#info').css("visibility", "visible");
        if ($('#info').hasClass("ui-state-success")) {
            $('#info').removeClass("ui-state-success");
        }
        $('#info').addClass("ui-state-error");
    };
    // Információs üzenet megjelenítése
    this.showSuccess = function (message) {
        $('#message').html(message);
        $('#info').css("visibility", "visible");
        if ($('#info').hasClass("ui-state-error")) {
            $('#info').removeClass("ui-state-error");
        }
        $('#info').addClass("ui-state-success");
    };
    // Hiba üzenet elrejtése
    this.hideInfo = function () {
        $('#message').html('');
        $('#info').css("visibility", "hidden");
    };
    // Log a console-ra
    this.logToConsole = function(classname, message) {
        if (CONST_DEBUGMODE) {
            console.log(classname + '::' + message);
        }
    };
    jQuery.Utils = this;

})(jQuery);