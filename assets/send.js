        emailjs.init("kyW4EFDYJyEjDzJJs");

        document.getElementById("tombola-form").addEventListener("submit", function (e) {
            e.preventDefault();

            emailjs.sendForm("service_h9xgm27", "template_in2ynxd", this)
                .then(function () {
                    alert("Merci ! Ta participation à la tombola est enregistrée 🎉");
                }, function (error) {
                    alert("Une erreur est survenue. Réessaie ou contacte-nous.");
                    console.log("FAILED...", error);
                });

            this.reset();
        });