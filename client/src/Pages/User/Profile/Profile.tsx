import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../app/Store/store";


const UserProfile = () => {
  const {user} = useSelector((state:RootState) => state.auth);
  const dispatch = useDispatch();

  const handleImageUpdate = () => {
    const newImage = prompt("Enter new image URL");
    if (newImage) {
      // dispatch(updateImage(newImage));
    }
  };

  return (
    <div className="flex flex-col items-center py-10">
      <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
        <img
          src={user?.avatar || "/images/default-profile.jpg"} // Replace with actual default image
          alt={user?.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="text-xl font-semibold">{user?.name}</h2>
      <p className="text-gray-500">{user?.role}</p>
      <button
        onClick={handleImageUpdate}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
      >
        Update Image
      </button>
    </div>
  );
};

export default UserProfile;
