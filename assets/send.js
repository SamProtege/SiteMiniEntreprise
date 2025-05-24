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

    // Vérifie si l'email existe déjà dans la base
    const { data: existingEmail, error } = await supabase
        .from("emails")
        .select("email")
        .eq("email", email)
        .single();

    if (existingEmail) {
        alert("Tu as déjà participé à la tombola 😄");
        return;
    }

    // Si l'email n'existe pas, on l'enregistre
    const { data: insertedEmail, error: insertError } = await supabase
        .from("emails")
        .insert([{ email: email }]);

    if (insertError) {
        console.error("Erreur Supabase :", insertError);
        alert("Une erreur est survenue. Réessaie plus tard.");
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
