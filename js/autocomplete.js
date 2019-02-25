function autocomplete(inp, trie) {
    var clickevent = new Event('autocomplete-click');

    var currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();

        if (!val) { return false; }
        currentFocus = -1;

        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");

        this.parentNode.appendChild(a);

        var matches = trie.find(val);

        for (i = 0; i < matches.length; i++) {
            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + matches[i].substr(0, val.length) + "</strong>";
            b.innerHTML += matches[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + matches[i] + "'>";

            b.addEventListener("click", function(e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
                document.dispatchEvent(clickevent);
            });
            a.appendChild(b);
        }
    });
    inp.addEventListener("keyup", function(e) {
        if (e.keyCode == 13) {
            closeAllLists();
        }
    })

    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++
            addActive(x)
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
                closeAllLists();
            }
        }
    });
    function addActive(x) {
        if (!x) return false;
        removeActive(x);

        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i])
            }
        }
    }
}