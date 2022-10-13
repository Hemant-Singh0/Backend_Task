module.exports = (app) => {
  const notes = require("../controllers/note.controller.js");

  // Create a new Note
  app.post("/notes", notes.create);

  // Delete a Note with noteId
  app.delete("/notes/:noteId", notes.delete);

  // Update a Note with noteId
  app.put("/notes/:noteId", notes.update);

  // Retrieve all Notes
  app.get("/notes", notes.findAll);

  //Find One Note with noteId
  app.get("/notes/:noteId", notes.findOne);
};
