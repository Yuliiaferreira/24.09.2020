const formElem = document.getElementById("listform");

const listElem = document.getElementById("itemlist");

const items = [{
        id: Math.random(),
        text: "Dummy item 1",
        complete: true,
    },{
        id: Math.random(),
        text: "Dummy new item 2",
        complete: false,
    },{
        id: Math.random(),
        text: "Dummy item 3",
        complete: false,
    },
];

createList(listElem);

function createList(listElem) {

    listElem.innerHTML = "";

    items.forEach(function(item) {
        let itemClassName ="item";
        if(item.complete) {
            itemClassName += " item--complete";
        }

        console.log(item);
        listElem.innerHTML += `                
        <li class="${itemClassName}" data-id="${item.id}">
            <button class="item__text">${item.text}</button>
            <button class="item__remove">Remove</button>
        </li>
        `;
    });

    document.querySelectorAll(".item .item__text")
        .forEach(function(itemElem) {
            itemElem.addEventListener("click", handleItemTextClick);
        });
    
}

function handleItemTextClick(event) {
    
    const itemId = event.currentTarget.parentElement.dataset.id;
    // console.log(event.currentTarget.parentElement.getAttribute("data-id"));
    
    console.log("Item clicked! Item ID: " + itemId);

    // find index of item using the itemID
   const itemIndex = items.findIndex(function (item) {
        if (item.id === parseFloat(itemId) ) {
            return true;
        }
        // return item.id === parseFloat(itemId); -- the same as previously
    });
    console.log(itemIndex);

    // toggle the items completed state

    items[itemIndex].complete = !items[itemIndex].complete;
    
    createList(listElem);
}