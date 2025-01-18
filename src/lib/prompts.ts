import db from "./db";

export async function getPrompts() {
    const prompts = await db.collection("prompts").getFullList();
    return prompts;
}