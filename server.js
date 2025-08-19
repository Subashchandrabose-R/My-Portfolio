app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());


app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  console.log("Incoming request:", req.body);

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // ✅ This is what the frontend expects
    return res.json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error("Error saving message:", err);
    return res.status(500).json({ message: "Failed to send message." });
  }
});
