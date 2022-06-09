import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import notes from './notes.js';


const argv = yargs(hideBin(process.argv))
    .command({
        command: "add",
        desc: "Add a new note",
        builder: {
            title: {
                desc: "Note title",
                demandOption: true,
                type: "string"
            },
            body: {
                desc: "Note body",
                demandOption: true,
                type: "string"
            }
        },
        handler(argv){
            notes.addNote(argv.title, argv.body)
        }
    })
    .command({
        command: "remove",
        desc: "Remove a note",
        title: {
            desc: "Note title",
            demandOption: true,
            type: "string"
        },
        handler(argv){
            notes.removeNote(argv.title);
        }
    })
    .command({
        command: "list",
        desc: "List all notes",
        handler() {
            notes.listNotes()
        }
    })
    .command({
        command: "read",
        desc: "Read a note",
        title: {
            desc: "Note title",
            demandOption: true,
            type: "string"
        },
        handler(argv) {
            notes.readNote(argv.title);
        }
    })
    .help()
    .argv