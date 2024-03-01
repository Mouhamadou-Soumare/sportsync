import { count } from "node:console";
import { todo } from "node:test";

async function get() {
    try {
        const response = await fetch("http://localhost:3000/todos");
        

    } catch (error) {
        console.error("Erreur lors de la récupération des tâches:", error);
    }
}

getTodos();

