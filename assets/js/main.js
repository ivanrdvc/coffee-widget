var links = document.querySelectorAll(".itemLinks");
var wrapper = document.querySelector(".slider");

var activeLink = 0;

for (var i = 0; i < links.length; i++) {
    var link = links[i];
    link.addEventListener('click', setClickedItem, false);

    link.itemID = i;
}

links[activeLink].classList.add("active");

function setClickedItem(e) {
    removeActiveLinks();

    var clickedLink = e.target;
    activeLink = clickedLink.itemID;

    changePosition(clickedLink);
}

function removeActiveLinks() {
    for (var i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
    }
}


function changePosition(link) {
    var position = link.getAttribute("data-pos");

    var translateValue = "translate3d(" + position + ", 0px, 0)";
    wrapper.style[transformProperty] = translateValue;

    link.classList.add("active");
}

var transforms = ["transform",
    "msTransform",
    "webkitTransform",
    "mozTransform",
    "oTransform"];

var transformProperty = getSupportedPropertyName(transforms);

function getSupportedPropertyName(properties) {
    for (var i = 0; i < properties.length; i++) {
        if (typeof document.body.style[properties[i]] != "undefined") {
            return properties[i];
        }
    }
    return null;
}