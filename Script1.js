window.addEventListener("DOMContentLoaded", function () {
    const formModal = document.getElementById("formModal");
    window.history.pushState("FORM", "form", "#FORM");
    history.back();
    formModal.addEventListener("show.bs.modal", event => {
        this.window.history.go(1);
    });
    var f = true;
    formModal.addEventListener("hide.bs.modal", event => {
        if (f) {
            f = false;
            window.history.back();
            f = true;
        }
    });
    window.addEventListener("popstate", event => {
        if (f) {
            f = false;
            if (location.hash == "#FORM") {
                $("#formModal").modal("show");
            }
            else {
                $("#formModal").modal("hide");
            }
            f = true;
        }
    });

    var name = document.getElementById("formName");
    var email = document.getElementById("formEmail");
    var message = document.getElementById("formMessage");
    let ar = [[name, "formName"], [email, "formEmail"], [message, "formMessage"]];
    ar.forEach(el => {
        el[0].value = localStorage.getItem(el[1]);
        el[0].addEventListener("change", event => {
            localStorage.setItem(el[1], el[0].value);
        });
    });
    var form = document.getElementById("contactForm");
    form.addEventListener("submit", event => {
        history.back();
        const url = "https://formcarry.com/s/iZs62W5Im";
        const data = new FormData(form);
        fetch(url, { method: "POST", body: data })
            .then((res) => { return res.text(); })
            .then((txt) => {
                alert("Success!");
                ar.forEach(el => {
                    localStorage.setItem(el[1], "");
                    el[0].value = "";
                });
            })
            .catch((err) => {
                alert("Error, try again");
            });
        event.preventDefault();
    });
});