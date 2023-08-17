'use client'

import React from 'react'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";


const MyProfile = () => {
	const [posts, setPosts] = useState([]);
	const {data: session} = useSession()
	const fetchPosts = async () => {
		const response = await fetch(`/api/users/${session?.user.id}/posts`)
		const data = await response.json()

		setPosts(data)
	}

	useEffect(() => {
		if (session?.user.id) fetchPosts()
	}, [])

	const handleEdit = async () => {

	}
	const handleDelete = async () => {

	}

	return (
		<Profile name='My'
			desc='welcome to your profile'
			data={posts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	)
}
export default MyProfile
