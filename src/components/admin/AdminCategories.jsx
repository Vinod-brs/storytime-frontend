import { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import CategoriesTableWithSearch from "./admin_helpers/CatgoriesTableWithSearch";
import { useGetCategoriesQuery } from "../../store/category/categoryApiSlice";
import LoadingSpinner from "../LoadingSpinner";
// import NavigationBar from "../components/NavigationBar";





const AdminCategories = () => {
  const [categoriess, setCategories] = useState([]);

  const {data: categories, isLoading, refetch} = useGetCategoriesQuery();
      
        useEffect(() => {
          if (!isLoading) {   
            // console.log(categories)     
            setCategories(JSON.parse(JSON.stringify(categories))); 
          }
        }, [isLoading, categories]);
  
        useEffect(() => {
          refetch();
        }, [refetch])

  const handleUpdate = (updatedData) => {
    setCategories(updatedData);
  };

  const handleDelete = (updatedData) => {
    setCategories(updatedData);
  };

  return(
    <>
    {isLoading && <LoadingSpinner />}
    <AdminNavbar />
    <div className="text-center">
      <button onClick={refetch} className="border bg-gray-500 rounded px-1 py-1">Refresh</button>
    </div>
    <CategoriesTableWithSearch data={categoriess} onUpdate={handleUpdate} onDelete={handleDelete} />
    </>
    );
};

export default AdminCategories;
