(function(){
    if(app.documents.length<1){
        alert("you don't open any document");
        return false;
    }
    var objectsData = [];
    var docs = getAlldocs();
    for(var n=0;n<docs.length;n++){
        try{
            if(app.selection.length<1){
                throw "オブジェクトが選択されていません。";
            }
            app.activeDocument = docs[n];
            countObject();
        }catch(e){
            alert(e);
            continue;
        }
    }


    function getAlldocs(){
        var docs = [];
        for(var i=0;i<app.documents.length;i++){
            docs[i] = app.documents[i];
        }
        return docs;
    }


    var FileSystem = function(array){
            var reg=/(.*)(?:\.([^.]+$))/;
            var fName = activeDocument.name.toString().match(reg)[1];
            this.path = activeDocument.path + "/"+fName+"_ファイル数.csv"
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
                    text += "document name," + this.objects[i].name +"\n";
                    text += "width,"+ this.objects[i].width +"\n";
                    text += "height," + this.objects[i].height + "\n";
                    text += "枚数," + this.objects[i].num + "\n\n"
                }
                text += "版下の数合計," + countSum(this.objects);
                fileObj.write(text);
                fileObj.close();
            }else{
                alert("ファイルが開けませんでした");
            }
            function countSum(array){
                var sum = 0;
                for(var n=0;n<array.length;n++){
                    sum += parseFloat(array[n].num);
                }
                return sum;
            }
        }

    var system = new FileSystem(objectsData);
    system.writeFile();

    function countObject(){

        var doc = app.activeDocument;
        doc.rulerOrigin = [0, doc.height];//座標の原点をアートボードの左上に設定
        var mmRatio = 0.352778;
        var pointRatio = 2.83;
        var array = sizeLists(activeDocument.selection);
        return array;

        function debugLookUpArray(array){
            for(var i = 0;i<array.length;i++){
                $.writeln(array[i].width);
                $.writeln(array[i].height);
                $.writeln(array[i].num);
            }
        }    

        function sortSizes(selects){
            var printData = [];
            for(var i=0;i<selects.length;i++){
                printData[i] = getData(selects[i]);
            }
            return printData;
        }


        function getData(version){
            var Versions = function(version){
                this.width = Math.floor(version.width * mmRatio);
                this.height = Math.floor(version.height * mmRatio);
                this.name = app.activeDocument.name.toString();
                this.num = version.num;
            }  
            var sizeObj = new Versions(version);
            return sizeObj;
        }

        


        function sizeLists(objects){
            //var sizes = [];
            for(var i=0;i<objects.length;i++){
                compare(objects[i]);
            }

            //return sizes;
            function compare(obj){
                for(var l =0;l<objectsData.length;l++){
                    if(Math.floor(obj.width * mmRatio) == objectsData[l].width && Math.floor(obj.height * mmRatio) == objectsData[l].height){
                        objectsData[l].num++
                        return
                    }
                }
                obj.num = 1;
                objectsData.push(getData(obj));
            }
        }   
    }


})();