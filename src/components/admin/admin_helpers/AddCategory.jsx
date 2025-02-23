import { useState } from "react";
import { toast } from "react-toastify";
import { useAddCategoryAPIMutation } from "../../../store/admin/adminApiSlice";



const AddCategory = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", code: "" });

  const[loading, setLoading] = useState(false)

  const [AddCategoryAPI] = useAddCategoryAPIMutation();


  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setNewCategory({ name: "", code: "" });
    setIsPopupOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    toast.dismiss();
    if (!newCategory.name.trim() || !newCategory.code.trim()) {
      toast.error("Both fields are required!");
      setLoading(false);
      return;
    }

    try {
        const response = await AddCategoryAPI({category: newCategory.name, keywords: newCategory.code,})
        
        if(response?.error?.data?.message){
            toast.error(response?.error?.data?.message);
            setLoading(false);
            return;
        }
        
        toast.success(response?.data?.message);
        setLoading(false);
        handleClosePopup();
    } catch (error) {
        setLoading(false);
        toast.error(error)
    }

    
  };

  return (
    <div className="">
      <button
        onClick={handleOpenPopup}
        className="m-0 px-4 py-2 bg-green-600 text-white rounded"
      >
        Add Category
      </button>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-600 rounded-lg shadow-lg p-6 w-80">
          <div className="flex justify-center mb-3">
            <img className="w-16 h-16" src={loading ? './images/Spiral_logo_loader.gif' : './images/logo.svg'} alt="Logo" />
          </div>
            <h2 className="text-center font-bold mb-4">Add New Category</h2>

            <input
              type="text"
              name="name"
              placeholder="Enter Language Name"
              value={newCategory.name}
              onChange={handleChange}
              className="border text-black border-gray-300 rounded px-3 py-2 w-full mb-3"
            />

            <input
              type="text"
              name="code"
              placeholder="Enter Language Code"
              value={newCategory.code}
              onChange={handleChange}
              className="border text-black border-gray-300 rounded px-3 py-2 w-full mb-4"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={handleClosePopup}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCategory;
