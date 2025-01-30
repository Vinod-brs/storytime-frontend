import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import UserTableWithSearch from "./admin_helpers/UserTableWithSearch";
import { useGetUserProfilesAPIQuery } from "../../store/admin/adminApiSlice";
import LoadingSpinner from "../LoadingSpinner";



const UsersTable = () => {
    const [demoData, setUserData] = useState([]);
    
    const {data: userProfiles, isLoading, refetch} = useGetUserProfilesAPIQuery();
    
      useEffect(() => {
        if (!isLoading) {         
          setUserData(JSON.parse(JSON.stringify(userProfiles.userProfiles))); 
        }
      }, [isLoading, userProfiles]);

      useEffect(() => {
        refetch();
      }, [refetch])

      const handleUpdate = (updatedData) => {
        setUserData(updatedData);
      };
    
      const handleDelete = (updatedData) => {
        setUserData(updatedData);
      };
    
      return(
        <>
        {isLoading && <LoadingSpinner />}
        <AdminNavbar />
        <div className="text-center">
          <button onClick={refetch} className="border bg-gray-500 rounded px-1 py-1">Refresh</button>
        </div>
        
        <UserTableWithSearch data={demoData} onUpdate={handleUpdate} onDelete={handleDelete} />
        
        </>
        );
    };

export default UsersTable;
