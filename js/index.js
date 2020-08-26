zip.workerScriptsPath = "./lib/";

var fileInput = document.getElementById("fileInput"),
    input = document.getElementById("input"),
    zipCList = document.getElementById("zipCList"),
    pInput = document.getElementById("pInput"),
    popups = ["changelog"];

async function getVersion() {
    var version = document.getElementById("version"),
        changelog = await fetch("changelog.txt"),
        changelogText = await changelog.text(),
        changelog2 = document.getElementById("changelog");
    version.innerHTML = changelogText.slice(0, 6);
    changelog2.innerHTML = changelogText;
}
getVersion();

function showChangelog() {
    let changelogHolder = document.getElementById("changelogHolder");
    changelogHolder.style.display = "block";
    document.getElementById("popupHolder").style.display = "block";
}

function hidePopup() {
    clearInterval(this.interval);
    for (num = 0; num < popups.length; num++) document.getElementById(popups[num] + "Holder").style.display = "none";
    document.getElementById("popupHolder").style.display = "none";
}

class krunkerMod {
    constructor() {
        this.fileArr = []
    }

    clear() {
        this.fileArr.length = 0;
        zipCList.innerHTML = "";
    }

    add(file, path) {
        try {
            krunkerMod.blobUrlToBlob(URL.createObjectURL(file), path).then((blob) => {
                this.fileArr.push([blob, path]);
                let tLi = document.createElement("li");
                tLi.innerHTML = path;
                zipCList.appendChild(tLi);
            })
        } catch (err) {
            alert("Please Select a File!")
        }
    }

    download() {
        model.setCreationMethod("Blob");
        model.addFiles(this.fileArr,
            () => {},
            () => {},
            () => {},
            () => {
                model.getBlobURL(function (url) {
                    krunkerMod.downloadFile(url)
                });
            });
    }

    static blobUrlToBlob(url) {
        return new Promise((resolve, reject) => {
            fetch(url).then(r => resolve(r.blob()));
        })
    }

    static downloadFile(url) {
        let dAnchor = document.createElement("a");
        dAnchor.href = url;
        dAnchor.download = "Test_Krunker_Mod.zip";
        dAnchor.style.display = "none";
        document.body.appendChild(dAnchor);
        dAnchor.click();
        dAnchor.remove();
    }
}

var mainZip = new krunkerMod();

var obj = this;
var model = (function () {
    var zipFileEntry, zipWriter, writer, creationMethod, URL = obj.webkitURL || obj.mozURL || obj.URL;

    return {
        setCreationMethod: function (method) {
            creationMethod = method;
        },
        addFiles: function addFiles(fileArr, oninit, onadd, onprogress, onend) {
            var addIndex = 0;

            function nextFile() {
                var file = fileArr[addIndex]
                onadd(file);

                zipWriter.add(file[1], new zip.BlobReader(file[0]), function () {
                    addIndex++;
                    if (addIndex < fileArr.length)
                        nextFile();
                    else
                        onend();
                }, onprogress);
            }

            function createZipWriter() {
                zip.createWriter(writer, function (writer) {
                    zipWriter = writer;
                    oninit();
                    nextFile();
                }, onerror);
            }

            if (zipWriter)
                nextFile();
            else if (creationMethod == "Blob") {
                writer = new zip.BlobWriter();
                createZipWriter();
            } else {
                createTempFile(function (fileEntry) {
                    zipFileEntry = fileEntry;
                    writer = new zip.FileWriter(zipFileEntry);
                    createZipWriter();
                });
            }
        },
        getBlobURL: function (callback) {
            zipWriter.close(function (blob) {
                var blobURL = creationMethod == "Blob" ? URL.createObjectURL(blob) : zipFileEntry.toURL();
                callback(blobURL);
                zipWriter = null;
            });
        },
        getBlob: function (callback) {
            zipWriter.close(callback);
        }
    };
})();