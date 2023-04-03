import React from "react";
import agent from "../../api/agent";
import { useAppDispatch } from "../../store";
import { setUser } from "../../store/user/actions";

const Profile = () => {
  const { uploadAvatar, deleteAvatar } = agent.user;
  const dispatch = useAppDispatch();

  const uploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    const res = await uploadAvatar(file);
    dispatch(setUser({ user: res }));
  };

  const deleteHandler = async () => {
    const res = await deleteAvatar();
    dispatch(setUser({ user: res }));
  };

  return (
    <div>
      <button onClick={deleteHandler}>Удалить аватар</button>
      <input
        accept="image/*"
        onChange={uploadHandler}
        type="file"
        placeholder="Загрузить аватар"
      />
    </div>
  );
};

export default Profile;
