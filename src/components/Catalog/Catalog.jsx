import React, { useEffect, useState } from 'react'
import './Catalog.scss'
import axios from 'axios';

const Catalog = () => {

    const [projects, setProjects] = useState([]);

    const fetchProjects = async () => {
        try {
            const response = await axios.get("http://localhost:3001/products");
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };


    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <>
            <section>
                <div className="container">
                    <ul className='wrapper'>
                        {projects.map((project) => (
                            <li className='card' key={project.id}>
                                <img src={project.image} alt={project.name}  />
                                <h3>{project.name}</h3>
                                <p>{project.description}</p>
                               <button>add to card</button>
                            </li>
                        ))}
                    </ul>
                </div>

            </section>
        </>
    )
}

export default Catalog
