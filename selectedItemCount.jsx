(function(){
    if(app.documents.length<1){
        alert("you don't open any document");
        return false;
    }
    var doc = app.activeDocument;
    doc.rulerOrigin = [0, doc.height];//座標の原点をアートボードの左上に設定
    var mmRatio = 0.352778;
    var pointRatio = 2.83;
    var array = sortSizes(activeDocument.selection);
    function sortSizes(selects){
        var printData = [];
        for(var i=0;i<selects.length;i++){
            printData[i] = getData(selects[i]);
        }
        return printData;
    }

    /*
    function selectTrim(){
        var cutLayers = ["サイズ","カット","cut","c"];
        var printData = [];
        for(var i=0;i<cutLayers.length;i++){
            try{
                
                for(var j = 0;j<activeDocument.layers[cutLayers[i]].pageItems.length;j++){
                    try{
                        $.writeln(activeDocument.layers[cutLayers[i]].pageItems[j].fillColor);
                        printData.push(getData(activeDocument.layers[cutLayers[i]].pageItems[j]));
                    }catch(e){
                        alert("the item is locked");
                    }
                }
            }catch(e){

            }
        }
        return printData;
    }
    */

    function getData(version){
        $.writeln(Math.floor(version.width * mmRatio));
        $.writeln(Math.floor(version.height * mmRatio));
        var Versions = function(version){
            this.width = Math.floor(version.width * mmRatio);
            this.height = Math.floor(version.height * mmRatio);
        }  
        var sizes = new Versions(version);
        return sizes;
    }

    var FileSystem = function(array){
        this.path = activeDocument.path + "/ファイル数.csv"
        this.objects = array;
    }

    FileSystem.prototype.writeFile = function(){
        var fileObj = new File(this.path);
        var flag = fileObj.open("w");
        if (flag == true)
        {
            var  text = "";
            for(var i = 0;i<this.objects.length;i++){
                $.writeln(this.objects[i].width);
                text += "width,"+ this.objects[i].width +"\n";
                text += "height," + this.objects[i].height +"\n\n";
            }
            text += "版下の数," + this.objects.length;
            fileObj.write(text);
            fileObj.close();
        }else{
            alert("ファイルが開けませんでした");
        }
    }

    var system = new FileSystem(array);
    system.writeFile();

})();