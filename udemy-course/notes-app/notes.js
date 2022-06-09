import chalk from "chalk";
import fs from "fs";

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    console.log(chalk.red.inverse("Note title taken"));
    return;
  }

  notes.push({
    title: title,
    body: body,
  });

  console.log(chalk.green.inverse("New note added!"));
  saveNotes(notes);
};

const removeNote = (title) => {
  const notes = loadNotes();

  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notesToKeep.length === notes.length) {
    console.log(chalk.red.inverse("Note not found"));
    return;
  }

  console.log(chalk.green.inverse("Note removed!"));
  saveNotes(notesToKeep);
};

const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.inverse("Your notes:"));

  notes.forEach((note) => {
    console.log(note.title);
  });
};


const readNote = (title) => {
    const notes = loadNotes(); 
    const note = notes.find((note) => note.title === title);

    if (!note) {
        console.log(chalk.red.inverse("Note not found"));
        return
    }

    console.log(chalk.inverse(title));
    console.log(note.body);
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

export default {
  listNotes: listNotes,
  addNote: addNote,
  removeNote: removeNote,
  readNote: readNote,
};
