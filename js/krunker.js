getSkinPath = (a, end = "") => {
    if (a.pat !== undefined) {
        return "textures/weapons/pat/" + a.pat + end + ".png";;
    } else if (a.type === 1 || a.type === 2) {
        return "textures/" + types[a.type] + a.id + (!a.tex ? "" : `_${a.tex}`) + end + ".png";
    } else if (a.def === true) {
        return "textures/" + types[0] + a.weapon + end + ".png";
    } else if (a.type === 3) {
        return "textures/" + (a.type && 4 == a.type ? "sprays/" + a.id : /*"previews/"*/ "" + (a.type && (3 > a.type || 4 < a.type) ? "cosmetics/" + a.type + "_" + a.id + (a.tex ? "_" + a.tex : "") : types[a.type || 0] + (a.type && 3 == a.type ? a.id + (null == a.pat ? null == a.tex ? "" : "_" + a.tex : "_c" + a.pat) : (a.weapon || 0) + "_" + (null == a.mid ? null == a.pat ? a.tex ? a.tex : a.id : "c" + a.pat : "m" + a.mid + (null == a.midT ? "" : "_" + a.midT))))) + end + ".png";
    } else {
        //Krunker's JS/Code (I did not write this code)
        return "textures/" + (a.type && 4 == a.type ? "sprays/" + a.id : /*"previews/"*/ "skins/" + (a.type && (3 > a.type || 4 < a.type) ? "cosmetics/" + a.type + "_" + a.id + (a.tex ? "_" + a.tex : "") : types[a.type || 0] + (a.type && 3 == a.type ? a.id + (null == a.pat ? null == a.tex ? "" : "_" + a.tex : "_c" + a.pat) : (a.weapon || 0) + "_" + (null == a.mid ? null == a.pat ? a.tex ? a.tex : a.id : "c" + a.pat : "m" + a.mid + (null == a.midT ? "" : "_" + a.midT))))) + end + ".png";
    }
}

getSkinPreview = (a) => {
    if (a.def !== true) {
        //Krunker's JS/Code (I did not write this code)
        return "https://assets.krunker.io/textures/" + (a.type && 4 == a.type ? "sprays/" + a.id : "previews/" + (a.type && (3 > a.type || 4 < a.type) ? "cosmetics/" + a.type + "_" + a.id + (a.tex ? "_" + a.tex : "") : types[a.type || 0] + (a.type && 3 == a.type ? a.id + (null == a.pat ? null == a.tex ? "" : "_" + a.tex : "_c" + a.pat) : (a.weapon || 0) + "_" + (null == a.mid ? null == a.pat ? a.tex ? a.tex : a.id : "c" + a.pat : "m" + a.mid + (null == a.midT ? "" : "_" + a.midT))))) + ".png";
    } else {
        return "https://assets.krunker.io/textures/previews/" + types[0] + a.weapon + ".png";
    }
}

var skinsDiv = document.getElementById("pSkins"),
    glowSelect = document.getElementById("glow");

updatePF = () => {
    setTimeout(() => {
        let sNum = 0;
        skinsDiv.innerHTML = "";
        var skinName = pInput.value;
        for (i of skins) {
            if (i.name.toLowerCase().includes(skinName.toLowerCase())) {
                //if (glowSelect.value === "all" || (glowSelect.value = "noglow" && !i.glow) || (glowSelect.value === "glow" && i.glow)) {
                let emissive = "";
                if (i.glow) {
                    emissive = `<div class="cardActionSep"></div><a class="cardAction" onclick="input.value = '${getSkinPath(i, "_e")}' /* add emissive */">Add Emissive</a>`
                }
                let iCard = document.createElement("div"),
                    iCol = rarities[i.rarity].color;
                skinsDiv.appendChild(iCard);
                iCard.outerHTML = `
                <div class="itemCard" style="color:${iCol};border:3px solid ${iCol}">${i.name}<img draggable="false" class="marketImg"
                src="${getSkinPreview(i)}">
            <div class="cardActions">
            <h1 class="cardActionH">${i.name}</h1>
                <a class="cardAction" onclick="input.value = '${getSkinPath(i)}' /* add normal */">Add Base</a>
                ${emissive}
            </div>
        </div>
                `
                sNum++;
                //}
            }
            //if (sNum >= 9) break;
        }
        if (skinsDiv.innerHTML === "") {
            skinsDiv.innerHTML = "<h1 style=\"font-size: 35px; text-align:center\">No skins found</h1>"
        }
    }, 1);
}

updatePF();