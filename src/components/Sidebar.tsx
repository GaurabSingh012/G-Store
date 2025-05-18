import React, { useEffect, useState } from 'react'

interface Product {
    category: string;
}

interface FetchResponse {
    products: Product[]
}

const Sidebar = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const [keywords] = useState<string[]>([
        'apple',
        'watch',
        'Fashion',
        'trend',
        'shoes',
        'shirt'
    ])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products')
                const data: FetchResponse = await response.json()
                console.log(data)
            } catch (error) {
                console.error('Error fetching products', error)
            }
        }
        fetchCategories()
    },[])

  return (
    <div>Sidebar</div>
  )
}

export default Sidebar