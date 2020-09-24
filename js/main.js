const formElem = document.getElementById("listform");

const listElem = document.getElementById("itemlist");

let items = [{
    id: Math.random(),
    text: "Dummy item 1",
    complete: true,
}, {
    id: Math.random(),
    text: "Dummy new item 2",
    complete: false,
}, {
    id: Math.random(),
    text: "Dummy item 3",
    complete: false,
},
];

createForm(formElem);
createList(listElem);

function createList(listElem) {

    listElem.innerHTML = "";

    items.forEach(function (item) {
        let itemClassName = "item";
        if (item.complete) {
            itemClassName += " item--complete";
        }

        console.log(item);
        listElem.innerHTML += `                
        <li class="${itemClassName}" data-id="${item.id}">
            <button class="item__text" name="itemname">${item.text}</button>
            <button class="item__remove">Remove</button>
        </li>
        `;
    });

    document.querySelectorAll(".item .item__text")
        .forEach(function (itemElem) {
            itemElem.addEventListener("click", handleItemTextClick);
        });
    document.querySelectorAll(".item .item__remove")
        .forEach(function (itemElem) {
            itemElem.addEventListener("click", handleItemRemove);
        });

}

function handleItemTextClick(event) {

    const itemId = event.currentTarget.parentElement.dataset.id;
    // console.log(event.currentTarget.parentElement.getAttribute("data-id"));

    console.log("Item clicked! Item ID: " + itemId);

    // find index of item using the itemID
    const itemIndex = items.findIndex(function (item) {
        if (item.id === parseFloat(itemId)) {
            return true;
        }
        // return item.id === parseFloat(itemId); -- the same as previously
    });
    console.log(itemIndex);

    // toggle the items completed state

    items[itemIndex].complete = !items[itemIndex].complete;

    createList(listElem);
}

function handleItemRemove(event) {

    const itemId = event.currentTarget.parentElement.dataset.id;

    console.log("Item removed! Item ID: " + itemId);

    items = items.filter(function (item) {
        return item.id !== parseFloat(itemId);
    });

    createList(listElem);
}

// function for create form - add on the page

function createForm(formElem) {
    formElem.addEventListener("submit", handleAddItem);
}

function handleAddItem(event) {
    event.preventDefault();
    console.log("Form submitted");

    // get text from the form

    const itemText = event.currentTarget.itemtext.value.trim;

    event.currentTarget.itemtext.value = "";

    if (itemText.length > 0) {


        // create new item in the items array

        items.push({
            id: Math.random(),
            text: itemText,
            complete: false,
        });
        // recreate the list

        createList(listElem);
    } else {
        console.log("Enter some text");
    }
}