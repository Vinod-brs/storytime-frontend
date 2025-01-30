import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminTableWithSearch from "./admin_helpers/AdminsTableWithSearch";
import { useGetAdminProfilesAPIQuery } from "../../store/admin/adminApiSlice";
import LoadingSpinner from "../LoadingSpinner";


const AdminsTable = () => {
  const [demoData, setAdminProfiles] = useState([]);

  const {data: AdminProfiles, isLoading, refetch} = useGetAdminProfilesAPIQuery();

  useEffect(() => {
    if (!isLoading) { 
      // console.log(AdminProfiles.userProfiles)        
      setAdminProfiles(JSON.parse(JSON.stringify(AdminProfiles.userProfiles))); 
    }
  }, [isLoading, AdminProfiles]);

  useEffect(() => {
    refetch();
  }, [refetch])

  const handleUpdate = (updatedData) => {
    setAdminProfiles(updatedData);
  };

  const handleDelete = (updatedData) => {
    setAdminProfiles(updatedData);
  };

  return(
    <>
   {isLoading && <LoadingSpinner />}
    <AdminNavbar />
    <div className="text-center">
          <button onClick={refetch} className="border bg-gray-500 rounded px-1 py-1">Refresh</button>
        </div>
    <AdminTableWithSearch data={demoData} onUpdate={handleUpdate} onDelete={handleDelete} />
    </>
    );
};

export default AdminsTable;
