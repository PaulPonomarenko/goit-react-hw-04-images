export const gallaryApi = async (inputValue, page) => {
  const KEY = '35873317-71e90e79160d51a7ec8f77390';
  const BASE_URL = 'https://pixabay.com/api/';
  const params = 'image_type=photo&orientation=horizontal&per_page=12';
  const response = await fetch(
    `${BASE_URL}?q=${inputValue}&page=${page}&key=${KEY}&${params}`
  );
  if (!response.ok) {
    throw new Error('Уууупсс, что-то пошло не так');
  }
  return response.json();
};
