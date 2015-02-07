(function() {

    var jsfiles = new Array(
        "override-openlayers.js",
        "override-ext.js",
        "override-geoext.js",
        "widgets/StylesDialog.js",
        "widgets/VectorStylesDialog.js",
        "widgets/StyleFeature.js",
        "plugins/CoordSearchForm.js",
        "plugins/ActiveThemesPanel.js",
        "plugins/LayerNodeContextMenu.js",
        "plugins/LayerNodeMenuItem.js",
        "plugins/VectorStyleWriter.js",
        "ColorManager.js"
    );
    
    var scripts = document.getElementsByTagName("script");
    var parts = scripts[scripts.length-1].src.split("/");
    parts.pop();
    var path = parts.join("/");

    var len = jsfiles.length;
    var pieces = new Array(len);

    for (var i=0; i<len; i++) {
        pieces[i] = "<script src='" + path + "/" + jsfiles[i] + "'></script>"; 
    }
    document.write(pieces.join(""));
    
    if (GeoExt.Lang) {
        GeoExt.Lang.set(OpenLayers.Util.getParameters()["lang"] || GeoExt.Lang.locale);
    }

})();