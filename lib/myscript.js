$(".disapprove").on( "click", function( event ) {
    $( event.target ).closest( ".col-md-4" ).remove();
});

$(".approve").on( "click", function( event ) {
    $( event.target ).closest( ".card" ).removeClass("pending");
    $( event.target ).closest( "button" ).remove();
});


const state = {
    entities :  [
        {
            id: 1,
            name: "HSBC",
            product:"Debit Account # 87659986",
            permissions: ["name,", "address,", "email,", "job", "gender,", "passport,", "face,", "fingerprints,", "date of birth,", "financial statements"],
            lastActivity: Date.now(),
            approved: true,
            image: "./img/WechatIMG10.png"
        },
        {
            id: 2,
            name: "JPMorgan",
            product:"Credit Card # 677887779900",
            permissions: ["name,", "address,", "email,", "job","gender,", "passport,", "face,", "fingerprints,", "date of birth,", "financial statements"],
            lastActivity: Date.now(),
            approved: true,
            image: "./img/WechatIMG3.png"
        },
        {
            id: 3,
            name: "CornellTech",
            product:"Tuition MBA 2018 - 2019",
            permissions: ["name,", "address,", "email,", "job","gender,", "passport,", "face,", "fingerprints,", "date of birth,", "financial statements,","banks infomation"],
            lastActivity: Date.now(),
            approved: true,
            image: "./img/Screen Shot 2018-11-25 at 10.49.00 AM.png"
        },
        {
            id: 4,
            name: "Amazon",
            product:"Amazon Prime ,since 2011",
            permissions: ["name,", "address,", "email,", "gender,","date of birth,","fingerprints,","J.P morgan credit card"],
            lastActivity: Date.now(),
            approved: true,
            image: "./img/WechatIMG5.png"
        },
        {
            id: 5,
            name: "UnitedHealthCare",
            product:"Costumer since 2018",
            permissions: ["name,", "address,", "email,", "gender,","date of birth,","fingerprints,","J.P morgan credit card"],
            lastActivity: Date.now(),
            approved: true,
            image: "./img/WechatIMG6.png"
        },
        {
            id: 6,
            name: "StateFarm",
            product:"Costumer since 2017",
            permissions: ["name,", "address,", "email,", "gender,","date of birth,","fingerprints,","J.P morgan credit card"],
            lastActivity: Date.now(),
            approved: true,
            image: "./img/WechatIMG7.png"
        },
        {
            id: 7,
            name: "Twitter",
            product:"Employee Details",
            permissions: ["name,", "address,", "email,", "gender,","date of birth,","fingerprints,","HSBC credit card", "face,", "fingerprints," ,"job history,","education history"],
            lastActivity: Date.now(),
            approved: false,
            image: "./img/WechatIMG9.png"
        },
        {
            id: 8,
            name: "EQUINOX",
            product:"Member 6 months",
            permissions: ["name,", "address,", "email,", "gender,","date of birth,","fingerprints,","J.P morgan credit card"],
            lastActivity: Date.now(),
            approved: false,
            image: "./img/d4b83693-d48d-48f6-bc3d-16ae22c2f777.jpg"

        }
        
        
    ]
}

const elements = {
    content: null,
    declineAll: null,
    approveAll:null
};

window.addEventListener("load", () => {
    elements.content = $("#content");
    elements.declineAll = $("#decline-all-button");
    elements.approveAll = $("#approve-all-button")
    elements.declineAll.click(() => {
        declineAll();
    })
    elements.approveAll.click(() => {
        approveAll();
    })
    refreshContent();
});

var approved_co=[];

const refreshContent = () => {
    approved_co=[];
    elements.content.html("");
    state.entities.forEach(entity => {
        elements.content.append(createElement(entity));
    })
    if(approved_co.length==0) approved_co.push("None");
    array = "You have allowed <u>"+approved_co+" </u> to access to your data";
    array = " <p>"+ array+ "</p ><br />";
    //$("#updateHere").addClass("col-md-12").append(`<p class="lead text-muted"><u><i>You have allowed ${array} to access to your data.</u></p></br />`);
    $("#updateHere").html(array);
    console.log(array);
}

const createElement = (entity) => {
    const el = $("<div/>");
    el.addClass("col-md-4");
    if(entity.approved){
        
        approved_co.push(entity.name);
        el.append(`<div class="card mb-4 shadow-sm">
              <img class="card-img-top" style="height: 225px; width: 100%; display: block;" src="${entity.image}">
              <div class="card-body">
                <p class="card-text">
                    <u>Product</u>: ${entity.product}
                    <br />
                    <div id="permissions"><u>Data Shared</u>: </div>
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group" id="approve-buttons">
                    
                  </div>
                  <small class="text-muted">Last Activity 11/08/2018</small>
                </div>
              </div>
            </div>`);
    }
    else{

        el.append(`<div class="card mb-4 shadow-sm" style="background-color:silver">
              <img class="card-img-top" style="height: 225px; width: 100%; display: block;" src="${entity.image}">
              <div class="card-body">
                <p class="card-text">
                    <u>Product</u>: ${entity.product}
                    <br />
                    <div id="permissions"><u>Request Data</u>: </div>
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                  <div class="btn-group"  id="approve-buttons">
                    
                  </div>
                  
                </div>
                 
                </div>
              </div>
            </div>`);
    }

    const approveButtons = el.find("#approve-buttons");
    const permissionsContainer = el.find("#permissions");

    entity.permissions.forEach((permission, permissionIndex) => {
        const permissionElement = $(`<span>${permission} </span>`);
        permissionElement.click(() => {
            updatePermission(entity, permissionIndex, false);
        })
        permissionsContainer.append(permissionElement);
    })
    
    if (entity.approved) {
        const declineButton = $(`<button id="decline-button" type="button" class="btn  btn-danger ">Decline</button>`);
        approveButtons.append(declineButton);
        declineButton.click(() => {
            approveEntity(entity, false);
        })
        
    } else {
        const approveButton = $(`<button id="approve-button" type="button" class="btn  btn-success ">Approve</button>`);
        approveButtons.append(approveButton);
        approveButton.click(() => {
            approveEntity(entity, true);
        })
    }

    return el;
}

const approveEntity = (entity, approved = true) => {
    state.entities.forEach(_entity => {
        if (_entity.id == entity.id) {
            entity.approved = approved;
        }
    })
    refreshContent();
}

const updatePermission = (entity, permissionIndex, allow = true) => {
    entity.permissions.splice(permissionIndex, 1);
    refreshContent();
};

const declineAll = () => {
    state.entities.forEach(_entity => {
        _entity.approved = false;
    })
    refreshContent();
}

const approveAll = () => {
    state.entities.forEach(_entity => {
        _entity.approved = true;
    })
    refreshContent();
}

