emailjs.init("kyW4EFDYJyEjDzJJs");

        // Initialise Supabase
        const supabaseUrl = 'https://bmnmhmqaghasueqciqth.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtbm1obXFhZ2hhc3VlcWNpcXRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNzQ2NDAsImV4cCI6MjA2MzY1MDY0MH0.aa-lqong1Cj2zB1iR2kFlFkne6EsW--13HR1HDBFjPM';
        const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

        // Gestion du formulaire
        document.getElementById("tombola-form").addEventListener("submit", async function (e) {
            e.preventDefault();

            const form = this;
            const emailInput = form.querySelector("input[name='email']");
            const email = emailInput.value.trim();

            // Vérifie si l'email existe déjà dans Supabase
            const { data: existingEmail, error } = await supabaseClient
                .from("emails")
                .select("email")
                .eq("email", email)
                .single();

            if (error && error.code !== 'PGRST116') {
                // Si c’est une vraie erreur autre que "no rows found"
                console.error("Erreur Supabase :", error);
                alert("Erreur serveur, réessaie plus tard.");
                return;
            }

            if (existingEmail) {
                alert("Tu as déjà participé à la tombola 😄");
                return;
            }

            // Insert l'email dans la base
            const { data: insertedEmail, error: insertError } = await supabaseClient
                .from("emails")
                .insert([{ email: email }]);

            if (insertError) {
                console.error("Erreur lors de l'insertion :", insertError);
                alert("Erreur serveur, réessaie plus tard.");
                return;
            }

            // Envoi du mail avec EmailJS
            emailjs.sendForm("service_h9xgm27", "template_in2ynxd", form)
                .then(function () {
                    alert("Merci ! Ta participation à la tombola est enregistrée 🎉");
                }, function (error) {
                    console.log("FAILED...", error);
                    alert("Une erreur est survenue lors de l'envoi de l'email.");
                });

            form.reset();
        });