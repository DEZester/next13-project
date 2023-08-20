import {connectToDB} from '@utils/database'
import Prompt from "@models/prompt";

export const GET = async (request) => {
    try {
        await connectToDB()//connect to DB

        const prompts = await Prompt.find().populate('creator')//find posts

        return new Response(JSON.stringify(prompts), {status: 200})//return posts
    } catch (error) {
        return new Response("Failed to fetch all prompts", {status: 500})
    }
}