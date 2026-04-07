const API_URL = "http://localhost:5000/api/files";

export const getFiles = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const uploadFiles = async (files) => {
  const formData = new FormData();
  for (let file of files) {
    formData.append("files", file);
  }

  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  return res.json();
};

export const deleteFile = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};
