"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Image from "next/image";

interface ISimpsonProps {
    quote: string;
    character: string;
    image: string;
}

export default function Home() {
    const [quotes, setQuotes] = useState<ISimpsonProps[]>([]);

    const getDataQuote = async () => {
        try {
            await axios
                .get('https://thesimpsonsquoteapi.glitch.me/quotes')
                .then((res) => setQuotes(res.data))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDataQuote()
    }, [])

  return (
    <div className="flex flex-col items-center">
        <button type="button" onClick={getDataQuote} className="rounded-full bg-neutral-100 px-3 py-1 m-5" >
            Simpson New Quote
        </button>
        {quotes.map((quote, index) => (
            <figure key={index} className="flex p-1.25 max-w-xl border border-solid border-slate-100 shadow-md ml-5 mr-5 rounded-md">
                <Image src={quote.image} alt={quote.character} width={80} height={160} className="flex mt-1 mb-1 ml-1 mr-4" />
                <figcaption>
                    <blockquote className="mt-1 mb-2 pr-2">{quote.quote}</blockquote>
                    <p className="text-orange-400">{quote.character}</p> 
                </figcaption>
            </figure>
        ))}
    </div>
  )
}
