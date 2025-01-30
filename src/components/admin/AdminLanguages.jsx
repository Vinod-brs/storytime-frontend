import { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import LanguagesTableWithSearch from "./admin_helpers/LanguagesTableWithSearch";
import { useGetLanguagesQuery } from "../../store/language/languageApiSlice";
import LoadingSpinner from "../LoadingSpinner";
// import NavigationBar from "../components/NavigationBar";





const AdminLanguages = () => {
  const [languagess, setLanguages] = useState([]);

    const {data: languages, isLoading, refetch: refectLanguages} = useGetLanguagesQuery();
    
      useEffect(() => {
        if (!isLoading) {   
          // console.log(languages)      
          setLanguages(JSON.parse(JSON.stringify(languages))); 
        }
      }, [isLoading, languages]);

      useEffect(() => {
        refectLanguages();
      }, [refectLanguages])

  const handleUpdate = (updatedData) => {
    setLanguages(updatedData);
  };

  const handleDelete = (updatedData) => {
    setLanguages(updatedData);
  };

  return(
    <>
    {isLoading && <LoadingSpinner />}
    <AdminNavbar />
    <div className="text-center">
      <button onClick={refectLanguages} className="border bg-gray-500 rounded px-1 py-1">Refresh</button>
    </div>
    <LanguagesTableWithSearch data={languagess} onUpdate={handleUpdate} onDelete={handleDelete} />
    </>
    );
};

export default AdminLanguages;
