// Initialise EmailJS
emailjs.init("kyW4EFDYJyEjDzJJs");

// URL et clé Supabase
const supabaseUrl = 'https://bmnmhmqaghasueqciqth.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // ta clé complète

// Initialise Supabase client (attention au nom de la variable)
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Gestion du formulaire
document.getElementById("tombola-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = this;
    const emailInput = form.querySelector("input[name='user_email']"); // tu as mis name="user_email" dans le HTML
    const email = emailInput.value.trim();

    try {
        // Vérifie si l'email existe déjà dans Supabase
        const { data: existingEmail, error } = await supabase
            .from("emails")
            .select("email")
            .eq("email", email)
            .single();

        if (error && error.code !== 'PGRST116') {
            console.error("Erreur Supabase :", error);
            alert("Erreur serveur, réessaie plus tard.");
            return;
        }

        if (existingEmail) {
            alert("Tu as déjà participé à la tombola 😄");
            return;
        }

        // Insère l'email dans la base
        const { data: insertedEmail, error: insertError } = await supabase
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
                console.error("Erreur EmailJS :", error);
                alert("Une erreur est survenue lors de l'envoi de l'email.");
            });

        form.reset();

    } catch (err) {
        console.error("Erreur inattendue :", err);
        alert("Erreur serveur, réessaie plus tard.");
    }
});
