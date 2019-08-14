(function(){
    var dObj = new Date();
    var d = dObj.getDate();
    var textObj = activeDocument.textFrames.add();
    textObj.contents = "d"; 
})();