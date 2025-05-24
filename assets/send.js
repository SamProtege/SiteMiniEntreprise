// Initialise EmailJS
emailjs.init("kyW4EFDYJyEjDzJJs");

// Initialise Supabase
const supabaseUrl = 'https://bmnmhmqaghasueqciqth.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtbm1obXFhZ2hhc3VlcWNpcXRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNzQ2NDAsImV4cCI6MjA2MzY1MDY0MH0.aa-lqong1Cj2zB1iR2kFlFkne6EsW--13HR1HDBFjPM';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Cible le formulaire
document.getElementById("tombola-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = this;
    const emailInput = form.querySelector("input[name='email']");
    const email = emailInput.value.trim();

    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = true; // Désactive le bouton pendant traitement

    try {
        // Vérifie si l'email existe déjà dans la base
        const { data: existingEmails, error } = await supabase
            .from("emails")
            .select("email")
            .eq("email", email);

        if (error) {
            console.error("Erreur lors de la vérification Supabase :", error);
            alert("Une erreur est survenue. Réessaie plus tard.");
            submitBtn.disabled = false;
            return;
        }

        if (existingEmails.length > 0) {
            alert("Tu as déjà participé à la tombola 😄");
            submitBtn.disabled = false;
            return;
        }

        // Insère l'email dans la base
        const { error: insertError } = await supabase
            .from("emails")
            .insert([{ email: email }]);

        if (insertError) {
            console.error("Erreur lors de l'insertion Supabase :", insertError);
            alert("Une erreur est survenue. Réessaie plus tard.");
            submitBtn.disabled = false;
            return;
        }

        // Envoi du mail avec EmailJS
        await emailjs.sendForm("service_h9xgm27", "template_in2ynxd", form);
        alert("Merci ! Ta participation à la tombola est enregistrée 🎉");

        form.reset();

    } catch (err) {
        console.error("Erreur inattendue :", err);
        alert("Une erreur est survenue. Réessaie plus tard.");
    } finally {
        submitBtn.disabled = false; // Réactive le bouton
    }
});
