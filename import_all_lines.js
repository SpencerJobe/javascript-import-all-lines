/** - Spencer Jobe Copyright 2019 
* - MIT LICENSE 
* 
* Passes an array representing the lines of a text file to the callback.
* Automatically copies the provided path to the clipboard and provides 
* instructions for the user to paste it into the file path when prompted. 
*
* @param {string} path - path to desired file
* @param {function} callback - receives string array representing lines
* 
* @example
* var path = "C:\\data.csv";
* function handler(lines) {
*   console.log(lines.length);        
* };
* importAllLines(path,handler);
*/
function importAllLines(path,callback) {
            
    var copier = document.createElement("textarea");
    copier.value = path;
    document.body.appendChild(copier);
    copier.select();
    document.execCommand("copy");
    document.body.removeChild(copier);

    var mouseEvent = function() {
        selector.removeEventListener("mousemove",mouseEvent);
        selector.click();
        setTimeout(function(){
            document.body.removeChild(selector);
        },100);
    };

    var cssText = "position:fixed;top:-50%;left:-50%;width:200%;height:200%;";
    var selector = document.createElement("input");
    selector.setAttribute("type","file");
    selector.setAttribute("style",cssText);
    selector.addEventListener("mousemove",mouseEvent);
    selector.addEventListener("change", function (event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
            callback(event.target.result.split(/\r\n|\n/));
        };
        reader.readAsText(file);
    });
    alert("Press [CTRL]+V or [COMMAND]+V to paste the file path when prompted. ");
    document.body.appendChild(selector);
}
