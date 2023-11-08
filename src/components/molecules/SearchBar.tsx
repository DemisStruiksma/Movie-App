"use client"

import { useRouter } from 'next/navigation';
import { FormEvent } from "react";
import Button from '../atoms/Button';

export default function SearchBar () {
    const router = useRouter();

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const searchTerm = formData.get('search') as string;
        router.push(`/search?q=${searchTerm}`);
    };

    return (
        <form onSubmit={handleSearch} className="my-10">
            <div className="flex items-center border rounded-lg p-2">
                <input
                    className="text-black bg-white border-none rounded-l-lg p-2 w-64"
                    type="text"
                    name="search"
                    placeholder="Search..."
                    required
                />

                <Button type="submit" text="Search" customClassNames="bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg p-2" />
            </div>
        </form>
    );
};
