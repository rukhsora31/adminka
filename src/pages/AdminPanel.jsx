import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const AdminPanel = () => {
    const [projects, setProjects] = useState([]);
    const [editingProject, setEditingProject] = useState(null); // Хранит редактируемый товар
    const { register, handleSubmit, reset, setValue } = useForm();

    const fetchProjects = async () => {
        try {
            const response = await axios.get("http://localhost:3001/products");
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const onSubmit = async (data) => {
        if (editingProject) {
            // Редактирование товара
            try {
                await axios.put(`http://localhost:3001/products/${editingProject.id}`, data);
                fetchProjects();
                reset();
                setEditingProject(null); // Сбрасываем редактируемый товар
            } catch (error) {
                console.error("Error updating project:", error);
            }
        } else {
            // Добавление нового товара
            try {
                await axios.post("http://localhost:3001/products", data);
                fetchProjects();
                reset();
            } catch (error) {
                console.error("Error adding project:", error);
            }
        }
    };

    const deleteProject = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/products/${id}`);
            fetchProjects();
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    const editProject = (project) => {
        setEditingProject(project); // Устанавливаем текущий редактируемый товар
        setValue("name", project.name); // Заполняем форму текущими данными
        setValue("description", project.description);
        setValue("image", project.image);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Admin Panel</h1>

            <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: "20px" }}>
                <input {...register("name")} placeholder="Project Name" required />
                <input {...register("description")} placeholder="Description" required />
                <input {...register("image")} placeholder="Image URL" required />
                <button type="submit">{editingProject ? "Update Project" : "Add Project"}</button>
                {editingProject && (
                    <button type="button" onClick={() => { reset(); setEditingProject(null); }}>
                        Cancel
                    </button>
                )}
            </form>

            <ul>
                {projects.map((project) => (
                    <li key={project.id}>
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                        <img src={project.image} alt={project.name} style={{ width: "100px" }} />
                        <button onClick={() => editProject(project)}>Edit</button>
                        <button onClick={() => deleteProject(project.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;


