import {connectToDB} from "@utils/database";
import Prompt from "@models/prompt";

//GET
export const GET = async (request, {params}) => {
  try {
    await connectToDB()//connect to DB

    const prompt = await Prompt.findById(params.id).populate('creator')//find posts

    if (!prompt) return new Response('Prompt not found', {status: 404})


    return new Response(JSON.stringify(prompt), {status: 200})//return posts
  } catch (error) {
    return new Response("Failed to fetch all prompts", {status: 500})
  }
}

//PATCH
export const PATCH = async (request, {params}) => {
  const {prompt, tag} = await request.json()

  try {
    await connectToDB()

    const exisitingPrompt = await Prompt.findById(params.id)
    if (!exisitingPrompt) return new Response('Prompt not found', {status: 404})

    exisitingPrompt.prompt = prompt
    exisitingPrompt.tag = tag
    await exisitingPrompt.save()

    return new Response(JSON.stringify(exisitingPrompt), {status: 200})//return posts
  } catch (error) {
    return new Response("Failed to update the prompt", {status: 500})
  }
}

//DELETE
export const DELETE = async (request, {params}) => {
  try {
    await connectToDB()

    await Prompt.findByIdAndRemove(params.id)

    return new Response('Prompt deleted successfully', {status: 200})//return posts
  } catch (error) {
    return new Response("Failed to delete the prompt", {status: 500})
  }
}